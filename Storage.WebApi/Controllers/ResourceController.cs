namespace Storage.WebApi.Controllers;

[Route("resources")]
public class ResourceController(IDirectoryService<ResourceDto> resourceService) : ApiBaseController
{
    private readonly IDirectoryService<ResourceDto> _resourceService = resourceService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll([FromQuery] bool? isArchive, CancellationToken cancellationToken)
    {
        try
        {
            var resources = await _resourceService.GetAll(isArchive, cancellationToken);
            return Ok(new { Resources = resources });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateResourceDto request, CancellationToken cancellationToken)
    {
        try
        {
            var resource = await _resourceService.Create(request.Name, cancellationToken);
            return Ok(new { Resource = resource });
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
            var resource = await _resourceService.Update(requestDto, cancellationToken);
            return Ok(new { Resource = resource });
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
            var resource = await _resourceService.Archive(requestDto, cancellationToken);
            return Ok(new { Resource = resource });
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
            bool isDeleted = await _resourceService.Delete(id, cancellationToken);
            return Ok(new { Success = isDeleted });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }
}
