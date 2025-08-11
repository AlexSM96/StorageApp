namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class MeasureUnitEntityConfiguration : IEntityTypeConfiguration<MeasureUnit>
{
    public void Configure(EntityTypeBuilder<MeasureUnit> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder
            .HasIndex(x => x.Name)
            .IsUnique();

        builder.HasData(
            MeasureUnit.Create(1, "шт"),
            MeasureUnit.Create(2, "кг"),
            MeasureUnit.Create(3, "м"));
    }
}
