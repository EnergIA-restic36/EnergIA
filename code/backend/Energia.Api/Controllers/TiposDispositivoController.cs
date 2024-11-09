using Energia.Api.Models;
using Energia.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{
    public record TipoDispositivoDto(string Nome);

    [ApiController]
    [Route("[controller]")]
    public class TiposDispositivoController : ControllerBase
    {
        private readonly TipoDispositivoRepository _tipoDispositivoRepository;

        public TiposDispositivoController(TipoDispositivoRepository tipoDispositivoRepository)
        {
            _tipoDispositivoRepository = tipoDispositivoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var tiposDispositivo = await _tipoDispositivoRepository.GetAll();
            return Ok(tiposDispositivo);
        }

        [HttpPost]
        public async Task<IActionResult> Incluir(TipoDispositivoDto tipoDispositivo)
        {
            var tipoDispositivoBd = new TipoDispositivo { Nome = tipoDispositivo.Nome };
            await _tipoDispositivoRepository.Add(tipoDispositivoBd);
            return Ok(tipoDispositivoBd);
        }

        [HttpPut]
        public async Task<IActionResult> Atualizar(int id, TipoDispositivoDto tipoDispositivo)
        {
            var tipoDispositivoBd = await _tipoDispositivoRepository.GetById(id);
            if (tipoDispositivoBd == null)
                return NotFound($"Nenhum tipo de dispositivo foi localizado com o id {id}");

            tipoDispositivoBd.Nome = tipoDispositivo.Nome;
            await _tipoDispositivoRepository.Update(tipoDispositivoBd);

            return Ok(tipoDispositivoBd);
        }

        [HttpDelete]
        public async Task<IActionResult> Excluir(int id)
        {
            if (id == 0)
                return BadRequest("Informe o id");

            var tipoDispositivoBd = await _tipoDispositivoRepository.GetById(id);
            if (tipoDispositivoBd == null)
                return NotFound($"Nenhum tipo de dispositivo foi localizado com o id {id}");

            await _tipoDispositivoRepository.Delete(tipoDispositivoBd);

            return Ok();
        }
    }
}
