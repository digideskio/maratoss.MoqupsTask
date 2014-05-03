using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using Moqups.BL.Infrastructure;
using Moqups.Connection.Infrastructure;
using Moqups.Connection.Repositories;
using Moqups.Entities;

namespace Moqups.BL
{
    [Export(typeof(IUserService)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class UserServiceImpl : IUserService
    {
        private readonly IRepositoryFactory _repositoryFactory;

        [ImportingConstructor]
        public UserServiceImpl(IRepositoryFactory repositoryFactory)
        {
            if (repositoryFactory == null) throw new ArgumentNullException("repositoryFactory");
            _repositoryFactory = repositoryFactory;
        }

        public IList<User> GetUsers()
        {
            IRepository<User> repository = _repositoryFactory.Create<User>();
            return repository.SpecifyAndFetch(x => x.Pages).ToList();
        }

        public IList<Page> GetAvailablePages()
        {
            IRepository<Page> repository = _repositoryFactory.Create<Page>();
            return repository.Specify().ToList();
        }

        public User GetUserById(long id)
        {
            IRepository<User> repository = _repositoryFactory.Create<User>();
            User user = repository.Get(id);

            return user;
        }

        public User SaveOrUpdate(User user)
        {
            if (user == null) throw new ArgumentNullException("user");
            IRepository<User> repository = _repositoryFactory.Create<User>();
            if (user.Id > 0) {
                repository.Update(user);
            }
            else {
                repository.Insert(user);
            }

            return user;
        }

        public void Delete(long id)
        {
            IRepository<User> repository = _repositoryFactory.Create<User>();
            repository.Delete(new User { Id = id });
        }
    }
}
