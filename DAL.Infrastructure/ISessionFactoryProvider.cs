using NHibernate;

namespace DAL.Infrastructure
{
    public interface ISessionFactoryProvider
    {
        ISessionFactory GetSessionFactory();
    }
}
