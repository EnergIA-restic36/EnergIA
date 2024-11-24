namespace Energia.Api.Models
{
    public class Consumo
    {
        public int Id { get; set; }
        public string DispositivoId { get; set; } = string.Empty;
        public double ConsumoMedido { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
