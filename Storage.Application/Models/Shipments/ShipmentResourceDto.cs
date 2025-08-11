using Storage.Application.Models.Directories;

namespace Storage.Application.Models.Shipments;

public record ShipmentResourceDto(ResourceDto Resource, MeasureUnitDto MeasureUnit, long Quantity);

