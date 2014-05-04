using System;
using System.Runtime.Serialization;

namespace Moqups.App.Exceptions
{
    [Serializable]
    public class RecordIsNotFoundException : Exception
    {
        //
        // For guidelines regarding the creation of new exception types, see
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
        // and
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
        //

        public RecordIsNotFoundException()
        {
        }

        public RecordIsNotFoundException(string message) : base(message)
        {
        }

        public RecordIsNotFoundException(string message, Exception inner) : base(message, inner)
        {
        }

        protected RecordIsNotFoundException(
            SerializationInfo info,
            StreamingContext context) : base(info, context)
        {
        }
    }
}