
using Microsoft.AspNetCore.SignalR.Client;

namespace Energia.SensorMock
{
    public class Worker(ILogger<Worker> logger, IConfiguration configuration) : IHostedService, IDisposable
    {
        private int dispositivoId = 1;
        private int padraoConsumo = 1;

        private Timer? _timer = null;
        private readonly HubConnection _connection = new HubConnectionBuilder()
                .WithUrl("https://localhost:7158/energiaHub")
                .WithAutomaticReconnect()
                .Build();

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var random = new Random();

            if (configuration["id"] is not null)
                dispositivoId = Convert.ToInt32(configuration["id"]);

            padraoConsumo = random.Next(1, 3); //1-baixo; 2=normal; 3-alto

            await _connection.StartAsync(cancellationToken);
            logger.LogInformation("Conexão com o Hub estabelecida.");
            _timer = new Timer(EnviarDados, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
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
                logger.LogInformation($"Dados Enviados. Consumido {consumo.ConsumoMedido} kWh em {consumo.Timestamp}.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Erro ao enviar dados de consumo de energia.");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            logger.LogInformation("Serviço parado");
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose() => _timer?.Dispose();
    }
}
