using NHibernate;

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
        /// <summary>
        /// The get.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="TEntity"/>.
        /// </returns>
        TEntity Get(object id);

        /// <summary>
        /// The load.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="TEntity"/>.
        /// </returns>
        TEntity Load(object id);

        /// <summary>
        /// The specify.
        /// </summary>
        /// <returns>
        /// The <see cref="IQueryOver"/>.
        /// </returns>
        IQueryOver<TEntity, TEntity> Specify();

        void Evict(TEntity entity);
    }
}