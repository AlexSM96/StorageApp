namespace Storage.Application.Models;

public record UpdateShipmentDocumentRequsetDto(long Id, string? Number, long? ClientId, DateTime? Date, IEnumerable<UpdateShipmentResourceRequestDto> ShipmentResources);

