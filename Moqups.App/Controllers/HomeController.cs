using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web.Mvc;
using Moqups.App.Models;
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

        public ActionResult DetailsUser(long id)
        {
            User user = id == 0 ? new User() : _userService.GetUserById(id);
            IList<Page> availablePages = _userService.GetAvailablePages();

            var model = new EditUserModel(user, availablePages.Except(user.Pages).ToList());
            if (Request.IsAjaxRequest())
            {
                return PartialView("AddOrEditUserForm", model);
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult SaveOrUpdate(EditUserModel editUserModel)
        {
            User user = _userService.SaveOrUpdate(editUserModel.User);
            return RedirectToAction("Index");
        }

        public ActionResult DeleteEntity(long id)
        {
            _userService.Delete(id);
            
            return RedirectToAction("Index");
        }
    }
}
