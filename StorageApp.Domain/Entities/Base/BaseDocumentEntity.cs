namespace StorageApp.Domain.Entities.Base;

public abstract class BaseDocumentEntity
{
    public long Id { get; set; }

    public string Number { get; set; }

    public DateTime Date { get; set; }

    public static bool operator ==(BaseDocumentEntity left, BaseDocumentEntity right) => left.Number == right.Number;

    public static bool operator !=(BaseDocumentEntity left, BaseDocumentEntity right) => left.Number != right.Number;
}
