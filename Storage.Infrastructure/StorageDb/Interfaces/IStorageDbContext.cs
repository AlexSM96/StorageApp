namespace Storage.Infrastructure.StorageDb.Interfaces;

public interface IStorageDbContext
{
    public DbSet<Client> Clients { get; }

    public DbSet<Resource> Resources { get; }

    public DbSet<Balance> Balances { get; }

    public DbSet<ReceiptDocument> ReceiptDocuments { get; }

    public DbSet<ReceiptResource> ReceiptResources { get; }

    public DbSet<MeasureUnit> MeasureUnits { get; }

    public DbSet<ShipmentDocument> ShipmentDocuments { get; }

    public DbSet<ShipmentResource> ShipmentResources { get; }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
