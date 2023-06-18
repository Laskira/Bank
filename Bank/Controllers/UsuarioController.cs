using Bank.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using Bank.Models.Usuario;
using Bank.Models;

namespace Bank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly DataController dataController;

        public UsuarioController(IConfiguration configuration, DataController _dataController)
        {
            _configuration = configuration;
            dataController = _dataController;
        }


        [HttpPost]
        public async Task<IActionResult> GuardarUsuario([FromBody] dynamic jsonUsuario)
        {
            return await dataController.ExecutePostAndPutRequest("SPGuardarUsuario", jsonUsuario);
        }

        [HttpPut]
        public async Task<IActionResult> ActualizarUsuario([FromBody] dynamic jsonUsuario)
        {
            return await dataController.ExecutePostAndPutRequest("PSActualizarUsuario", jsonUsuario);
        }

        [HttpDelete("/{correo}")]
        public async Task<IActionResult> EliminarUsuario(string correo)
        {
            return await dataController.ExecuteDeleteRequest("SPEliminarUsuario", correo);
        }

        [HttpGet]
        public async Task<IActionResult> ListarUsuarios()
        {
            return await dataController.ExecuteGetRequest("SPSListarUsuarios");
        }

        [HttpGet("/listar")]
        public async Task<IActionResult> ListarUsuariosSinContrasenia()
        {
            return await dataController.ExecuteGetRequest("SPSListarUsuariosSinContrasenia");
        }


        [HttpGet("/{id}")]
        public async Task<IActionResult> ListarUsuario(string id)
        {
            return await dataController.ExecuteGetRequestWithParams("SPSListarUsuario", id);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> IniciarSesion([FromBody] dynamic jsonUsuario)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(jsonUsuario.ToString());

            string user = data.Correo.ToString();
            string password = data.Contrasenia.ToString();

            var dbUsuariosResult = await dataController.ExecuteGetRequest("SPSListarUsuarios");

            if (dbUsuariosResult is ContentResult contentResult && contentResult.Content != null)
            {
                var jsonResult = contentResult.Content;
                var usuarios = JsonConvert.DeserializeObject<List<UsuarioModel>>(jsonResult);
                UsuarioModel usuario = usuarios.FirstOrDefault(x => x.Correo == user && x.Contrasenia == password);

                if (usuario == null)
                {
                    return BadRequest();
                }


                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Correo", usuario.Correo)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                        jwt.Issuer,
                        jwt.Audience,
                        claims,
                        expires: DateTime.Now.AddMinutes(60),
                        signingCredentials: singIn
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            else if (dbUsuariosResult is NoContentResult)
            {
                return NotFound();

            }
            else
            {
                return StatusCode(500);

            }
        }


    }
}
