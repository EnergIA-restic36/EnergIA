using Energia.Api.Models;
using Energia.Api.Repositories;
using Microsoft.AspNetCore.SignalR.Client;

namespace Energia.Api.WebSocketClients
{
    public class ConsumoWebSocketClient
    {
        private readonly HubConnection _hubConnection;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public ConsumoWebSocketClient(IServiceScopeFactory serviceScopeFactory, IConfiguration configuration)
        {
            _serviceScopeFactory = serviceScopeFactory;
            var url = configuration.GetSection("WebSocketUrl").Get<string>() ?? "";

            _hubConnection = new HubConnectionBuilder()
                .WithUrl(url)
                .WithAutomaticReconnect()
                .Build();

            _hubConnection.On("Consumo", async (string dispositivoId, double consumo, DateTime timestamp) =>
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var consumoRepository = scope.ServiceProvider.GetRequiredService<ConsumoRepository>();

                var consumoDb = new Consumo
                {
                    DispositivoId = dispositivoId,
                    ConsumoMedido = consumo,
                    Timestamp = timestamp
                };

                try
                {
                    await consumoRepository.Add(consumoDb);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            });
        }

        public async Task StartAsync()
        {
            try
            {
                await _hubConnection.StartAsync();

#if DEBUG
                Console.WriteLine("Conectado ao hub com sucesso.");
#endif

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao conectar: {ex.Message}");
            }
        }

        public async Task StopAsync()
        {
            try
            {
                await _hubConnection.StopAsync();

#if DEBUG
                Console.WriteLine("Conexão encerrada.");
#endif
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao desconectar: {ex.Message}");
            }
        }
    }
}
