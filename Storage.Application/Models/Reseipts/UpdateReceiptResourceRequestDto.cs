namespace Storage.Application.Models;

public record UpdateReceiptResourceRequestDto(long? Id, long? ResourceId, long? MeasureUnitId, long? Quantity);

