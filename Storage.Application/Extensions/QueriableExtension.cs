namespace Storage.Application.Extensions;

internal static class QueriableExtension
{
    public static IQueryable<Balance> Filter(this IQueryable<Balance> balances, BalanceFilterDto? filter)
    {
        if (filter is null)
        {
            return balances;
        }

        if (filter.ResourceIds is not null && filter.ResourceIds.Count > 0)
        {
            balances = balances.Where(x => filter.ResourceIds.Contains(x.ResourceId));
        }

        if (filter.MeasureUnitIds is not null && filter.MeasureUnitIds.Count > 0)
        {
            balances = balances.Where(x => filter.MeasureUnitIds.Contains(x.MeasureUnitId));
        }

        return balances;
    }

    public static IQueryable<ReceiptDocument> Filter(this IQueryable<ReceiptDocument> documents, ReceiptFilterDto? filter) 
    {
        if(filter is null)
        {
            return documents;
        }

        if(filter.From is not null)
        {
            documents = documents.Where(x => x.Date.Date >= filter.From.Value.Date);
        }

        if(filter.To is not null)
        {
            documents = documents.Where(x => x.Date.Date <= filter.To.Value.Date);
        }

        if(filter.Numbers is not null && filter.Numbers.Count > 0)
        {
            documents = documents.Where(x => filter.Numbers.Contains(x.Number));
        }

        if(filter.ResourceIds is not null && filter.ResourceIds.Count > 0)
        {
            documents = documents.Where(x => x.ReceiptResources != null && x.ReceiptResources.Any(r => filter.ResourceIds.Contains(r.ResourceId)));
        }

        if(filter.MeasureUnitIds is not null && filter.MeasureUnitIds.Count > 0)
        {
            documents = documents.Where(x => x.ReceiptResources.Any(r => filter.MeasureUnitIds.Contains(r.MeasureUnitId)));
        }

        return documents;
    }

    public static IQueryable<ShipmentDocument> Filter(this IQueryable<ShipmentDocument> documents, ShipmentFilterDto? filter)
    {
        if(filter is null)
        {
            return documents;
        }

        if (filter.From is not null)
        {
            documents = documents.Where(x => x.Date.Date >= filter.From.Value.Date);
        }

        if (filter.To is not null)
        {
            documents = documents.Where(x => x.Date.Date <= filter.To.Value.Date);
        }

        if (filter.Numbers is not null && filter.Numbers.Count > 0)
        {
            documents = documents.Where(x => filter.Numbers.Contains(x.Number));
        }

        if (filter.ClientIds is not null && filter.ClientIds.Count > 0) 
        {
            documents = documents.Where(x=> filter.ClientIds.Contains(x.ClientId));
        }

        if (filter.ResourceIds is not null && filter.ResourceIds.Count > 0)
        {
            documents = documents.Where(x => x.ShipmentResources != null && x.ShipmentResources.Any(r => filter.ResourceIds.Contains(r.ResourceId)));
        }

        if (filter.MeasureUnitIds is not null && filter.MeasureUnitIds.Count > 0)
        {
            documents = documents.Where(x => x.ShipmentResources.Any(r => filter.MeasureUnitIds.Contains(r.MeasureUnitId)));
        }

        return documents;
    }
}
