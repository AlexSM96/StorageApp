namespace StorageApp.Domain.Entities;

public class ReceiptResource
{
    public long Id { get; set; }

    public long Quantity { get; set; }

    public long ReceiptDocumentId { get; set; }

    public ReceiptDocument ReceiptDocument { get; set; }

    public long ResourceId { get; set; }

    public Resource Resourse { get; set; }

    public long MeasureUnitId { get; set; }

    public MeasureUnit MeasureUnit { get; set; }
}
