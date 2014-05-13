using System.IO;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Moqups.App.Helpers
{
    public class JSonBinder : DefaultModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            if (!IsJsonRequest(controllerContext))
            {
                return base.BindModel(controllerContext, bindingContext);
            }

            // Get the JSON data that's been posted
            string bodyjsonStringData;

            using (var stream = controllerContext.HttpContext.Request.InputStream)
            {
                stream.Seek(0, SeekOrigin.Begin);
                using (var reader = new StreamReader(stream))
                {
                    bodyjsonStringData = reader.ReadToEnd();
                }
            }

            // Use the built-in serializer to do the work for us
            var desializedObject = new JavaScriptSerializer()
                .Deserialize(bodyjsonStringData, bindingContext.ModelMetadata.ModelType);

            return desializedObject;
        }

        private static bool IsJsonRequest(ControllerContext controllerContext)
        {
            var contentType = controllerContext.HttpContext.Request.ContentType;
            return contentType.Contains("application/json");
        }
    }
}