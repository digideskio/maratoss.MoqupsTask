using NHibernate;

namespace DAL.Infrastructure
{
    public interface ISessionProvider
    {
        ISession CurrentSession { get; }
    }
}
