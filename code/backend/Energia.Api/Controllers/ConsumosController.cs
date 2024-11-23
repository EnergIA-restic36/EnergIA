using Energia.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConsumosController : ControllerBase
    {
        private readonly ConsumoRepository _consumoRepository;

        public ConsumosController(ConsumoRepository consumoRepository)
        {
            _consumoRepository = consumoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var consumos = await _consumoRepository.GetAll();
            return Ok(consumos);
        }
    }
}
