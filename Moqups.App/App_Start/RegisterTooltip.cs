using Moqups.App.Models;
using Moqups.Entities;

namespace Moqups.App.App_Start
{
    public class RegisterTooltip
    {
        public static void Register()
        {
            TooltipService.RegisterTooltip<User>(x => x.Firstname, "some edit caption firstname", "EDIT");
            TooltipService.RegisterTooltip<User>(x => x.Firstname, "some add caption firstname", "ADD");
            TooltipService.RegisterTooltip<User>(x => x.Lastname, "some edit caption lastname", "EDIT");
            TooltipService.RegisterTooltip<User>(x => x.Lastname, "some add caption lastname", "ADD");
        }
    }
}