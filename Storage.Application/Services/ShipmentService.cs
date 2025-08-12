namespace Storage.Application.Services;

public class ShipmentService(IStorageDbContext context) : IShipmentService
{
    private readonly IStorageDbContext _context = context;

    public async Task<IEnumerable<ShipmentDocumentDto>> GetAll(CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.ShipmentDocuments
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.MeasureUnit)
                .Include(x => x.Client)
                .AsNoTracking()
                .Select(x => x.ToDto())
                .ToListAsync();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ShipmentDocumentDto?> CreateShipmentDocument(CreateShipmentDocumentRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null
                || string.IsNullOrWhiteSpace(requestDto.Number)
                || requestDto.ClientId is null
                || requestDto.Date is null
                || !requestDto.ShipmentResources.Any()
                || requestDto.ShipmentResources.Any(x => x.ResourceId is null || x.MeasureUnitId is null || x.Quantity is null)
                || requestDto.ShipmentResources.All(x => x.Quantity <= 0))
            {
                throw new EmptyRequestException(nameof(CreateShipmentDocumentRequestDto));
            }

            foreach (var item in requestDto.ShipmentResources)
            {
                if (!await _context.Balances.AnyAsync(x => x.ResourceId == item.ResourceId!.Value 
                    && x.MeasureUnitId == item.MeasureUnitId!.Value))
                {
                    throw new NotFoundException($"{nameof(Balance)} with ResourceId - {item.ResourceId} and MeasureUnitId - {item.MeasureUnitId}");
                }
            }

            var newDocument = new ShipmentDocument()
            {
                Number = requestDto.Number,
                ClientId = requestDto.ClientId.Value,
                Date = requestDto.Date.Value,
                ShipmentResources = requestDto.ShipmentResources.Select(x => new ShipmentResource()
                {
                    ResourceId = x.ResourceId!.Value,
                    MeasureUnitId = x.MeasureUnitId!.Value,
                    Quantity = x.Quantity!.Value,
                }).ToList()
            };

            await _context.ShipmentDocuments.AddAsync(newDocument, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return (await _context.ShipmentDocuments
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.MeasureUnit)
                .Include(x => x.Client)
                .FirstOrDefaultAsync(x => x.Id == newDocument.Id))
                ?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ShipmentDocumentDto?> UpdateShipmentDocument(UpdateShipmentDocumentRequsetDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null
                || string.IsNullOrWhiteSpace(requestDto.Number)
                || requestDto.ClientId is null
                || requestDto.Date is null
                || !requestDto.ShipmentResources.Any()
                || requestDto.ShipmentResources.Any(x => x.ResourceId is null || x.MeasureUnitId is null || x.Quantity is null)
                || requestDto.ShipmentResources.All(x => x.Quantity <= 0))
            {
                throw new EmptyRequestException(nameof(CreateShipmentDocumentRequestDto));
            }

            foreach (var item in requestDto.ShipmentResources)
            {
                if (!await _context.Balances.AnyAsync(x => x.ResourceId == item.ResourceId!.Value
                    && x.MeasureUnitId == item.MeasureUnitId!.Value))
                {
                    throw new NotFoundException($"{nameof(Balance)} with ResourceId - {item.ResourceId} and MeasureUnitId - {item.MeasureUnitId}");
                }
            }

            var documentForUpdate = await _context.ShipmentDocuments.FindAsync(requestDto.Id);
            if (documentForUpdate is null) 
            {
                throw new NotFoundException($"{nameof(ShipmentDocument)} with id - {requestDto.Id}");
            }

            if (documentForUpdate is { ShipmentStatus: ShipmentStatus.Signed })
            {
                throw new InvalidOperationException("Is signed document cannot be changed");
            }

            if (await _context.ShipmentDocuments.AnyAsync(x => x.Number == requestDto.Number && x.Id != requestDto.Id))
            {
                throw new AlreadyExistException($"{nameof(ShipmentDocument)} with number - {requestDto.Number}");
            }

            await _context.ShipmentResources
                .Where(x => x.ShipmentDocumentId == requestDto.Id)
                .ExecuteDeleteAsync(cancellationToken);

            foreach (var newResource in requestDto.ShipmentResources)
            {
                await _context.ShipmentResources.AddAsync(new ShipmentResource()
                {
                    ResourceId = newResource.ResourceId!.Value,
                    MeasureUnitId = newResource.MeasureUnitId!.Value,
                    ShipmentDocumentId = requestDto.Id,
                    Quantity = newResource.Quantity!.Value
                }, cancellationToken);
            }

            documentForUpdate.Number = requestDto.Number;
            documentForUpdate.Date = requestDto.Date.Value;
            documentForUpdate.ClientId = requestDto.ClientId.Value;

            await _context.SaveChangesAsync(cancellationToken);

            return (await _context.ShipmentDocuments
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.Resourse)
                .Include(x => x.ShipmentResources)
                .ThenInclude(x => x.MeasureUnit)
                .Include(x => x.Client)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == requestDto.Id))
                ?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<bool?> DeleteShipmentDocument(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.ShipmentDocuments
                 .Where(x => x.Id == id && x.ShipmentStatus == ShipmentStatus.Unsigned)
                 .ExecuteDeleteAsync(cancellationToken) > 0;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<bool?> SignShipmentDocument(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            var document = await _context.ShipmentDocuments
                .Include(x => x.ShipmentResources)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (document is null)
            {
                throw new NotFoundException($"{nameof(ShipmentDocument)} with id - {id}");
            }

            if (!document.ShipmentResources.Any())
            {
                throw new InvalidOperationException("Empty document");
            }

            foreach (var resource in document.ShipmentResources)
            {
                var balance = await _context.Balances
                    .FirstOrDefaultAsync(x => x.ResourceId == resource.ResourceId
                        && x.MeasureUnitId == resource.MeasureUnitId, cancellationToken);

                if (balance is null || balance.Quantity < resource.Quantity)
                {
                    return false;
                }
            }

            foreach (var resource in document.ShipmentResources)
            {
                var balance = await _context.Balances
                    .FirstAsync(b => b.ResourceId == resource.ResourceId && b.MeasureUnitId == resource.MeasureUnitId);

                balance.Quantity -= resource.Quantity;
            }

            document.ShipmentStatus = ShipmentStatus.Signed;
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<bool?> UnsignShipmentDocument(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            var document = await _context.ShipmentDocuments
                .Include(x => x.ShipmentResources)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (document is null) 
            {
                throw new NotFoundException($"{nameof(ShipmentDocument)} with id - {id}");
            }

            if (!document.ShipmentResources.Any())
            {
                throw new InvalidOperationException("Empty document");
            }

            if (document is { ShipmentStatus: ShipmentStatus.Unsigned }) 
            {
                return false;
            }

            foreach(var resource in document.ShipmentResources)
            {
                var balance = await _context.Balances
                    .FirstOrDefaultAsync(x => x.ResourceId == resource.ResourceId 
                        && x.MeasureUnitId == resource.MeasureUnitId, cancellationToken);

                if(balance is null)
                {
                    await _context.Balances.AddAsync(new Balance()
                    {
                        ResourceId = resource.ResourceId,
                        MeasureUnitId = resource.MeasureUnitId,
                        Quantity = resource.Quantity
                    }, cancellationToken);

                    continue;
                }

                balance.Quantity += resource.Quantity;
            }

            document.ShipmentStatus = ShipmentStatus.Unsigned;
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
        catch(Exception e)
        {
            throw new Exception(e.ToString());
        }
    }
}
