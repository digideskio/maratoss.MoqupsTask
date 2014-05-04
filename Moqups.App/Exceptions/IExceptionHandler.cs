using System.Web.Mvc;

namespace Moqups.App.Exceptions
{
    public interface IExceptionHandler
    {
        ActionResult Handle(HandleErrorInfo info, bool isAjax);
    }
}