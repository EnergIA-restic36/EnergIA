using Energia.Api.Models;
using Energia.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{    
    public record DispositivoDto(string Id, string Nome, int AmbienteId, int TipoDipositivoId);

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
                TipoDispositivoId = dispositivo.TipoDipositivoId
            };

            await _dispositivoRepository.Add(dipositivoBd);
            return Ok(dipositivoBd);
        }
    }
}
