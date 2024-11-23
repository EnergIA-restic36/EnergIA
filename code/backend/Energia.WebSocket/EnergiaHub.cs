using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Energia.WebSocket
{
    public record ConsumoDto(string DispositivoId, double ConsumoMedido, DateTime Timestamp);
    public record DispositivoConectado(string Id, string ConnectionId);

    public class EnergiaHub() : Hub
    {
        private static readonly ConcurrentDictionary<string, string> _dispositivoConectados = new();

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var dispositivoId = _dispositivoConectados[Context.ConnectionId];
            _dispositivoConectados.TryRemove(Context.ConnectionId, out _);            

            await Clients.All.SendAsync("DispositivoDesconectado", dispositivoId);
        }

        public async Task EnviarConsumo(ConsumoDto dados)
        {
            try
            {
                await Clients.All.SendAsync("Consumo", dados.DispositivoId, dados.ConsumoMedido, dados.Timestamp);

#if DEBUG
                 Console.WriteLine($"Dados Recebidos. Consumido {dados.ConsumoMedido} kWh em {dados.Timestamp}.");
#endif
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro {ex.Message}");
            }            
        }

        public async Task NovoDispositivo(string dispositivoId, string connectionId)
        {
            _dispositivoConectados[connectionId] = dispositivoId;
            await Clients.All.SendAsync("DispositivoConectado", dispositivoId);            
        }

        public async Task ObterDispositivosConectados(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("DispositivosConectados", _dispositivoConectados.Values.ToList());            
        }

        public override Task OnConnectedAsync()
        {
#if DEBUG
            Console.WriteLine($"Dispositivo Conectado {Context.ConnectionId}");
#endif
            return base.OnConnectedAsync();
        }
    }
}
