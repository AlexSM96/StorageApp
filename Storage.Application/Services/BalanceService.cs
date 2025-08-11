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
                .Where(x => filter != null 
                    && (filter.ResourceIds == null || filter.ResourceIds.Contains(x.ResourceId))
                    && (filter.MeasureUnitIds == null || filter.MeasureUnitIds.Contains(x.MeasureUnitId)))  
                .Select(x => x.ToDto())
                .ToListAsync();
        }
        catch(Exception e) 
        {
            throw new Exception(e.ToString());
        }
    }
}
