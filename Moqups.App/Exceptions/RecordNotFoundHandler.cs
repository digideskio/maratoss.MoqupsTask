using System.ComponentModel.Composition;
using System.Web.Mvc;

namespace Moqups.App.Exceptions
{
    [HandlerExceptionFor(typeof(RecordIsNotFoundException)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class RecordNotFoundHandler : IExceptionHandler
    {
        public ActionResult Handle(HandleErrorInfo info, bool isAjax)
        {
            if (info.Exception is RecordIsNotFoundException)
            {
                return new ViewResult {
                    ViewName = "CustomError",
                    ViewData = {
                        Model = new FriendlyUserErrorMessage("Error", info.Exception.Message,
                            "Possible link is outdated. Refresh the page")
                    },
                };
            }

            return null;
        }
    }
}