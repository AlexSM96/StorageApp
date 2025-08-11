namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ShipmentResourceEntityConfiguration : IEntityTypeConfiguration<ShipmentResource>
{
    public void Configure(EntityTypeBuilder<ShipmentResource> builder)
    {
        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.Resourse)
            .WithMany()
            .HasForeignKey(x => x.ResourceId);

        builder
            .HasOne(x => x.MeasureUnit)
            .WithMany()
            .HasForeignKey(x => x.MeasureUnitId);
    }
}
