using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Energia.WebSocket
{
    public record ConsumoDto(string DispositivoId, double ConsumoMedido, DateTime Timestamp);
    public record DispositivoConectado(string Id, string ConnectionId);

    public class EnergiaHub(EnergiaDbContext context) : Hub
    {
        private readonly EnergiaDbContext _context = context;
        private static readonly ConcurrentDictionary<string, string> _dispositivoConectados = new();

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _dispositivoConectados.TryRemove(Context.ConnectionId, out _);
            await Clients.All.SendAsync("DispositivosConectados", _dispositivoConectados.Values.ToList());
        }

        public async Task EnviarConsumo(ConsumoDto dados)
        {
            try
            {
                //var consumo = new Consumo
                //{
                //    DispositivoId = dados.DispositivoId,
                //    ConsumoMedido = dados.ConsumoMedido,
                //    Timestamp = dados.Timestamp
                //};
                //_context.Consumos.Add(consumo);
                //await _context.SaveChangesAsync();
                await Clients.All.SendAsync("Consumo", dados.DispositivoId, dados.ConsumoMedido);
                Console.WriteLine($"Dados Recebidos. Consumido {dados.ConsumoMedido} kWh em {dados.Timestamp}.");

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro {ex.Message}");
            }            

        }

        public async Task NovoDispositivo(string dispositivoId, string connectionId)
        {
            _dispositivoConectados[connectionId] = dispositivoId;
            await Clients.All.SendAsync("DispositivosConectados", _dispositivoConectados.Values.ToList());            
        }

        public async Task ObterDispositivosConectados(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("DispositivosConectados", _dispositivoConectados.Values.ToList());            
        }
    }
}
