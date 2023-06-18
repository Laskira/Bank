using Bank.Data;
using Bank.Models.Usuario;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Security.Claims;

namespace Bank.Models
{
    public class Jwt
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }

        public static async Task<dynamic> ValidarTokenAsync(ClaimsIdentity identity, DataController _dataController)
        {
            var tUsuarios = await _dataController.ExecuteGetRequest("SPSListarUsuarios");
            string jsonUsuarios = JsonConvert.SerializeObject(tUsuarios);
            var dbUsuarios = JsonConvert.DeserializeObject<List<UsuarioModel>>(jsonUsuarios);

            try
            {
                if (identity.Claims.Count() == 0)
                {
                    return new ObjectResult(new
                    {
                        success = false,
                        message = "Verificar si estás enviando un token válido",
                        result = ""
                    })
                    {
                        StatusCode = 400
                    };
                }

                var correo = identity.Claims.FirstOrDefault(x => x.Type == "Correo").Value;

                UsuarioModel usuario = dbUsuarios.FirstOrDefault(x => x.Correo == correo);

                return new ObjectResult(new
                {
                    success = true,
                    message = "Haz logrado loggearte exitosamente",
                    result = usuario
                })
                {
                    StatusCode = 200
                };

            }
            catch (Exception ex)
            {
                return new ObjectResult(new
                {
                    success = false,
                    message = "Catch: " + ex.Message,
                    result = ""
                })
                {
                    StatusCode = 500
                };
            }
        }


    }
}
