namespace Storage.Application.Models;

public record BalanceDto(ResourceDto Resource, MeasureUnitDto MeasureUnit, long Quantity);

