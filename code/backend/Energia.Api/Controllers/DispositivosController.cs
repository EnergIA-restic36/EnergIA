using Energia.Api.Models;
using Energia.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{    
    public record DispositivoDto(string Id, string Nome, int AmbienteId, int TipoDispositivoId);

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DispositivosController : ControllerBase
    {
        private readonly DispositivoRepository _dispositivoRepository;

        public DispositivosController(DispositivoRepository dispositivoRepository)
        {
            _dispositivoRepository = dispositivoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var dispositivos = await _dispositivoRepository.GetAll();
            return Ok(dispositivos);
        }

        [HttpPost]
        public async Task<IActionResult> Incluir(DispositivoDto dispositivo)
        {
            var dipositivoBd = new Dispositivo
            {
                Id = dispositivo.Id,
                Nome = dispositivo.Nome,
                AmbienteId = dispositivo.AmbienteId,
                TipoDispositivoId = dispositivo.TipoDispositivoId
            };

            await _dispositivoRepository.Add(dipositivoBd);
            return Ok(dipositivoBd);
        }
    }
}
