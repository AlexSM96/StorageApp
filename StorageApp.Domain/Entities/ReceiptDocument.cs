namespace StorageApp.Domain.Entities;

public class ReceiptDocument : BaseDocumentEntity
{
    public IEnumerable<ReceiptResource> ReceiptResources { get; set; }
}
