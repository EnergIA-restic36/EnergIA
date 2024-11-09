using Energia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Context
{
    public class EnergiaDbContext : DbContext
    {
        public DbSet<Consumo> Consumos { get; set; }
        public DbSet<Ambiente> Ambientes { get; set; }
        public DbSet<TipoDispositivo> TiposDispositivo { get; set; }
        public DbSet<Dispositivo> Dispositivos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=energia_cosumo.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ambiente>().Property(a => a.Nome).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<TipoDispositivo>().Property(t => t.Nome).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Dispositivo>().Property(d => d.Nome).IsRequired().HasColumnType("varchar").HasMaxLength(100);

            modelBuilder.Entity<Ambiente>().HasData(
                new Ambiente { Id = 1, Nome = "Produção" },
                new Ambiente { Id = 2, Nome = "Administrativo" }
            );

            modelBuilder.Entity<TipoDispositivo>().HasData(
                new TipoDispositivo { Id = 1, Nome = "Energia" }
            );

            modelBuilder.Entity<Dispositivo>().HasData(
                new Dispositivo { Id = 1, Nome = "Linha de Produção 1", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = 2, Nome = "Linha de Produção 2", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = 3, Nome = "Ar Condicionado", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = 4, Nome = "Ar Condicionado", AmbienteId = 2, TipoDispositivoId = 1 },
                new Dispositivo { Id = 5, Nome = "Lâmpada", AmbienteId = 2, TipoDispositivoId = 1 }
            );
        }
    }
}
