using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Infrastructure
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
        IQueryable<TEntity> SpecifyAndFetch<TRelated>(
            Expression<Func<TEntity, IEnumerable<TRelated>>> relatedObjectSelector);
    }

    public interface IRepository
    {
    }
}