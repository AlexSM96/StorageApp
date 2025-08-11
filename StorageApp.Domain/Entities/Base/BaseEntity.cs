namespace StorageApp.Domain.Entities.Base;

public abstract class BaseEntity
{
    protected BaseEntity(string name, bool isArchive = false)
    {
        Name = name;
        IsArchive = isArchive;
    }

    public long Id { get; protected set; } 

    public string Name { get; set; }

    public bool IsArchive { get; set; }

    public static bool operator ==(BaseEntity left, BaseEntity right) => left.Name == right.Name;

    public static bool operator !=(BaseEntity left, BaseEntity right) => left.Name != right.Name;
}
