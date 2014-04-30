using System.ComponentModel.Composition;
using Moqups.Connection.Infrastructure;

namespace Moqups.Connection
{
    [Export]
    [Export(typeof(IConnection))]
    [Export(typeof(ISessionFactoryProvider))]
    public class NhConnectionAdapter : NhConnection, ISessionFactoryProvider
    {
        public void SetHbmCfgFile(string path)
        {
            ChangeHbmFile(path);
        }
    }
}
