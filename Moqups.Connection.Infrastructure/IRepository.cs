using System;
using System.Linq.Expressions;

namespace Moqups.Connection.Infrastructure
{
    public interface IRepository<TEntity> : IRepository
    {
        object Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(Expression<Func<TEntity, bool>> predicate);
    }

    public interface IRepository
    {
    }
}