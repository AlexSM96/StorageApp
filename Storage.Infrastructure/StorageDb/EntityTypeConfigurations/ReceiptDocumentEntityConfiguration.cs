namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ReceiptDocumentEntityConfiguration : IEntityTypeConfiguration<ReceiptDocument>
{
    public void Configure(EntityTypeBuilder<ReceiptDocument> builder)
    {
        builder
            .HasKey(x => x.Id);

        builder
            .HasIndex(x => x.Number)
            .IsUnique();

        builder
            .HasMany(x => x.ReceiptResources)
            .WithOne(x => x.ReceiptDocument)
            .HasForeignKey(x => x.ReceiptDocumentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
