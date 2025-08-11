namespace StorageApp.Domain.Entities;

public class MeasureUnit : BaseEntity
{
    private MeasureUnit(string name, bool isArchive) : base(name, isArchive) { }

    private MeasureUnit(long id, string name, bool isArchive) : this(name, isArchive)
    {
        Id = id;
    }

    public static MeasureUnit Create(string name, bool isArchive = false)
    {
        return new MeasureUnit(name, isArchive);
    }

    public static MeasureUnit Create(long id, string name, bool isArchive = false)
    {
        return new MeasureUnit(id, name, isArchive);
    }
}
