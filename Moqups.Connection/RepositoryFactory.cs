using System.ComponentModel.Composition;
using Moqups.Connection.Infrastructure;
using Moqups.Connection.Repositories;

namespace Moqups.Connection
{
    [Export(typeof(IRepositoryFactory))]
    public class RepositoryFactory : IRepositoryFactory
    {
        private readonly ISessionProvider _sessionProvider;
        private readonly IRepositoryProvider _repositoryProvider;

        [ImportingConstructor]
        public RepositoryFactory(ISessionProvider sessionProvider, IRepositoryProvider repositoryProvider)
        {
            _sessionProvider = sessionProvider;
            _repositoryProvider = repositoryProvider;
        }

        public IRepository<TEntity> Create<TEntity>()
            where TEntity : class
        {
            var repository = _repositoryProvider.GetRepository<TEntity>(_sessionProvider.CurrentSession);

            if (repository != null)
            {
                return (INhRepository<TEntity>)repository;
            }

            return new NhRepository<TEntity>(_sessionProvider.CurrentSession);
        }
    }
}
