using System;
using System.Linq.Expressions;
using Moqups.Connection.Infrastructure;
using NHibernate;

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
        public virtual IQueryOver<TEntity, TEntity> Specify()
        {
            return Session.QueryOver<TEntity>();
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
