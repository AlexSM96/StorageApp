namespace Storage.Application.Models.Filters;

public class ReceiptFilterDto
{
    public DateTime? From { get; set; }

    public DateTime? To { get; set; }

    public List<string>? Numbers { get; set; }

    public List<long>? ResourceIds { get; set; }

    public List<long>? MeasureUnitIds { get; set; }

}

public class ShipmentFilterDto : ReceiptFilterDto
{
    public List<long>? ClientIds { get; set; }
}
