namespace Storage.Application.Services;

public class ClientService(IStorageDbContext context) : IClientService
{
    private readonly IStorageDbContext _context = context;

    public async Task<IEnumerable<ClientDto>> GetAll(bool? isArchive, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.Clients
                .Where(x => isArchive == null ? true : isArchive.Value ? x.IsArchive : !x.IsArchive)
                .Select(x => x.ToDto())
                .ToListAsync();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ClientDto?> Create(CreateClientRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || string.IsNullOrWhiteSpace(requestDto.Name) || string.IsNullOrWhiteSpace(requestDto.Address))
            {
                throw new EmptyRequestException(nameof(CreateClientRequestDto));
            }

            var newClient = Client.Create(requestDto.Name, requestDto.Address);
            if(await _context.Clients.AnyAsync(x => x.Name == newClient.Name))
            {
                throw new AlreadyExistException(requestDto.Name);
            }

            newClient = (await _context.Clients.AddAsync(newClient)).Entity;
            await _context.SaveChangesAsync(cancellationToken);

            return newClient?.ToDto();
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ClientDto?> Archive(UpdateStatusRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if (requestDto is null || requestDto.Id is null || requestDto.IsArchive is null) 
            {
                throw new EmptyRequestException(nameof(UpdateStatusRequestDto));
            }

            await _context.Clients
                .Where(x => x.Id == requestDto.Id.Value)
                .ExecuteUpdateAsync(x => x
                    .SetProperty(e => e.IsArchive, requestDto.IsArchive.Value));

            return (await _context.Clients.FindAsync(requestDto.Id.Value))?.ToDto();
        }
        catch (Exception e) 
        {
            throw new Exception(e.ToString());
        }
    }

    public async Task<ClientDto?> Update(UpdateClientRequestDto requestDto, CancellationToken cancellationToken = default)
    {
        try
        {
            if(requestDto is null || requestDto.Id is null)
            {
                throw new EmptyRequestException(nameof(UpdateClientRequestDto));
            }

            await _context.Clients
                .Where(x => x.Id == requestDto.Id.Value)
                .ExecuteUpdateAsync(spc => spc
                    .SetProperty(e => e.Name, requestDto.Name)
                    .SetProperty(e => e.Address, requestDto.Address));


            return (await _context.Clients.FindAsync(requestDto.Id.Value))?.ToDto();
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
            if(!await CanDeleteClient(id, cancellationToken))
            {
                return false;
            }

            return await _context.Clients
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync(cancellationToken) > 0;
        }
        catch (Exception e)
        {
            throw new Exception(e.ToString());
        }
    }

    private async Task<bool> CanDeleteClient(long clientId, CancellationToken cancellationToken = default)
    {
        bool isUsedInReceiptDocuments = await _context.ShipmentDocuments.AnyAsync(x => x.ClientId == clientId);
        return !isUsedInReceiptDocuments;
    }
}
