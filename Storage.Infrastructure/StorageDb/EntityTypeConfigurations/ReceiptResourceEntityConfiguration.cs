namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ReceiptResourceEntityConfiguration : IEntityTypeConfiguration<ReceiptResource>
{
    public void Configure(EntityTypeBuilder<ReceiptResource> builder)
    {
        builder
            .HasKey(x => x.Id);

        builder
            .HasIndex(x => x.Id)
            .IsUnique();

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
