using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Moqups.Connection.Infrastructure;
using NHibernate;
using NHibernate.Linq;

namespace Moqups.Connection.Repositories
{
    public class NhRepository<TEntity> : INhRepository<TEntity>
        where TEntity : class
    {
        protected readonly ISession Session;

        public NhRepository(ISession session)
        {
            Session = session;
        }

        public TEntity Get(object id)
        {
            return Session.Get<TEntity>(id);
        }
        public TEntity Load(object id)
        {
            return Session.Load<TEntity>(id);
        }
        public virtual IQueryable<TEntity> Specify()
        {
            return Session.Query<TEntity>();
        }

        public virtual IQueryable<TEntity> SpecifyAndFetch<TRelated>(
            Expression<Func<TEntity, IEnumerable<TRelated>>> relatedObjectSelector)
        {
            return Specify().FetchMany(relatedObjectSelector);
        }

        public virtual object Insert(TEntity entity)
        {
            var keyEntity = Session.Save(entity);
            return keyEntity;
        }
        public virtual void Update(TEntity entity)
        {
            var newEntity = Session.Merge(entity);
            Session.Update(newEntity);
        }
        public virtual void Delete(TEntity entity)
        {
            Session.Delete(entity);
        }
        public virtual void Delete(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }
        public void Evict(TEntity entity)
        {
            Session.Evict(entity);
        }
    }
}
