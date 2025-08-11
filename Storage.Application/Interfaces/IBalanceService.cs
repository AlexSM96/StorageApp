

namespace Storage.Application.Interfaces;

public interface IBalanceService
{
    public Task<IEnumerable<BalanceDto>> GetBalance(BalanceFilterDto? filter, CancellationToken cancellationToken = default);
}
