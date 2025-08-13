using System.ComponentModel.DataAnnotations;

namespace Storage.Application.Models.Reseipts;

public record CreateReceiptDocumentRequestDto(
    [Required (ErrorMessage = "Укажите номер документа поступления")]
    string? Number,
    [Required (ErrorMessage = "Укажите дату документа поступления")]
    DateTime? Date,
    IEnumerable<CreateReceiptResourceRequestDto>? ReceiptResources);

