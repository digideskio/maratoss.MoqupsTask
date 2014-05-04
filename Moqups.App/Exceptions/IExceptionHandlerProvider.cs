using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;

namespace Moqups.App.Exceptions
{
    public interface IExceptionHandlerProvider
    {
        IExceptionHandler Get<TException>();
        IExceptionHandler Get(Type exceptionType);
    }

    [Export(typeof(IExceptionHandlerProvider)), PartCreationPolicy(CreationPolicy.Shared)]
    public class ExceptionHandlerProvider : IExceptionHandlerProvider
    {
        [ImportMany] 
        private Lazy<IExceptionHandler, IExceptionHandlerMetadata>[] _handlers;

        public IExceptionHandler Get<TException>()
        {
            return Get(typeof (TException));
        }

        public IExceptionHandler Get(Type exceptionType)
        {
            var handler = _handlers.FirstOrDefault(x => x.Metadata.HandleExceptionType == exceptionType);
            if (handler != null) {
                return handler.Value;
            }

            return null;
        }
    }
}