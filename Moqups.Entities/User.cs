using System.Collections.Generic;

namespace Moqups.Entities
{
    public enum Status
    {
        Married,
        Single,
        Divorced
    }

    public class User : IEntity<long>
    {
        public User(long id)
            : this()
        {
            Id = id;
        }
        public User()
        {
            Pages = new List<Page>();
        }

        public long Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public Status Status { get; set; }
        public IList<Page> Pages { get; set; }
        public bool IsAdmin { get; set; }
    }
}
