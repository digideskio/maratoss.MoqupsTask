using System.ComponentModel.Composition;
using DAL.Infrastructure;

namespace DAL
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
                return (IRepository<TEntity>)repository;
            }

            return new NhRepository<TEntity>(_sessionProvider.CurrentSession);
        }
    }
}
