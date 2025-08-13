namespace Storage.WebApi.Controllers;

[Route("clients")]
public class ClientController(IClientService clientService) : ApiBaseController
{
    private readonly IClientService _clientService = clientService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll([FromQuery] bool? isArchive, CancellationToken cancellationToken)
    {
        try
        {
            var clients = await _clientService.GetAll(isArchive, cancellationToken);
            return Ok(new { Clients = clients });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.ToString() });
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateClientRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var client = await _clientService.Create(requestDto, cancellationToken);
            return Ok(new { Client = client });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateClientRequestDto requestDto, CancellationToken cancellationToken)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var client = await _clientService.Update(requestDto, cancellationToken);
            return Ok(new { Client = client });
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
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var client = await _clientService.Archive(requestDto, cancellationToken);
            return Ok(new { Clients = client });
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
            bool isDeleted = await _clientService.Delete(id, cancellationToken);
            return Ok(new { Success = isDeleted });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }
}
