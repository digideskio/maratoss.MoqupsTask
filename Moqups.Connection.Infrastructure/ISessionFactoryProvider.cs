using NHibernate;

namespace Moqups.Connection.Infrastructure
{
    public interface ISessionFactoryProvider
    {
        ISessionFactory GetSessionFactory();
    }
}
