using Energia.Api.Context;
using Energia.Api.Models;

namespace Energia.Api.Repositories
{
    public class AmbienteRepository(EnergiaDbContext context) : RepositoryBase<Ambiente>(context)
    {
    }
}
