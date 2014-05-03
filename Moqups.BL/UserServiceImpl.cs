using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using FizzWare.NBuilder;
using Moqups.BL.Infrastructure;
using Moqups.Entities;

namespace Moqups.BL
{
    [Export(typeof(IUserService)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class UserServiceImpl : IUserService
    {
        public IList<User> GetUsers()
        {
            return Enumerable.Range(1, 10).Select(id => GetUserById(id)).ToList();
        }

        public IList<Page> GetAvailablePages()
        {
            return
                Enumerable.Range(1, 3)
                    .Select(id => Builder<Page>.CreateNew().WithConstructor(() => new Page(id)).Build())
                    .ToList();
        }

        public User GetUserById(long id)
        {
            return Builder<User>.CreateNew()
                .WithConstructor(() => new User(id))
                .With(x => x.Id, id)
                .With(x => x.Pages, GetAvailablePages().Take(2).ToList())
                .Build();
        }

        public User SaveOrUpdate(User user)
        {
            if (user.Id > 0)
            {
                // todo: update entity
                return user;
            }

            // todo: create entity
            return new User(777);
        }

        public void Delete(long id)
        {
            //todo: deleting entity with id
        }
    }
}
