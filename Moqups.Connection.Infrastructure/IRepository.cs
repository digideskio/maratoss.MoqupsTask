using System;
using System.Linq;
using System.Linq.Expressions;

namespace Moqups.Connection.Infrastructure
{
    public interface IRepository<TEntity> : IRepository
    {
        TEntity Get(object id);
        TEntity Load(object id);
        object Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> Specify();
    }

    public interface IRepository
    {
    }
}