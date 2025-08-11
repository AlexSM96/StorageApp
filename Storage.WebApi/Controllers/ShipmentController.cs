namespace Storage.WebApi.Controllers;

[Route("shipments")]
public class ShipmentController(IShipmentService shipmentService) : ApiBaseController
{
    private readonly IShipmentService _shipmentService = shipmentService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        try
        {
            var shipments = await _shipmentService.GetAll(cancellationToken);
            return Ok(new { Shipments = shipments });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateShipmentDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            var shipmentDocument = await _shipmentService.CreateShipmentDocument(requestDto, cancellationToken);
            return Ok(new { ShipmentDocument = shipmentDocument });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateShipmentDocumentRequsetDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            var shipmentDocument = await _shipmentService.UpdateShipmentDocument(requestDto, cancellationToken);
            return Ok(new { ShipmentDocument = shipmentDocument });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPut("sign/{id:long}")]
    public async Task<IActionResult> Sign(long id, CancellationToken cancellationToken)
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
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPut("unsign/{id:long}")]
    public async Task<IActionResult> Unsign(long id, CancellationToken cancellationToken)
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
            return BadRequest(new { Error = e.ToString() });
        }
    }


    [HttpDelete("delete/{id:long}")]
    public async Task<IActionResult> Delete(long id, CancellationToken cancellationToken)
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
            return BadRequest(new { Error = e.ToString() });
        }
    }
}
