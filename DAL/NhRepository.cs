using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DAL.Infrastructure;
using NHibernate;
using NHibernate.Linq;

namespace DAL
{
    public class NhRepository<TEntity> : IRepository<TEntity>
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
            var mergeEntity = Session.Merge(entity);
            var keyEntity = Session.Save(mergeEntity);
            return keyEntity;
        }
        public virtual void Update(TEntity entity)
        {
            var newEntity = Session.Merge(entity);
            Session.Update(newEntity);
        }
        public virtual void Delete(TEntity entity)
        {
            var mergeEntity = Session.Merge(entity);
            Session.Delete(mergeEntity);
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
