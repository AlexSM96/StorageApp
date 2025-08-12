namespace Storage.Application.Models;

public record ReceiptDocumentDto(long Id, string Number, DateTime Date, IEnumerable<ReceiptResourceDto> ReceiptResources);

