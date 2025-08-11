namespace Storage.Application.Models;

public record CreateShipmentResourceRequestDto(long? ResourceId, long? MeasureUnitId, long? Quantity);

