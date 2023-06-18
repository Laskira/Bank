using Microsoft.AspNetCore.Mvc;

namespace Bank.Models.Usuario
{
    public interface IUsuarioMethods
    {
        Task<IActionResult> GuardarUsuario(dynamic jsonUsuario);

        Task<IActionResult> ActualizarUsuario(dynamic jsonUsuario);

        Task<IActionResult> EliminarUsuario(string correo);

        Task<IActionResult> ListarUsuarios();
        Task<IActionResult> ListarUsuario(string id);

        Task<IActionResult> ListarUsuariosSinContrasenia();

        Task<IActionResult> IniciarSesion(dynamic jsonUsuario);
    }
}
