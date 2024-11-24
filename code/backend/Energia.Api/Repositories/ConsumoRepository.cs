using Energia.Api.Context;
using Energia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Repositories
{
    public class ConsumoRepository(EnergiaDbContext context) : RepositoryBase<Consumo>(context)
    {      
        public async Task<IEnumerable<Consumo>> ObterPorDispositivo(string dispositivoId)
        {
            return await _context.Consumos.Where(c => c.DispositivoId == dispositivoId).ToListAsync();  
        }
    }
}
