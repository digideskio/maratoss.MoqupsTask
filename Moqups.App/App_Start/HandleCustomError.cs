using System;
using System.Web.Mvc;
using Moqups.App.Exceptions;

namespace Moqups.App.App_Start
{
    public class HandleCustomError : HandleErrorAttribute
    {
        private readonly IExceptionHandlerFactory _exceptionHandlerFactory;

        public HandleCustomError(IExceptionHandlerFactory exceptionHandlerFactory)
        {
            _exceptionHandlerFactory = exceptionHandlerFactory;
        }

        public override void OnException(ExceptionContext filterContext)
        {
            //If the exeption is already handled we do nothing
            if (filterContext.ExceptionHandled) {
                return;
            }

            //Determine the return type of the action
            string actionName = filterContext.RouteData.Values["action"].ToString();
            Type controllerType = filterContext.Controller.GetType();
            var method = controllerType.GetMethod(actionName);
            var returnType = method.ReturnType;

            IExceptionHandler handler = _exceptionHandlerFactory.Get(filterContext.Exception.GetType());
            ActionResult actionResult =
                handler.Handle(new HandleErrorInfo(filterContext.Exception, controllerType.FullName, actionName),
                    returnType == typeof (JsonResult));

            filterContext.Result = actionResult ?? new ViewResult{ViewName = "Error"};
            filterContext.ExceptionHandled = true;
        }
    }
}