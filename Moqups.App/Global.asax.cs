using System.ComponentModel.Composition.Hosting;
using System.Web;
using System.Web.Http;
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

            AreaRegistration.RegisterAllAreas();
            RegisterTooltip.Register();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters,
                bootsrapper.Container.GetExportedValue<IExceptionHandlerFactory>());
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private static void Connect(CompositionContainer container)
        {
            var connection = container.GetExportedValue<IConnection>();
            connection.Connecting();
        }
    }
}