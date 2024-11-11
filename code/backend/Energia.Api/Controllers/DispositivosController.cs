using Energia.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Energia.Api.Controllers
{    

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
    }
}
