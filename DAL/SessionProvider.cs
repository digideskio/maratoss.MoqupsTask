using System.ComponentModel.Composition;
using DAL.Infrastructure;
using NHibernate;
using NHibernate.Context;

namespace DAL
{
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
