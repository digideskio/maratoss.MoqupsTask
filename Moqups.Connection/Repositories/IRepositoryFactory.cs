using Moqups.Connection.Infrastructure;

namespace Moqups.Connection.Repositories
{
    public interface IRepositoryFactory
    {
        IRepository<TEntity> Create<TEntity>() where TEntity : class;
    }
}