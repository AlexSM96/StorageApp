namespace StorageApp.Domain.Entities;

public class ShipmentDocument : BaseDocumentEntity
{
    public ShipmentStatus ShipmentStatus { get; set; }

    public long ClientId { get; set; }
    
    public Client Client { get; set; }

    public IEnumerable<ShipmentResource> ShipmentResources { get; set; }
}
