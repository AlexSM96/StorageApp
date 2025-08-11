namespace StorageApp.Domain.Entities;

public class ShipmentResource
{
    public long Id { get; set; }

    public long Quantity { get; set; }

    public long ResourceId { get; set; }

    public Resource Resourse { get; set; }

    public long MeasureUnitId { get; set; }

    public MeasureUnit MeasureUnit { get; set; }

    public long ShipmentDocumentId { get; set; }

    public ShipmentDocument ShipmentDocument { get; set; }
}
