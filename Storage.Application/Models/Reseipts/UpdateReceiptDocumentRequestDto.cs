namespace Storage.Application.Models;

public record UpdateReceiptDocumentRequestDto(long Id, string? Number, DateTime? Date, IEnumerable<UpdateReceiptResourceRequestDto> ReceiptResources);

