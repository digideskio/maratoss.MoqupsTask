using System;
using System.ComponentModel.Composition;

namespace Moqups.App.Exceptions
{
    public interface IExceptionHandlerMetadata
    {
        Type HandleExceptionType { get; }
    }

    [MetadataAttribute]
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public sealed class HandlerExceptionForAttribute : ExportAttribute, IExceptionHandlerMetadata
    {
        public HandlerExceptionForAttribute(Type handleExceptionType)
            : base(typeof(IExceptionHandler))
        {
            HandleExceptionType = handleExceptionType;
        }

        public Type HandleExceptionType { get; private set; }
    }
}