namespace Storage.Application.Interfaces;

public interface IClientService
{
    public Task<IEnumerable<ClientDto>> GetAll(bool? isArchive, CancellationToken cancellationToken = default);

    public Task<ClientDto?> Create(CreateClientRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<ClientDto?> Update(UpdateClientRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<ClientDto?> Archive(UpdateStatusRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<bool> Delete(long id, CancellationToken cancellationToken = default);
}
