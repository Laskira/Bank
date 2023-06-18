using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Bank.Data
{
    public class DataController : Controller
    {
        private readonly Conexion conexion;

        public DataController(IConfiguration configuration)
        {
            conexion = new Conexion(configuration);
        }

        public async Task<IActionResult> ExecutePostAndPutRequest(string storedProcedureName, object jsonValue)
        {
            try
            {
                using (var command = new SqlCommand(storedProcedureName, conexion.connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@jsonData", jsonValue.ToString());

                    await command.Connection.OpenAsync();
                    await command.ExecuteNonQueryAsync();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An SQL error occurred: {ex.Message}");
            }
            finally
            {
                conexion.connection.Close();
            }

        }

        public async Task<IActionResult> ExecuteGetRequest(string storedProcedureName)
        {
            try
            {
                using (var command = new SqlCommand(storedProcedureName, conexion.connection))
                {
                    await command.Connection.OpenAsync();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    await command.ExecuteNonQueryAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            if (!reader.IsDBNull(0))
                            {
                                var jsonResult = reader.GetString(0);
                                return Content(jsonResult, "application/json");
                            }
                            else
                            {
                                return NoContent();
                            }
                        }
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An SQL error occurred: {ex.Message}");
            }
            finally
            {
                if (conexion.connection.State == ConnectionState.Open)
                {
                    conexion.connection.Close();
                }
            }
        }


        public async Task<IActionResult> ExecuteGetRequestWithParams(string storedProcedureName, string id)
        {
            try
            {
                using (var command = new SqlCommand(storedProcedureName, conexion.connection))
                {
                    await command.Connection.OpenAsync();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@id", id);
                    await command.ExecuteNonQueryAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            if (!reader.IsDBNull(0))
                            {
                                var jsonResult = reader.GetString(0);
                                return Content(jsonResult, "application/json");
                            }
                            else
                            {
                                return NoContent();
                            }
                        }
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An SQL error occurred: {ex.Message}");
            }
            finally
            {
                if (conexion.connection.State == ConnectionState.Open)
                {
                    conexion.connection.Close();
                }
            }
        }


        public async Task<IActionResult> ExecuteDeleteRequest(string storedProcedureName, string id)
        {
            try
            {
                using (var command = new SqlCommand(storedProcedureName, conexion.connection))
                {
                    await command.Connection.OpenAsync();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@correo", id);
                    await command.ExecuteNonQueryAsync();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An SQL error occurred: {ex.Message}");
            }
            finally
            {
                conexion.connection.Close();
            }
        }
    }
}
