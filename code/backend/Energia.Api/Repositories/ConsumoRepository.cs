using Energia.Api.Context;
using Energia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Repositories
{
    public class ConsumoRepository(EnergiaDbContext context) : RepositoryBase<Consumo>(context)
    {       
    }
}
