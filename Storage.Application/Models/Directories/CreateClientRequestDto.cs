using System.ComponentModel.DataAnnotations;

namespace Storage.Application.Models;

public record CreateClientRequestDto(
    [Required(AllowEmptyStrings = false, ErrorMessage = "Заполните наименование клиента")] 
    string? Name,
    [Required(AllowEmptyStrings = false, ErrorMessage = "Заполните адресс")]
    string? Address);

