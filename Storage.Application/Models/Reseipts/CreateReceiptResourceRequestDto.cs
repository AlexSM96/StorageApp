namespace Storage.Application.Models.Reseipts;

public record CreateReceiptResourceRequestDto(long? ResourceId, long? MeasureUnitId, long? Quantity);

