using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using HibernatingRhinos.Profiler.Appender.NHibernate;
using Moqups.App.App_Start;
using Moqups.App.Exceptions;
using Moqups.Connection.Infrastructure;

namespace Moqups.App
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            log4net.Config.XmlConfigurator.Configure();
            NHibernateProfiler.Initialize();

            var bootsrapper = new MefBootstrapper();
            Connect(bootsrapper.Container);

            ControllerBuilder.Current.SetControllerFactory(new MefControllerFactory(bootsrapper.Container));

            var dependencyResolver = GlobalConfiguration.Configuration.DependencyResolver;
            GlobalConfiguration.Configuration.DependencyResolver = new MefDependencyResolver(bootsrapper.Container);

            AreaRegistration.RegisterAllAreas();
            RegisterTooltip.Register();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters,
                bootsrapper.Container.GetExportedValue<IExceptionHandlerFactory>());
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            BundleTable.EnableOptimizations = true;
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private static void Connect(CompositionContainer container)
        {
            var connection = container.GetExportedValue<IConnection>();
            connection.Connecting();
        }
    }

    public class MefDependencyResolver : System.Web.Http.Dependencies.IDependencyResolver
    {
        private readonly CompositionContainer _container;

        public MefDependencyResolver(CompositionContainer container)
        {
            _container = container;
        }

        public object GetService(Type serviceType)
        {
            var export = _container.GetExports(serviceType, null, null).SingleOrDefault();

            return null != export ? export.Value : null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            var exports = _container.GetExports(serviceType, null, null);
            var createdObjects = new List<object>();

            if (exports.Any())
            {
                foreach (var export in exports)
                {
                    createdObjects.Add(export.Value);
                }
            }

            return createdObjects;
        }

        public IDependencyScope BeginScope()
        {
            return this;
        }

        public void Dispose()
        {
        }
    }
}