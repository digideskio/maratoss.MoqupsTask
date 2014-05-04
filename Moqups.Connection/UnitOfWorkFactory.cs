using System.ComponentModel.Composition;
using DAL.Infrastructure;
using Moqups.Connection.Infrastructure;
using NHibernate;

namespace Moqups.Connection
{
    [Export(typeof(IUnitOfWorkFactory))]
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly ISessionProvider _sessionProvider;

        [ImportingConstructor]
        public UnitOfWorkFactory(ISessionProvider sessionProvider)
        {
            _sessionProvider = sessionProvider;
        }

        public IUnitOfWork Create()
        {
            ISession session = _sessionProvider.CurrentSession;
            session.FlushMode = FlushMode.Commit;

            return new NHibernateUnitOfWork(session);
        }
    }
}