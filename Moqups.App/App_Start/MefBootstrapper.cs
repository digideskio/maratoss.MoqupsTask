using System;
using System.ComponentModel.Composition.Hosting;
using System.ComponentModel.Composition.Primitives;
using System.IO;

namespace Moqups.App.App_Start
{
    public class MefBootstrapper
    {
        private readonly CompositionContainer _container;

        static MefBootstrapper()
        {
            //log4net.Config.XmlConfigurator.Configure();
        }

        public MefBootstrapper()
        {
            _container = new CompositionContainer(GetCatalog());
        }

        public CompositionContainer Container
        {
            get { return _container; }
        }

        private ComposablePartCatalog GetCatalog()
        {
            var aggregateCatalog = new AggregateCatalog();
            var source = AppDomain.CurrentDomain.BaseDirectory;
            aggregateCatalog.Catalogs.Add(new DirectoryCatalog(Path.Combine(source, "bin")));
            aggregateCatalog.Catalogs.Add(new DirectoryCatalog(Path.Combine(source, "forMef")));

            return aggregateCatalog;
        }
    }
}