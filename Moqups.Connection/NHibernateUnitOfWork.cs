using System.Data;
using System.Diagnostics.Contracts;
using Moqups.Connection.Infrastructure;
using NHibernate;
using NHibernate.Context;

namespace Moqups.Connection
{
    public class NHibernateUnitOfWork : IUnitOfWork
    {
        private readonly ISession _session;
        private ITransaction _transaction;

        public NHibernateUnitOfWork(ISession session, IsolationLevel isolationLevel = IsolationLevel.ReadCommitted)
        {
            Contract.Requires(session != null, "The session must be not null");

            _session = session;
            _transaction = session.BeginTransaction(isolationLevel);
        }

        public void Dispose()
        {
            if (!_transaction.WasCommitted && !_transaction.WasRolledBack) {
                Rollback();
            }

            _transaction.Dispose();
            _transaction = null;

            CurrentSessionContext.Unbind(_session.SessionFactory);
            _session.Dispose();
        }
        public void Rollback()
        {
            _transaction.Rollback();
        }
        public void Commit()
        {
            _transaction.Commit();
        }
    }
}
