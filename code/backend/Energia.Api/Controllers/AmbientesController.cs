using Energia.Api.Models;
using Energia.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{
    public record AmbienteDto(string Nome);

    [ApiController]
    [Route("[controller]")]
    public class AmbientesController : ControllerBase
    {
        private readonly AmbienteRepository _ambienteRepository;

        public AmbientesController(AmbienteRepository ambienteRepository)
        {
            _ambienteRepository = ambienteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var ambientes = await _ambienteRepository.GetAll();
            return Ok(ambientes);
        }

        [HttpPost]
        public async Task<IActionResult> Incluir(AmbienteDto ambiente)
        {
            var ambienteBd = new Ambiente { Nome = ambiente.Nome };
            await _ambienteRepository.Add(ambienteBd);
            return Ok(ambienteBd);
        }

        [HttpPut]
        public async Task<IActionResult> Atualizar(int id, AmbienteDto ambiente)
        {
            var ambienteBd = await _ambienteRepository.GetById(id);
            if (ambienteBd == null)
                return NotFound($"Nenhum ambiente foi localizado com o id {id}");

            ambienteBd.Nome = ambiente.Nome;
            await _ambienteRepository.Update(ambienteBd);

            return Ok(ambienteBd);
        }

        [HttpDelete]
        public async Task<IActionResult> Excluir(int id)
        {
            if (id == 0)
                return BadRequest("Informe o id");

            var ambienteBd = await _ambienteRepository.GetById(id);
            if (ambienteBd == null)
                return NotFound($"Nenhum ambiente foi localizado com o id {id}");

            await _ambienteRepository.Delete(ambienteBd);

            return Ok();
        }
    }
}
