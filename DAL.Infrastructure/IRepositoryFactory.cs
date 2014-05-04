namespace DAL.Infrastructure
{
    public interface IRepositoryFactory
    {
        IRepository<TEntity> Create<TEntity>() where TEntity : class;
    }
}