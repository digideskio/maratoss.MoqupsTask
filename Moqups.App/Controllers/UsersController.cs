﻿using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Web.Http;
using Moqups.BL.Infrastructure;
using Moqups.Entities;

namespace Moqups.App.Controllers
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class UsersController : ApiController
    {
        private readonly IUserService _userService;

        [ImportingConstructor]
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        public User Add(User user)
        {
            user.Id++;
            return user;
        }

        public IEnumerable<User> GetAllUsers()
        {
            IList<User> users = _userService.GetUsers();
            return users;
        }
    }

    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class StatusesController : ApiController
    {
        // todo: universal
        public IEnumerable<StatusModel> GetStatuses()
        {
            return new[] {
                new StatusModel{ Id = 0, Value = "Married"},
                new StatusModel{ Id = 1, Value = "Single"},
                new StatusModel{ Id = 2, Value = "Divorced"}
            };
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
