
using Microsoft.AspNetCore.SignalR.Client;

namespace Energia.SensorMock
{
    public class Worker(ILogger<Worker> logger, IConfiguration configuration) : IHostedService, IDisposable
    {
        private string dispositivoId = Guid.NewGuid().ToString();
        private int padraoConsumo = 1;

        private Timer? _timer = null;
        private readonly HubConnection _connection = new HubConnectionBuilder()
                .WithUrl(configuration.GetSection("WebSocketUrl").Get<string>() ?? "")
                .WithAutomaticReconnect()
                .Build();

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var random = new Random();

            if (configuration["id"] is not null)
                dispositivoId = configuration["id"].ToString();

            padraoConsumo = random.Next(1, 3); //1-baixo; 2=normal; 3-alto

            await _connection.StartAsync(cancellationToken);
            await _connection.InvokeAsync("NovoDispositivo", dispositivoId, _connection.ConnectionId);

#if DEBUG
            logger.LogInformation("Conexão com o Hub estabelecida.");
#endif

            _timer = new Timer(EnviarDados, null, TimeSpan.Zero, TimeSpan.FromSeconds(30));
        }

        private async void EnviarDados(object? state)
        {
            var random = new Random();
            int consumoMedido = padraoConsumo switch
            {
                1 => random.Next(10, 40),
                2 => random.Next(41, 60),
                _ => random.Next(61, 100)
            };

            var consumo = new
            {
                DispositivoId = dispositivoId,
                ConsumoMedido = consumoMedido,
                Timestamp = DateTime.Now
            };

            try
            {
                await _connection.InvokeAsync("EnviarConsumo", consumo);

#if DEBUG
                logger.LogInformation($"Dados Enviados. Consumido {consumo.ConsumoMedido} kWh em {consumo.Timestamp}.");
#endif
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Erro ao enviar dados de consumo de energia.");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
#if DEBUG
            logger.LogInformation("Serviço parado");
#endif
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose() => _timer?.Dispose();
    }
}
