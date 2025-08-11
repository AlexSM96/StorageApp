namespace Storage.Application.Models.Shipments;

public record ShipmentDocumentDto(long Id, 
    string Number, 
    ClientDto Client, 
    DateTime Date, 
    ShipmentStatus ShipmentStatus, 
    IEnumerable<ShipmentResourceDto> ShipmentResources);

