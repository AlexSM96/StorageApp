using System.ComponentModel.DataAnnotations;

namespace Storage.Application.Models;

public record UpdateReceiptDocumentRequestDto(
    long Id,
    [Required(ErrorMessage = "Укажите номер документа поступления")]
    string? Number,
    [Required(ErrorMessage = "Укажите дату документа поступления")]
    DateTime? Date, 
    IEnumerable<UpdateReceiptResourceRequestDto> ReceiptResources);

