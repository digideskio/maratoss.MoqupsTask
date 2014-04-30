using System;

namespace Moqups.Connection.Infrastructure
{
    /// <summary>
    /// The coordinator Of services interface.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// The rollback.
        /// </summary>
        void Rollback();

        /// <summary>
        /// The commit
        /// </summary>
        void Commit();
    }
}
