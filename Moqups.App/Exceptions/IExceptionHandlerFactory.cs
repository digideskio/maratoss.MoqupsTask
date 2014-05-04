using System;
using System.ComponentModel.Composition;
using System.Web.Mvc;

namespace Moqups.App.Exceptions
{
    public interface IExceptionHandlerFactory
    {
        IExceptionHandler Get<TException>()
            where TException : Exception;

        IExceptionHandler Get(Type exceptionType);
    }

    [Export(typeof(IExceptionHandlerFactory)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class ExceptionHandlerFactory : IExceptionHandlerFactory
    {
        private readonly IExceptionHandlerProvider _exceptionHandlerProvider;

        [ImportingConstructor]
        public ExceptionHandlerFactory(IExceptionHandlerProvider exceptionHandlerProvider)
        {
            _exceptionHandlerProvider = exceptionHandlerProvider;
        }

        public IExceptionHandler Get<TException>()
            where TException : Exception
        {
            return Get(typeof(TException));
        }

        public IExceptionHandler Get(Type exceptionType)
        {
            IExceptionHandler handler = _exceptionHandlerProvider.Get(exceptionType);
            return handler ?? new DefaultExceptionHandler();
        }
    }

    [HandlerExceptionFor(typeof(NullReferenceException))]
    public class DefaultExceptionHandler : IExceptionHandler
    {
        public ActionResult Handle(HandleErrorInfo info, bool isAjax)
        {
            return new ViewResult { ViewName = "Error" };
        }
    }
}