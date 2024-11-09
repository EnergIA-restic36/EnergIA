using Microsoft.AspNetCore.SignalR;

namespace Energia.WebSocket
{
    public record ConsumoDto(int DispositivoId, double ConsumoMedido, DateTime Timestamp);

    public class EnergiaHub(EnergiaDbContext context) : Hub
    {
        private readonly EnergiaDbContext _context = context;

        public async Task EnviarConsumo(ConsumoDto dados)
        {
            try
            {
                var consumo = new Consumo
                {
                    DispositivoId = dados.DispositivoId,
                    ConsumoMedido = dados.ConsumoMedido,
                    Timestamp = dados.Timestamp
                };
                _context.Consumos.Add(consumo);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Dados Recebidos. Consumido {dados.ConsumoMedido} kWh em {dados.Timestamp}.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro {ex.Message}");
            }            
        }
    }
}
