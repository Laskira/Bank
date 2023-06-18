using System.Data.SqlClient;
namespace Bank.Data
{
    public class Conexion
    {
        private readonly string connectionString;

        public Conexion(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("BanckDBConnection");
        }

        public SqlConnection connection => new SqlConnection(connectionString);
    }
}
