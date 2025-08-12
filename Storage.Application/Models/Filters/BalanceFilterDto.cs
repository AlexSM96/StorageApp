namespace Storage.Application.Models.Filters;

public class BalanceFilterDto
{
    public List<long>? ResourceIds { get; set; }
    public List<long>? MeasureUnitIds { get; set; }
}

