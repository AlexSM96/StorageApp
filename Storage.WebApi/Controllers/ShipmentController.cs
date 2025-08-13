namespace Storage.WebApi.Controllers;

[Route("shipments")]
public class ShipmentController(IShipmentService shipmentService) : ApiBaseController
{
    private readonly IShipmentService _shipmentService = shipmentService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll([FromQuery] ShipmentFilterDto filter, CancellationToken cancellationToken)
    {
        try
        {
            var shipments = await _shipmentService.GetAll(filter, cancellationToken);
            return Ok(new { Shipments = shipments });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateShipmentDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var shipmentDocument = await _shipmentService.CreateShipmentDocument(requestDto, cancellationToken);
            return Ok(new { ShipmentDocument = shipmentDocument });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateShipmentDocumentRequsetDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var shipmentDocument = await _shipmentService.UpdateShipmentDocument(requestDto, cancellationToken);
            return Ok(new { ShipmentDocument = shipmentDocument });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpDelete("sign")]
    public async Task<IActionResult> Sign([FromQuery] long id, CancellationToken cancellationToken)
    {
        try
        {
            bool? isSigned = await _shipmentService.SignShipmentDocument(id, cancellationToken);
            if(isSigned is null)
            {
                return NotFound();
            }

            return Ok(new { Success = isSigned });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpDelete("unsign")]
    public async Task<IActionResult> Unsign([FromQuery] long id, CancellationToken cancellationToken)
    {
        try
        {
            var isUnsigned = await _shipmentService.UnsignShipmentDocument(id, cancellationToken);
            if (isUnsigned is null)
            {
                return NotFound();
            }

            return Ok(new { Success = isUnsigned });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }


    [HttpDelete("delete")]
    public async Task<IActionResult> Delete([FromQuery] long id, CancellationToken cancellationToken)
    {
        try
        {
            bool? isDeleted = await _shipmentService.DeleteShipmentDocument(id, cancellationToken);
            if (isDeleted is null)
            {
                return NotFound();
            }

            return Ok(new { Success = isDeleted });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }
}
