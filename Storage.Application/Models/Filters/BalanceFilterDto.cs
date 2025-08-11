namespace Storage.Application.Models.Filters;

public record BalanceFilterDto(List<long>? ResourceIds, List<long>? MeasureUnitIds);

