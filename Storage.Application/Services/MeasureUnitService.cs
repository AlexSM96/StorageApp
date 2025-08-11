namespace Storage.Application.Services;

public class MeasureUnitService(IStorageDbContext context) : IDirectoryService<MeasureUnitDto>
{
    private readonly IStorageDbContext _context = context;

    public async Task<IEnumerable<MeasureUnitDto>> GetAll(bool? isArchive, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.MeasureUnits
                .Where(x => isArchive == null ? true : isArchive.Value ? x.IsArchive : !x.IsArchive)
                .Select(x => x.ToDto())
                .ToListAsync(cancellationToken);
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<MeasureUnitDto?> Create(string name, CancellationToken cancellationToken = default)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new EmptyRequestException($"{nameof(MeasureUnit)} empty name");
            }

            var unit = MeasureUnit.Create(name);

            if (await _context.MeasureUnits.AnyAsync(x => x.Name == name))
            {
                throw new AlreadyExistException("");
            }

            unit = (await _context.MeasureUnits.AddAsync(unit, cancellationToken))?.Entity;
            await _context.SaveChangesAsync(cancellationToken);
            return unit?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<MeasureUnitDto?> Archive(UpdateStatusRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || requestDto.Id is null || requestDto.IsArchive is null)
            {
                throw new EmptyRequestException(nameof(UpdateStatusRequestDto));
            }

            await _context.MeasureUnits
                .Where(x => x.Id == requestDto.Id.Value)
                .ExecuteUpdateAsync(spc => spc.SetProperty(e => e.IsArchive, requestDto.IsArchive.Value));

            return (await _context.MeasureUnits.FindAsync(requestDto.Id.Value))?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<MeasureUnitDto?> Update(UpdateNameRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || requestDto.Id is null || string.IsNullOrWhiteSpace(requestDto.Name))
            {
                throw new EmptyRequestException(nameof(UpdateNameRequestDto));
            }

            await _context.MeasureUnits
                .Where(x => x.Id == requestDto.Id.Value)
                .ExecuteUpdateAsync(spc => spc
                    .SetProperty(e => e.Name, requestDto.Name), cancellationToken);

            return (await _context.MeasureUnits.FindAsync(requestDto.Id.Value))?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<bool> Delete(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            if (!await CanDeleteMeashureUnit(id, cancellationToken))
            {
                return false;
            }

            int countDeletedRow = await _context.MeasureUnits
                 .Where(x => x.Id == id)
                 .ExecuteDeleteAsync(cancellationToken);

            return countDeletedRow > 0;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    private async Task<bool> CanDeleteMeashureUnit(long unitId, CancellationToken cancellationToken = default)
    {
        bool isUsedInReceiptDocuments = await _context.ReceiptResources.AnyAsync(x => x.MeasureUnitId == unitId);
        bool isUsedInShipmentDocuments = await _context.ShipmentResources.AnyAsync(x => x.MeasureUnitId == unitId);

        return !(isUsedInReceiptDocuments || isUsedInShipmentDocuments);
    }
}