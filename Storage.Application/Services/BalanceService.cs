namespace Storage.Application.Services;

public class BalanceService(IStorageDbContext context) : IBalanceService
{
    private readonly IStorageDbContext _context = context;

    public async Task<IEnumerable<BalanceDto>> GetBalance(BalanceFilterDto? filter, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _context.Balances
                .Include(x => x.MeasureUnit)
                .Include(x => x.Resourse)
                .Filter(filter)
                .Select(x => x.ToDto())
                .ToListAsync();
        }
        catch(Exception e) 
        {
            throw new Exception(e.ToString());
        }
    }
}
