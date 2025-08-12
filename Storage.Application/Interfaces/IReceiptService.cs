namespace Storage.Application.Interfaces;

public interface IReceiptService
{
    public Task<IEnumerable<ReceiptDocumentDto>> GetAll(ReceiptFilterDto filter, CancellationToken cancellationToken = default);

    public Task<ReceiptDocumentDto?> CreateReceiptDocument(CreateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<ReceiptDocumentDto?> UpdateReceiptDocument(UpdateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<bool?> DeleteReceiptDocument(long id, CancellationToken cancellationToken = default);
}
