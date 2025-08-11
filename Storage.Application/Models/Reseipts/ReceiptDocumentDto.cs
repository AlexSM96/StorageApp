namespace Storage.Application.Models;

public record ReceiptDocumentDto(string Number, DateTime Date, IEnumerable<ReceiptResourceDto> ReceiptResources);

