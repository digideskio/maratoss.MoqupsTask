using System;
using Moqups.Connection.Infrastructure;
using NHibernate;

namespace Moqups.Connection.Repositories
{
    internal interface IRepositoryCreatorMetadata
    {
        Type RepositoryForEntityOfType { get; }
    }

    public interface IRepositoryCreator
    {
        IRepository Create(ISession session);
    }
}
