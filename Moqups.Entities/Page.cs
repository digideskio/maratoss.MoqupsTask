namespace Moqups.Entities
{
    public class Page : IEntity<long>
    {
        public long Id { get; private set; }
        public string Name { get; set; }
    }
}