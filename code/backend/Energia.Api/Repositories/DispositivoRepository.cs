using Energia.Api.Context;
using Energia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Repositories
{
    public class DispositivoRepository(EnergiaDbContext context) : RepositoryBase<Dispositivo>(context)
    {
    }
}
