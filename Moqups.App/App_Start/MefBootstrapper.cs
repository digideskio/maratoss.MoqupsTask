﻿using System;
using System.ComponentModel.Composition.Hosting;
using System.ComponentModel.Composition.Primitives;
using System.IO;

namespace Moqups.App.App_Start
{
    public class MefBootstrapper
    {
        private readonly CompositionContainer _container;

        public MefBootstrapper()
        {
            AppDomain.CurrentDomain.SetData("DataDirectory", AppDomain.CurrentDomain.BaseDirectory);
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