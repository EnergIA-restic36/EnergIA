using Energia.Api.Context;
using Energia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Repositories
{
    public class DispositivoRepository(EnergiaDbContext context) : RepositoryBase<Dispositivo>(context)
    {
        public override async Task<IEnumerable<Dispositivo>> GetAll()
        {
            return await _context.Dispositivos
                .Include(d => d.TipoDispositivo)
                .Include(d => d.Ambiente).ToListAsync();
        }
    }
}
