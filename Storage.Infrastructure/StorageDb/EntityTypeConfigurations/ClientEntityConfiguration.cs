namespace Storage.Infrastructure.StorageDb.EntityTypeConfigurations;

internal class ClientEntityConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder
            .HasKey(x => x.Id);

        builder
            .HasIndex(x => x.Name)
            .IsUnique();

        builder.HasData(
            Client.Create(1, "ООО ААА", "Челябинск"),
            Client.Create(2, "ООО ВВВ", "Челябинск"),
            Client.Create(3, "ООО ТТТ", "Челябинск"));
    }
}
