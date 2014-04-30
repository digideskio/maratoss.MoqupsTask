using System.ComponentModel.Composition;
using Moqups.Connection.Infrastructure;
using NHibernate;
using NHibernate.Context;

namespace Moqups.Connection
{
    public interface ISessionProvider
    {
        ISession CurrentSession { get; }
    }

    [Export(typeof(ISessionProvider))]
    public class SessionProvider : ISessionProvider
    {
        private readonly ISessionFactory _sessionFactory;

        [ImportingConstructor]
        public SessionProvider(ISessionFactoryProvider sessionFactoryProvider)
        {
            _sessionFactory = sessionFactoryProvider.GetSessionFactory();
        }

        public ISession CurrentSession
        {
            get
            {
                if (!CurrentSessionContext.HasBind(_sessionFactory))
                {
                    CurrentSessionContext.Bind(_sessionFactory.OpenSession());
                }
                
                return _sessionFactory.GetCurrentSession();
            }
        }
    }
}
