using System;
using DAL.Infrastructure;
using NHibernate;

namespace DAL
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
