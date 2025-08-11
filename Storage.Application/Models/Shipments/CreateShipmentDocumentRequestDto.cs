namespace Storage.Application.Models;

public record CreateShipmentDocumentRequestDto(string? Number, long? ClientId, DateTime? Date, IEnumerable<CreateShipmentResourceRequestDto> ShipmentResources);

