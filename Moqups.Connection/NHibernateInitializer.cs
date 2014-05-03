using NHibernate.Cfg;

namespace Moqups.Connection
{
    public class NHibernateInitializer
    {
        private readonly string _fileNhConfiguration;
        private readonly string _login;
        private readonly string _password;
        private readonly string _database;

        public const string HIBERNATE_CFG_FILE = "hibernate.cfg.xml";

        public NHibernateInitializer()
        {
        }
        public NHibernateInitializer(string fileNhConfiguration)
        {
            _fileNhConfiguration = fileNhConfiguration;
        }
        public NHibernateInitializer(string login, string password, string database, string fileNhConfiguration)
            : this(fileNhConfiguration)
        {
            _login = login;
            _password = password;
            _database = database;
        }

        public NHibernateInitializer(string login, string password, string database)
            : this(login, password, database, null)
        {
        }

        public virtual Configuration GetConfiguration()
        {
            Configuration config = new Configuration().Configure(_fileNhConfiguration ?? HIBERNATE_CFG_FILE);

            if (!string.IsNullOrEmpty(_login) && !string.IsNullOrEmpty(_database))
            {
                SetLogin(config, _login, _password, _database);
            }

            return config;
        }

        private static void SetLogin(Configuration cfg, string login, string password, string database)
        {
            cfg.SetProperty(
                "connection.connection_string",
                string.Format(
                    @"Data Source={0};
                      User ID={1};
                      Password={2};",
                    database,
                    login,
                    password));
        }
    }
}