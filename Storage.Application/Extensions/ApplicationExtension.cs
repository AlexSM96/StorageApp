namespace Storage.Application.Extensions;

public static class ApplicationExtension
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services
            .AddScoped<IDirectoryService<ResourceDto>, ResourceService>()
            .AddScoped<IDirectoryService<MeasureUnitDto>, MeasureUnitService>()
            .AddScoped<IClientService, ClientService>()
            .AddScoped<IBalanceService, BalanceService>()
            .AddScoped<IReceiptService, ReceiptService>()
            .AddScoped<IShipmentService, ShipmentService>();
    }
}
