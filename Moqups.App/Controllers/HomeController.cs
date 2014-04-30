using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Web.Mvc;
using Moqups.BL.Infrastructure;
using Moqups.Entities;

namespace Moqups.App.Controllers
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class HomeController : Controller
    {
        private readonly IUserService _userService;

        [ImportingConstructor]
        public HomeController(IUserService userService)
        {
            _userService = userService;
        }

        public ActionResult Index()
        {
            IList<User> users = _userService.GetUsers();
            return View(users);
        }

        [HttpPost]
        public ActionResult SaveOrUpdate(User user)
        {
            
        }
    }
}
