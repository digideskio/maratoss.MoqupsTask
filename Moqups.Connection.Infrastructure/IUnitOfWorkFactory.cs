namespace Moqups.Connection.Infrastructure
{
    /// <summary>
    /// The CoordinatorFactory interface.
    /// </summary>
    public interface IUnitOfWorkFactory
    {
        /// <summary>
        /// The new.
        /// </summary>
        /// <returns>
        /// The <see cref="IUnitOfWork"/>.
        /// </returns>
        IUnitOfWork Create();
    }
}
