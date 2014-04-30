using System.Collections.Generic;

namespace Moqups.Entities
{
    public class User : IEntity<long>
    {
        public long Id { get; private set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Status { get; set; }
        public IList<Page> Pages { get; set; }
        public bool IsAdmin { get; set; }
    }
}
