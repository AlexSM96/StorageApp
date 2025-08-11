namespace Storage.Application.Models.Reseipts;

public record CreateReceiptDocumentRequestDto(string? Number, DateTime? Date, IEnumerable<CreateReceiptResourceRequestDto> ReceiptResources);

