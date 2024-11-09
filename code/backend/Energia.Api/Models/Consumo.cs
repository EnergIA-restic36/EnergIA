namespace Energia.Api.Models
{
    public class Consumo
    {
        public int Id { get; set; }
        public int DispositivoId { get; set; }
        public Dispositivo Dispositivo { get; set; }
        public double ConsumoMedido { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
