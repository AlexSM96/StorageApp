namespace Storage.Application.Services;

internal class ResourceService(IStorageDbContext context) : IDirectoryService<ResourceDto>
{
    private readonly IStorageDbContext _context = context;

    public async Task<IEnumerable<ResourceDto>> GetAll(bool? isArchive, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.Resources
                .Where(x => isArchive == null ? true : isArchive.Value ? x.IsArchive : !x.IsArchive)
                .Select(x => x.ToDto())
                .ToListAsync(cancellationToken)
                ;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ResourceDto?> Create(string name, CancellationToken cancellationToken = default)
    {
        try
        {
            var newResource = Resource.Create(name);
            if (await _context.Resources.AnyAsync(x => x.Name == newResource.Name))
            {
                throw new AlreadyExistException(newResource.Name);
            }

            newResource = (await _context.Resources.AddAsync(newResource, cancellationToken)).Entity;
            await _context.SaveChangesAsync(cancellationToken);

            return newResource?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ResourceDto?> Update(UpdateNameRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || requestDto.Id is null || string.IsNullOrWhiteSpace(requestDto.Name))
            {
                throw new EmptyRequestException(nameof(UpdateNameRequestDto));
            }

            await _context.Resources
                .Where(x => x.Id == requestDto.Id)
                .ExecuteUpdateAsync(spc => spc
                    .SetProperty(e => e.Name, requestDto.Name));

            var updatedResource = await _context.Resources.FindAsync(requestDto.Id.Value);
            if(updatedResource is null)
            {
                throw new NotFoundException(requestDto.Id.Value.ToString());
            }

            return updatedResource.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ResourceDto?> Archive(UpdateStatusRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || requestDto.Id is null || requestDto.IsArchive is null)
            {
                throw new EmptyRequestException(nameof(UpdateStatusRequestDto));
            }

            await _context.Resources
                .Where(x => x.Id == requestDto.Id.Value)
                .ExecuteUpdateAsync(spc => spc.SetProperty(e => e.IsArchive, requestDto.IsArchive.Value));

            return (await _context.Resources.FindAsync(requestDto.Id.Value))?.ToDto();
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
            if(!await CanDeleteResource(id, cancellationToken))
            {
                return false;
            }

            int countDeletedRows = await _context.Resources
                 .Where(x => x.Id == id)
                 .ExecuteDeleteAsync(cancellationToken);
            return countDeletedRows > 0;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    private async Task<bool> CanDeleteResource(long resourceId, CancellationToken cancellationToken = default)
    {
        bool isUsedInReceiptDocuments = await _context.ReceiptResources.AnyAsync(x => x.ResourceId == resourceId);
        bool isUsedInShipmentDocuments = await _context.ShipmentResources.AnyAsync(x => x.ResourceId == resourceId);

        return !(isUsedInReceiptDocuments || isUsedInShipmentDocuments);
    }
}
