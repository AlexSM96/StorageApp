namespace Storage.Application.Extensions;

internal static class ModelExtension
{
    public static ResourceDto ToDto(this Resource resource) 
        => new ResourceDto(resource.Id, resource.Name, resource.IsArchive);

    public static MeasureUnitDto ToDto(this MeasureUnit unit) 
        => new MeasureUnitDto(unit.Id, unit.Name, unit.IsArchive);

    public static ClientDto ToDto(this Client client) 
        => new ClientDto(client.Id, client.Name, client.Address, client.IsArchive);

    public static BalanceDto ToDto(this Balance balance)
        => new BalanceDto(balance.Resourse.ToDto(), 
            balance.MeasureUnit.ToDto(), 
            balance.Quantity);

    public static ReceiptResourceDto ToDto(this ReceiptResource receiptResource)
        => new ReceiptResourceDto(receiptResource.Resourse.ToDto(), 
            receiptResource.MeasureUnit.ToDto(), 
            receiptResource.Quantity);

    public static ReceiptDocumentDto ToDto(this ReceiptDocument receiptDocument)
        => new ReceiptDocumentDto(receiptDocument.Id,
            receiptDocument.Number, 
            receiptDocument.Date, 
            receiptDocument.ReceiptResources.Select(x => x.ToDto()).ToList());

    public static ShipmentDocumentDto ToDto(this ShipmentDocument shipmentDocument)
        => new ShipmentDocumentDto(shipmentDocument.Id,
            shipmentDocument.Number, 
            shipmentDocument.Client.ToDto(), 
            shipmentDocument.Date, 
            shipmentDocument.ShipmentStatus,
            shipmentDocument.ShipmentResources.Select(x => x.ToDto()).ToList());

    public static ShipmentResourceDto ToDto(this ShipmentResource shipmentResource)
        => new ShipmentResourceDto(shipmentResource.Resourse.ToDto(), 
            shipmentResource.MeasureUnit.ToDto(), 
            shipmentResource.Quantity);
}
