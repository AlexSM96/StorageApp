namespace Storage.WebApi.Controllers;

[Route("balances")]
public class BalanceController(IBalanceService balanceService) : ApiBaseController
{
    private readonly IBalanceService _balanceService = balanceService;

    [HttpGet("getall")]
    public async Task<IActionResult> GetBalance([FromQuery] BalanceFilterDto? filter, CancellationToken cancellationToken)
    {
        try
        {
            var balance = await _balanceService.GetBalance(filter, cancellationToken);
            return Ok(new { Balance = balance });
        }
        catch (Exception e)
        {
            return BadRequest(new { Error = e.Message });
        }
    }
}
