using System.ComponentModel.DataAnnotations;

namespace Storage.Application.Models;

public record CreateShipmentDocumentRequestDto(
    [Required(ErrorMessage = "Укажите номер документа отгрузки")]
    string? Number,
    [Required(ErrorMessage = "Укажите клиента")]
    long? ClientId, 
    [Required(ErrorMessage = "Укажите дату документа поступления")] 
    DateTime? Date, 
    [Required(ErrorMessage = "Документ отгрузки не может быть пустым, укажите количество отгружаемых ресурсов")] 
    IEnumerable<CreateShipmentResourceRequestDto> ShipmentResources);

