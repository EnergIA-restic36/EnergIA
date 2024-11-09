namespace Energia.WebSocket
{
    public class Consumo
    {
        public int Id { get; set; }
        public int DispositivoId { get; set; }
        public Dispositivo Dispositivo { get; set; }
        public double ConsumoMedido { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class Ambiente
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
    }

    public class TipoDispositivo
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
    }

    public class Dispositivo
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int AmbienteId { get; set; }
        public Ambiente Ambiente { get; set; }
        public int TipoDispositivoId { get; set; }
        public TipoDispositivo TipoDipositivo { get; set; }
        public ICollection<Consumo> Consumos { get; set; }
    }
}
