using System.ComponentModel.Composition;
using System.Web.Mvc;

namespace Moqups.App.Controllers
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class ErrorController : Controller
    {
        public ActionResult NotFound()
        {
            return View("NoPageFound");
        }
    }
}
