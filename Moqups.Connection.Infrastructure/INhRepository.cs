namespace Moqups.Connection.Infrastructure
{
    /// <summary>
    /// The NhRepository interface.
    /// </summary>
    /// <typeparam name="TEntity">
    /// The type of entity
    /// </typeparam>
    public interface INhRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        void Evict(TEntity entity);
    }
}