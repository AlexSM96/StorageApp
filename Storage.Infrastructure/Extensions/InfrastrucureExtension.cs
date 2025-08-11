namespace Storage.Infrastructure.Extensions;

public static class InfrastrucureExtension
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .AddDbContext<StorageDbContext>(opt =>
            {
                opt.UseNpgsql(configuration.GetConnectionString("StorageDb"));
            })
            .AddScoped<IStorageDbContext, StorageDbContext>()
            ;
    }

    public static IServiceProvider CreateDbIfNotExist(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        using var dbService = scope.ServiceProvider.GetRequiredService<StorageDbContext>();
        dbService.Database.EnsureCreated();
        
        return serviceProvider;
    }
}
