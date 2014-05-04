using System.Web.Mvc;
using Moqups.App.App_Start;
using Moqups.App.Exceptions;

namespace Moqups.App
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters, IExceptionHandlerFactory exceptionHandlerFactory)
        {
            filters.Add(new HandleCustomError(exceptionHandlerFactory));
//            filters.Add(new HandleErrorAttribute());
        }
    }
}