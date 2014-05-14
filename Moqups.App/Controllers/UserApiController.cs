using System.Collections.Generic;
using System.Web.Http;
using Moqups.BL.Infrastructure;
using Moqups.Entities;

namespace Moqups.App.Controllers
{
    public class UserApiController : ApiController
    {
        private readonly IUserService _userService;

        public UserApiController(IUserService userService)
        {
            _userService = userService;
        }

        public IEnumerable<User> Index()
        {
            IList<User> users = _userService.GetUsers();
            return users;
        }
    }
}
