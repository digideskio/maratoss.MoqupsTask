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
            User user = id == 0 ? new User(0) : _userService.GetUserById(id);
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
            if (ModelState.IsValid) {
                User user = _userService.SaveOrUpdate(editUserModel.ToUser());
                return RedirectToAction("Index");
            }

            return View("DetailsUser", editUserModel);
        }

        [HttpPost]
        public ActionResult SaveOrUpdateAjax(EditUserModel editUserModel)
        {
            if (ModelState.IsValid)
            {
                User user = _userService.SaveOrUpdate(editUserModel.ToUser());
                return Json(new { result = "Success" });
            }

            return Json(new { error = "Invalid" });
        }

        public ActionResult DeleteUser(long id)
        {
            _userService.Delete(id);
            
            return RedirectToAction("Index");
        }
    }
}
