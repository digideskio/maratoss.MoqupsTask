using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using Moqups.Entities;

namespace Moqups.App.Models
{
    public class EditUserModel
    {
        public EditUserModel()
        {
            
        }
        public EditUserModel(User user, IList<Page> availablePages)
        {
            Id = user.Id;
            Firstname = user.Firstname;
            Lastname = user.Lastname;
            Status = user.Status;
            Pages = user.Pages.ToList();
            IsAdmin = user.IsAdmin;

            AvailablePages = availablePages;
        }

        public long Id { get; set; }
        [Display, Required(ErrorMessage = "The field 'Firstname' can not be empty")]
        public string Firstname { get; set; }
        [Display, Required(ErrorMessage = "The field 'Lastname' can not be empty")]
        public string Lastname { get; set; }
        public Status Status { get; set; }
        public bool IsAdmin { get; set; }
        public IList<Page> Pages { get; set; }

        public IList<Page> AvailablePages { get; set; }
    }
}