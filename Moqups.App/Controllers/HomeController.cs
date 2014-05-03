﻿using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using Moqups.App.Models;
using Moqups.BL.Infrastructure;
using Moqups.Connection.Infrastructure;
using Moqups.Entities;

namespace Moqups.App.Controllers
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class HomeController : Controller
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;
        private readonly IUserService _userService;

        [ImportingConstructor]
        public HomeController(IUnitOfWorkFactory unitOfWorkFactory, IUserService userService)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
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

            if (user == null) {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            IList<Page> availablePages = _userService.GetAvailablePages();

            var model = new EditUserModel(user, availablePages.Except(user.Pages).ToList());
            if (Request.IsAjaxRequest())
            {
                return PartialView("AddOrEditUserForm", model);
            }

            return View(model);
        }

        [System.Web.Mvc.HttpPost]
        public ActionResult SaveOrUpdate(EditUserModel editUserModel)
        {
            if (ModelState.IsValid) 
            {
                using (IUnitOfWork unitOfWork = _unitOfWorkFactory.Create()) 
                {
                    User user = _userService.SaveOrUpdate(editUserModel.ToUser());
                    unitOfWork.Commit();
                }
                return RedirectToAction("Index");
            }

            return View("DetailsUser", editUserModel);
        }

        [System.Web.Mvc.HttpPost]
        public ActionResult SaveOrUpdateAjax(EditUserModel editUserModel)
        {
            if (ModelState.IsValid) 
            {
                using (IUnitOfWork unitOfWork = _unitOfWorkFactory.Create()) 
                {
                    User user = _userService.SaveOrUpdate(editUserModel.ToUser());
                    unitOfWork.Commit();
                }
                return Json(new { result = "Success" });
            }

            return Json(new { error = "Invalid" });
        }

        public ActionResult DeleteUser(long id)
        {
            using (IUnitOfWork unitOfWork = _unitOfWorkFactory.Create())
            {
                _userService.Delete(id);
                unitOfWork.Commit();
            }

            return RedirectToAction("Index");
        }
    }
}
