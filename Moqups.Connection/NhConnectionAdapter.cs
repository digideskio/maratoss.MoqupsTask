using System;
using System.ComponentModel.Composition;
using System.IO;
using DAL.Infrastructure;
using Moqups.Connection.Infrastructure;

namespace Moqups.Connection
{
    [Export]
    [Export(typeof(IConnection))]
    [Export(typeof(ISessionFactoryProvider))]
    public class NhConnectionAdapter : NhConnection, ISessionFactoryProvider
    {
        public NhConnectionAdapter()
        {
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "hibernate.cfg.xml");
            ChangeHbmFile(path);
        }
    }
}
