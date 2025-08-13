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
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateResourceDto request, CancellationToken cancellationToken)
    {
        try
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var resource = await _resourceService.Create(request.Name, cancellationToken);
            return Ok(new { Resource = resource });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateNameRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var resource = await _resourceService.Update(requestDto, cancellationToken);
            return Ok(new { Resource = resource });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPut("archive")]
    public async Task<IActionResult> Archive([FromBody] UpdateStatusRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(requestDto);

            var resource = await _resourceService.Archive(requestDto, cancellationToken);
            return Ok(new { Resource = resource });
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
            bool isDeleted = await _resourceService.Delete(id, cancellationToken);
            return Ok(new { Success = isDeleted });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }
}
