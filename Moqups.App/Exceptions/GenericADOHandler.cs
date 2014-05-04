using System.ComponentModel.Composition;
using System.Data.SQLite;
using System.Web.Mvc;
using NHibernate.Exceptions;

namespace Moqups.App.Exceptions
{
    [HandlerExceptionFor(typeof(GenericADOException)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class GenericADOHandler : IExceptionHandler
    {
        public ActionResult Handle(HandleErrorInfo info, bool isAjax)
        {
            if (info.Exception.GetType() == typeof (GenericADOException))
            {
                var sqLiteException = info.Exception.InnerException as SQLiteException;
                if (sqLiteException != null)
                {
                    return Handle(sqLiteException);
                }
            }

            return null;
        }

        private ActionResult Handle(SQLiteException exception)
        {
            //todo: some logic handle sqlite exception
            return new ViewResult {
                ViewName = "CustomError",
                ViewData = {Model = new FriendlyUserErrorMessage("Error", exception.Message, "contact to support")}
            };
        }
    }
}