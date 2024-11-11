export interface Dispositivo {
    id: string;
    nome: string;
    ambiente: {
        id: number,
        nome: string
    };
    tipoDispositivo: {
        id: number,
        nome: string
    };
    consumo: number;
    online: boolean;
}