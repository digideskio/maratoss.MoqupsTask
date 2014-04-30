using System;
using System.ComponentModel.Composition.Hosting;
using System.Web.Mvc;
using System.Web.Routing;

namespace Moqups.App.App_Start
{
    public class MefControllerFactory : DefaultControllerFactory
    {
        private readonly CompositionContainer _container;

        public MefControllerFactory(CompositionContainer container)
        {
            _container = container;
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            if (controllerType != null) {
                var controller = (IController)_container.GetExportedValue(controllerType);
                return controller;
            }

            return null;
        }
    }
}