using System;
using Moqups.Connection.Infrastructure;
using NHibernate;

namespace Moqups.Connection
{
    public class NhConnection : IConnection, IDisposable
    {
        private static ISessionFactory _sesionFactory;
        private string _hibernateCfgFile;
        private string _login;
        private string _password;
        private string _database;

        public NhConnection()
        {
        }

        public NhConnection(string hibernateCfgFile)
        {
            _hibernateCfgFile = hibernateCfgFile;
        }

        public virtual ISessionFactory GetSessionFactory()
        {
            if (_sesionFactory != null)
            {
                return _sesionFactory;
            }

            if (!string.IsNullOrWhiteSpace(_hibernateCfgFile) && !string.IsNullOrWhiteSpace(_login))
            {
                _sesionFactory =
                    new NHibernateInitializer(_login, _password, _database, _hibernateCfgFile).GetConfiguration()
                        .BuildSessionFactory();
            }
            else if (!string.IsNullOrWhiteSpace(_hibernateCfgFile))
            {
                _sesionFactory =
                    new NHibernateInitializer(_hibernateCfgFile).GetConfiguration()
                        .BuildSessionFactory();
            }
            else if (!string.IsNullOrWhiteSpace(_login))
            {
                _sesionFactory = new NHibernateInitializer(_login, _password, _database).GetConfiguration().BuildSessionFactory();
            }
            else throw new InvalidOperationException("Not found hibernate.cfg.xml and not setted login@password");

            return _sesionFactory;
        }

        public void Connecting(string login, string password, string database)
        {
            _login = login;
            _password = password;
            _database = database;

            Connecting();
        }

        public void Connecting()
        {
            // init the connect
            GetSessionFactory();
        }

        public void Disconnect()
        {
            Dispose();
        }

        public void Dispose()
        {
            if (_sesionFactory != null)
            {
                _sesionFactory.Dispose();
                _sesionFactory = null;
            }

            _login = null;
            _password = null;
            _database = null;
        }

        protected void ChangeHbmFile(string path)
        {
            _hibernateCfgFile = path;
        }
    }
}