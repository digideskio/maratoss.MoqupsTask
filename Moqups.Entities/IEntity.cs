namespace Moqups.Entities
{
    public interface IEntity<out TKey>
    {
        TKey Id { get; }
    }
}