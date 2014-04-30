using System.Collections.Generic;
using Moqups.Entities;

namespace Moqups.BL.Infrastructure
{
    public interface IUserService
    {
        IList<User> GetUsers();
    }
}
