namespace Storage.Application.Models;

public record UpdateShipmentResourceRequestDto(long Id, long? ResourceId, long? MeasureUnitId, long? Quantity);

