using System;
using System.Collections.Generic;
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
            User = user;
            AvailablePages = availablePages;
            StatusList =
                Enum.GetValues(typeof (Status))
                    .Cast<Status>()
                    .Select(x =>
                        new SelectListItem {
                            Text = x.ToString(),
                            Value = ((int) x).ToString(),
                            Selected = (x.Equals(user.Status))
                        });
        }

        public User User { get; set; }
        public IList<Page> AvailablePages { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }
    }
}