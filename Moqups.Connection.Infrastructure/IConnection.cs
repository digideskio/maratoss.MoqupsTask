namespace Moqups.Connection.Infrastructure
{
    public interface IConnection
    {
        /// <summary>
        /// The connecting.
        /// </summary>
        /// <param name="login">
        /// The login.
        /// </param>
        /// <param name="password">
        /// The password.
        /// </param>
        /// <param name="database">
        /// The name of database.
        /// </param>
        void Connecting(string login, string password, string database);

        /// <summary>
        /// The connecting.
        /// </summary>
        void Connecting();

        /// <summary>
        /// Disconnect from database.
        /// </summary>
        void Disconnect();
    }
}