namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ResourceEntityConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder
            .HasKey(x => x.Id);

        builder
            .HasIndex(x => x.Id)
            .IsUnique();

        builder
            .HasIndex(x => x.Name)
            .IsUnique();

        builder.HasData(
            Resource.Create(1, "Стол"),
            Resource.Create(2, "Стул"),
            Resource.Create(3, "Шкаф"));
    }
}
