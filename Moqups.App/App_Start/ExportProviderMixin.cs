using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Linq;

namespace Moqups.App.App_Start
{
    public static class ExportProviderMixin
    {
        public static object GetExportedValue(this ExportProvider exportProvider, Type type, string contract = null)
        {
            var res =
                typeof(ExportProvider).GetMethod("GetExportedValue", new[] { typeof(string) })
                    .MakeGenericMethod(type)
                    .Invoke(exportProvider, new object[] { contract });

            return res;
        }
        public static IEnumerable<object> GetExportedValues(this ExportProvider exportProvider, Type type)
        {
            var res =
                (IList)
                    typeof(ExportProvider).GetMethod("GetExportedValues")
                        .MakeGenericMethod(type)
                        .Invoke(exportProvider, null);

            return res.Cast<object>();
        }
        public static object TryGetExportedValue(this ExportProvider exportProvider, Type type, string contract = null)
        {
            try
            {
                var res =
                    typeof(ExportProvider).GetMethod("GetExportedValue", new[] { typeof(string) })
                        .MakeGenericMethod(type)
                        .Invoke(exportProvider, new object[] { contract });

                return res;
            }
            catch (Exception exception)
            {
                //LogManager.Log.Debug(exception);
                return null;
            }
        }
    }
}