using System.Collections.Generic;
using Moqups.Entities;

namespace Moqups.BL.Infrastructure
{
    public interface IUserService
    {
        IList<User> GetUsers();
        IList<Page> GetAvailablePages();
        User GetUserById(long id);
        User SaveOrUpdate(User user);
        void Delete(long id);
    }
}
