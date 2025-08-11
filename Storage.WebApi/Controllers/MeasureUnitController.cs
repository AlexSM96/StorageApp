namespace Storage.WebApi.Controllers;

[Route("measureunits")]
public class MeasureUnitController(IDirectoryService<MeasureUnitDto> unitService) : ApiBaseController
{
    private readonly IDirectoryService<MeasureUnitDto> _unitService = unitService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll([FromQuery] bool? isArchive, CancellationToken cancellationToken)
    {
        try
        {
            var units = await _unitService.GetAll(isArchive, cancellationToken);
            return Ok(new { Units = units });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateMeasureUnitDto request, CancellationToken cancellationToken)
    {
        try
        {
            var unit = await _unitService.Create(request.Name, cancellationToken);
            return Ok(new { Unit = unit });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateNameRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            var unit = await _unitService.Update(requestDto, cancellationToken);
            return Ok(new { Unit = unit });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPut("archive")]
    public async Task<IActionResult> Archive([FromBody] UpdateStatusRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            var unit = await _unitService.Archive(requestDto, cancellationToken);
            return Ok(new { Unit = unit });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete([FromQuery] long id, CancellationToken cancellationToken)
    {
        try
        {
            bool isDeleted = await _unitService.Delete(id, cancellationToken);
            return Ok(new { Success = isDeleted });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }
}
