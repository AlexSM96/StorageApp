namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class BalanceEntityConfiguration : IEntityTypeConfiguration<Balance>
{
    public void Configure(EntityTypeBuilder<Balance> builder)
    {
        builder
            .HasKey(x => x.Id);

        builder
            .HasIndex(x => new 
            { 
                x.ResourceId, 
                x.MeasureUnitId 
            })
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
