namespace Energia.Api.Models
{
    public class Dispositivo
    {
        public string Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int AmbienteId { get; set; }
        public Ambiente Ambiente { get; set; }
        public int TipoDispositivoId { get; set; }
        public TipoDispositivo TipoDispositivo { get; set; }
        public ICollection<Consumo> Consumos { get; set; }
    }
}
