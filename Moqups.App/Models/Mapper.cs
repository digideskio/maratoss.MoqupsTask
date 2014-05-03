using System.Linq;
using Moqups.Entities;

namespace Moqups.App.Models
{
    public static class Mapper
    {
        public static User ToUser(this EditUserModel model)
        {
            if (model == null) {
                return null;
            }

            return new User {
                Id = model.Id,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                IsAdmin = model.IsAdmin,
                Status = model.Status,
                Pages = model.Pages
            };
        }
    }
}