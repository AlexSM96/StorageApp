namespace Storage.Application.Interfaces;

public interface IDirectoryService<T> where T : class
{
    public Task<IEnumerable<T>> GetAll(bool? isArchive, CancellationToken cancellationToken = default);

    public Task<T?> Create(string name, CancellationToken cancellationToken = default);
    
    public Task<T?> Update(UpdateNameRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<T?> Archive(UpdateStatusRequestDto requestDto, CancellationToken cancellationToken = default);
    
    public Task<bool> Delete(long id, CancellationToken cancellationToken = default);

}
