using Energia.Api.Context;
using Energia.Api.Models;

namespace Energia.Api.Repositories
{
    public class TipoDispositivoRepository(EnergiaDbContext context) : RepositoryBase<TipoDispositivo>(context)
    {
    }
}
