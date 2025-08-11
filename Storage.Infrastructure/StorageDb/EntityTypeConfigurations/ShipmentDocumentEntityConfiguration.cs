namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ShipmentDocumentEntityConfiguration : IEntityTypeConfiguration<ShipmentDocument>
{
    public void Configure(EntityTypeBuilder<ShipmentDocument> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasIndex(x => x.Number)
            .IsUnique();

        builder
            .HasOne(x => x.Client)
            .WithMany()
            .HasForeignKey(x => x.ClientId);

        builder
            .HasMany(x => x.ShipmentResources)
            .WithOne(x => x.ShipmentDocument)
            .HasForeignKey(x => x.ShipmentDocumentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
