namespace StorageApp.Domain.Entities;

public class Client : BaseEntity
{
    protected Client(string name, bool isArchive, string address) : base(name, isArchive)
    {
        Address = address;
    }

    protected Client(long id, string name, bool isArchive, string address) : this(name, isArchive, address)
    {
        Id = id;
    }

    public string Address { get; set; }

    public static Client Create(string name, string address, bool isArchive = false)
    {
        return new Client(name, isArchive, address);
    }

    public static Client Create(long id, string name, string address, bool isArchive = false)
    {
        return new Client(id, name, isArchive, address);
    }
}
