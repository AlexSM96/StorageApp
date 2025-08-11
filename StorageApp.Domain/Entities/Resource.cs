namespace StorageApp.Domain.Entities;

public class Resource : BaseEntity
{
    protected Resource(string name, bool isArchive) : base(name, isArchive) { }

    protected Resource(long id, string name, bool isArchive) : this(name, isArchive)
    {
        Id = id;
    }

    public static Resource Create(string name)
    {
        return new Resource(name, false);
    }

    public static Resource Create(long id, string name)
    {
        return new Resource(id, name, false);
    }
}

