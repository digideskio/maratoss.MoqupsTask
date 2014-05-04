using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using DAL.Infrastructure;
using NHibernate;

namespace DAL
{
    public interface IRepositoryProvider
    {
        IEnumerable<Tuple<Type, Func<ISession, IRepository>>> GetRepositories();
        IRepository GetRepository<TEntity>(ISession session);
    }

    [Export(typeof(IRepositoryProvider))]
    public class RepositoryProvider : IRepositoryProvider
    {
        [ImportMany]
        private Lazy<IRepositoryCreator, IRepositoryCreatorMetadata>[] _repositoryCreators;

        public IEnumerable<Tuple<Type, Func<ISession, IRepository>>> GetRepositories()
        {
            throw new NotImplementedException();
        }

        public IRepository GetRepository<TEntity>(ISession session)
        {
            Lazy<IRepositoryCreator> repositoryCreator =
                _repositoryCreators.FirstOrDefault(x => x.Metadata.RepositoryForEntityOfType == typeof(TEntity));

            if (repositoryCreator != null)
            {
                return repositoryCreator.Value.Create(session);
            }

            return null;
        }
    }
}
