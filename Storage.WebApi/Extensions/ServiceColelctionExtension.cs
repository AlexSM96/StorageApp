namespace Storage.WebApi.Extensions;

public static class ServiceColelctionExtension
{
    public static WebApplicationBuilder AddCustomCors(this WebApplicationBuilder builder)
    {
        var clientOrigin = builder.Configuration.GetRequiredSection("StorageAppClientOrigin")?.Value;
        builder.Services.AddCors(opt =>
        {
            opt.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins(clientOrigin!);
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.SetIsOriginAllowed(x => true);
            });
        });

        return builder;
    }
}
