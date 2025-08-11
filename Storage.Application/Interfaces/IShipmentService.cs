namespace Storage.Application.Interfaces;

public interface IShipmentService
{
    public Task<IEnumerable<ShipmentDocumentDto>> GetAll(CancellationToken cancellationToken = default);

    public Task<ShipmentDocumentDto?> CreateShipmentDocument(CreateShipmentDocumentRequestDto requestDto, CancellationToken cancellationToken = default);

    public Task<ShipmentDocumentDto?> UpdateShipmentDocument(UpdateShipmentDocumentRequsetDto requestDto, CancellationToken cancellationToken = default);

    public Task<bool?> DeleteShipmentDocument(long id, CancellationToken cancellationToken = default);

    public Task<bool?> SignShipmentDocument(long id, CancellationToken cancellationToken = default);

    public Task<bool?> UnsignShipmentDocument(long id, CancellationToken cancellationToken = default);

}
