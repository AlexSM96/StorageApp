using System.Reflection;

namespace Storage.Infrastructure.StorageDb;

public class StorageDbContext(DbContextOptions<StorageDbContext> dbContextOptions)
    : DbContext(dbContextOptions), IStorageDbContext
{
    public DbSet<Client> Clients { get; set; }

    public DbSet<Resource> Resources { get; set; }

    public DbSet<Balance> Balances { get; set; }

    public DbSet<ReceiptDocument> ReceiptDocuments { get; set; }

    public DbSet<ReceiptResource> ReceiptResources { get; set; }

    public DbSet<MeasureUnit> MeasureUnits { get; set; }

    public DbSet<ShipmentDocument> ShipmentDocuments { get; set; }

    public DbSet<ShipmentResource> ShipmentResources { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}
