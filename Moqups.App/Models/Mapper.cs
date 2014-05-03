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

            return new User(model.Id) {
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                IsAdmin = model.IsAdmin,
                Pages = model.SelectedPageIds == null ? null : model.SelectedPageIds.Select(x => new Page(x)).ToList(),
                Status = model.Status
            };
        }
    }
}