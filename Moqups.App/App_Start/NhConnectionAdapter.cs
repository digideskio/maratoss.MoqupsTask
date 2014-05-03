using System.ComponentModel.Composition;
using Moqups.Connection;
using Moqups.Connection.Infrastructure;

namespace Moqups.App.App_Start
{
    [Export]
    [Export(typeof(IConnection))]
    [Export(typeof(ISessionFactoryProvider))]
    public class NhConnectionAdapter : NhConnection, ISessionFactoryProvider
    {
        public void SetConfigFile(string path)
        {
            ChangeHbmFile(path);
        }
    }
}