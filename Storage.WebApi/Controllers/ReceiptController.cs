using Storage.Application.Models.Reseipts;

namespace Storage.WebApi.Controllers;

[Route("receipts")]
public class ReceiptController(IReceiptService receiptService) : ApiBaseController
{
    private readonly IReceiptService _receiptService = receiptService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll([FromQuery] ReceiptFilterDto filter, CancellationToken cancellationToken)
    {
        try
        {
            var receipts = await _receiptService.GetAll(filter, cancellationToken);
            return Ok(new { Receipts = receipts });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var inboundDocument = await _receiptService.CreateReceiptDocument(requestDto, cancellationToken);
            return Ok(new { InboundDocument = inboundDocument });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateReceiptDocumentRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var inboundDocument = await _receiptService.UpdateReceiptDocument(requestDto, cancellationToken);
            return Ok(new { InboundDocument = inboundDocument });
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
            bool? isDeleted = await _receiptService.DeleteReceiptDocument(id, cancellationToken);
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
