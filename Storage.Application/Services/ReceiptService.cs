namespace Storage.Application.Services;

public class ReceiptService(IStorageDbContext context) : IReceiptService
{
    private readonly IStorageDbContext _context = context;

    public async Task<ReceiptDocumentDto?> CreateReceiptDocument(CreateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (requestDto is null || string.IsNullOrWhiteSpace(requestDto.Number) || requestDto.Date is null)
            {
                throw new EmptyRequestException(nameof(CreateReceiptDocumentRequestDto));
            }

            if (await _context.ReceiptDocuments.AnyAsync(x => x.Number == requestDto.Number, cancellationToken))
            {
                throw new AlreadyExistException($"{nameof(ReceiptDocument)} with number {requestDto.Number}");
            }

            var newDocument = new ReceiptDocument()
            {
                Number = requestDto.Number,
                Date = requestDto.Date.Value,
                ReceiptResources = requestDto.ReceiptResources
                    .Where(x => x.ResourceId is not null && x.MeasureUnitId is not null && x.Quantity is not null)
                    .Select(x => new ReceiptResource()
                    {
                        ResourceId = x.ResourceId!.Value,
                        MeasureUnitId = x.MeasureUnitId!.Value,
                        Quantity = x.Quantity!.Value,
                    })
                    .ToList()
            };

            await _context.ReceiptDocuments.AddAsync(newDocument, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var createdInboundDocument = await _context.ReceiptDocuments
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.MeasureUnit)
                .FirstOrDefaultAsync(x => x.Id == newDocument.Id, cancellationToken);

            foreach (var resource in createdInboundDocument!.ReceiptResources)
            {
                var existedBalance = await _context.Balances.FirstOrDefaultAsync(x => x.ResourceId == resource.ResourceId
                    && x.MeasureUnitId == resource.MeasureUnitId, cancellationToken);

                if (existedBalance is null)
                {
                    await _context.Balances.AddAsync(new Balance()
                    {
                        ResourceId = resource.ResourceId,
                        MeasureUnitId = resource.MeasureUnitId,
                        Quantity = resource.Quantity,
                    });

                    continue;
                }

                existedBalance.Quantity += resource.Quantity;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return createdInboundDocument?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<bool?> DeleteReceiptDocument(long id, CancellationToken cancellationToken)
    {
        try
        {
            var inboundDocument = await _context.ReceiptDocuments
                .Include(x => x.ReceiptResources)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if(inboundDocument is null)
            {
                return false;
            }

            foreach (var inboundResource in inboundDocument.ReceiptResources)
            {
                var balance = await _context.Balances
                    .FirstOrDefaultAsync(x => x.ResourceId == inboundResource.ResourceId 
                        && x.MeasureUnitId == inboundResource.MeasureUnitId, cancellationToken);
                if (balance is null || balance.Quantity < inboundResource.Quantity)
                {
                    return false;
                }

                balance.Quantity -= inboundResource.Quantity;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return await _context.ReceiptDocuments
                 .Where(x => x.Id == id)
                 .ExecuteDeleteAsync(cancellationToken) > 0;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<IEnumerable<ReceiptDocumentDto>> GetAll(CancellationToken cancellationToken)
    {
        try
        {
            return await _context.ReceiptDocuments
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.MeasureUnit)
                .AsNoTracking()
                .Select(x => x.ToDto())
                .ToListAsync(cancellationToken);
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ReceiptDocumentDto?> UpdateReceiptDocument(UpdateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (requestDto is null || string.IsNullOrWhiteSpace(requestDto.Number) || requestDto.Date is null)
            {
                throw new EmptyRequestException(nameof(UpdateReceiptDocumentRequestDto));
            }

            var inboundDocumentForUpdate = await _context.ReceiptDocuments
                .Include(x => x.ReceiptResources)
                .FirstOrDefaultAsync(x => x.Id == requestDto.Id);

            if (inboundDocumentForUpdate is null)
            {
                throw new NotFoundException($"{nameof(ReceiptDocument)} with id - {requestDto.Id}");
            }

            foreach (var currentInboundResource in inboundDocumentForUpdate.ReceiptResources)
            {
                var balance = await _context.Balances
                    .FirstOrDefaultAsync(x => x.ResourceId == currentInboundResource.ResourceId
                        && x.MeasureUnitId == currentInboundResource.MeasureUnitId);
                if (balance is null || balance.Quantity < currentInboundResource.Quantity)
                {
                    continue;
                }
                
                balance.Quantity -= currentInboundResource.Quantity;
            }


            foreach (var newInboundResource in requestDto.ReceiptResources)
            {
                var balance = await _context.Balances
                    .FirstOrDefaultAsync(x => x.ResourceId == newInboundResource.ResourceId!.Value 
                        && x.MeasureUnitId == newInboundResource.MeasureUnitId!.Value);

                if(balance is null)
                {
                    balance = (await _context.Balances.AddAsync(new Balance()
                    {
                        ResourceId = newInboundResource.ResourceId!.Value,
                        MeasureUnitId = newInboundResource.MeasureUnitId!.Value,
                        Quantity = 0,
                    })).Entity;

                    await _context.SaveChangesAsync(cancellationToken);
                }

                if(balance.Quantity + newInboundResource.Quantity < 0)
                {
                    continue;
                }

                balance.Quantity += newInboundResource.Quantity!.Value;
            }

            await _context.ReceiptResources
                .Where(x => x.ReceiptDocumentId == inboundDocumentForUpdate.Id)
                .ExecuteDeleteAsync(cancellationToken);

            foreach (var newResource in requestDto.ReceiptResources)
            {
                await _context.ReceiptResources.AddAsync(new ReceiptResource()
                {
                    ResourceId = newResource.ResourceId!.Value,
                    MeasureUnitId = newResource.MeasureUnitId!.Value,
                    ReceiptDocumentId = inboundDocumentForUpdate.Id,
                    Quantity = newResource.Quantity!.Value
                });
            }

            await _context.SaveChangesAsync(cancellationToken);

            return (await _context.ReceiptDocuments
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ReceiptResources)
                .ThenInclude(x => x.MeasureUnit)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == inboundDocumentForUpdate.Id))?
                .ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }
}
