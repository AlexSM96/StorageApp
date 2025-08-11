namespace Storage.Application.Models;

public record ReceiptResourceDto(ResourceDto Resource, MeasureUnitDto MeasureUnit, long Quantity);

