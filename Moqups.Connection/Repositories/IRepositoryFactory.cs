using Moqups.Connection.Infrastructure;

namespace Moqups.Connection.Repositories
{
    public interface IRepositoryFactory
    {
        INhRepository<TEntity> Create<TEntity>() where TEntity : class;
    }
}