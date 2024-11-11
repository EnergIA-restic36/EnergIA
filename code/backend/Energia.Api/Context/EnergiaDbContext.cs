using Energia.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Energia.Api.Context
{
    public class EnergiaDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Consumo> Consumos { get; set; }
        public DbSet<Ambiente> Ambientes { get; set; }
        public DbSet<TipoDispositivo> TiposDispositivo { get; set; }
        public DbSet<Dispositivo> Dispositivos { get; set; }

        public EnergiaDbContext(DbContextOptions<EnergiaDbContext> options) : base(options) { }

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
                new Dispositivo { Id = "e5d4b6ac-fb4b-45ad-8a2f-bf82d30df25b", Nome = "Linha de Produção 1", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = "1fdfbd0d-c0cf-4152-b186-db78eded1891", Nome = "Linha de Produção 2", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = "08378394-bd72-491a-bd7a-71771decdbc4", Nome = "Ar Condicionado", AmbienteId = 1, TipoDispositivoId = 1 },
                new Dispositivo { Id = "fbe707c6-293e-4a01-b82b-bd832b537eed", Nome = "Ar Condicionado", AmbienteId = 2, TipoDispositivoId = 1 },
                new Dispositivo { Id = "a63fea0c-f4bf-46f2-bf16-d2d7a24d7698", Nome = "Lâmpada", AmbienteId = 2, TipoDispositivoId = 1 }
            );

            var hasher = new PasswordHasher<IdentityUser>();
            var senha = hasher.HashPassword(null, "admin");

            modelBuilder.Entity<IdentityUser>().HasData(
                new IdentityUser
                {
                    Id = "9387ff99-15c1-4929-8ca8-8c2ccbd23d4a",
                    AccessFailedCount = 0,
                    ConcurrencyStamp = "08a84b30-11d3-4d33-b73b-8ef1d0277a88",
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@energia.com.br",
                    NormalizedEmail = "ADMIN@ENERGIA.COM.BR",
                    LockoutEnabled = false,
                    PasswordHash = senha
                });


            base.OnModelCreating(modelBuilder);
        }
    }
}
