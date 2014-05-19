using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Moqups.BL.Infrastructure;
using Moqups.Connection.Infrastructure;
using Moqups.Entities;

namespace Moqups.App.Controllers
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class UsersController : ApiController
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;
        private readonly IUserService _userService;

        [ImportingConstructor]
        public UsersController(IUnitOfWorkFactory unitOfWorkFactory, IUserService userService)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
            _userService = userService;
        }

        public HttpResponseMessage SaveOrUpdate(User user)
        {
            User newUser;
            using (IUnitOfWork unitOfWork = _unitOfWorkFactory.Create())
            {
                newUser = _userService.SaveOrUpdate(user);
                unitOfWork.Commit();
            }

            var response = Request.CreateResponse(HttpStatusCode.Created, newUser);

            return response;
        }

        public IEnumerable<User> GetAllUsers()
        {
            IList<User> users = _userService.GetUsers();
            return users;
        }

        public void Delete(long id)
        {
            using (IUnitOfWork unitOfWork = _unitOfWorkFactory.Create())
            {
                _userService.Delete(id);
                unitOfWork.Commit();
            }
        }
    }

    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class StatusesController : ApiController
    {
        public IEnumerable<StatusModel> GetStatuses()
        {
            var statuses = Enum.GetNames(typeof(Status));
            return
                statuses.Select(
                    status => new StatusModel {Id = (int) Enum.Parse(typeof (Status), status), Value = status});
        }
    }

    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class PagesController : ApiController
    {
        private readonly IUserService _userService;

        [ImportingConstructor]
        public PagesController(IUserService userService)
        {
            _userService = userService;
        }

        public IEnumerable<Page> Get()
        {
            return _userService.GetAvailablePages();
        }
    }

    public class StatusModel
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
}
