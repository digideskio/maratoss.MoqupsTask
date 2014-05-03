using System;
using System.ComponentModel.Composition.Hosting;
using System.IO;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using HibernatingRhinos.Profiler.Appender.NHibernate;
using Moqups.App.App_Start;

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
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private static void Connect(CompositionContainer container)
        {
            var connection = container.GetExportedValue<NhConnectionAdapter>();
            connection.SetConfigFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "hibernate.cfg.xml"));
            connection.Connecting();
        }
    }
}