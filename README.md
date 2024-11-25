# **EnergIA: Gestão de Energia Inteligente**

**EnergIA** é um sistema de monitoramento e gestão de energia inteligente, projetado para otimizar o uso de energia em tempo real. O sistema utiliza **Angular** para o frontend e **C# com ASP.NET Core** para o backend, oferecendo uma API para acessar dados de consumo e monitoramento, além de comunicação em tempo real via **SignalR** (WebSockets). O projeto conta ainda com um mock para gerar dados simulados de consumo de energia, proporcionando uma experiência realista de monitoramento.

## **Tecnologias Utilizadas**

### **Frontend:**
- **Angular**: Framework para a construção de interfaces de usuário dinâmicas e responsivas.
- **PrimeNG**: Biblioteca de componentes UI para Angular, utilizada para gráficos e dashboards interativos.
- **RxJS**: Biblioteca para manipulação de fluxos de dados assíncronos e eventos.
- **Socket.io-client**: Para comunicação com o backend via WebSocket e atualização em tempo real.

### **Backend:**
- **C#**: Linguagem de programação para o backend.
- **ASP.NET Core**: Framework para a construção de APIs RESTful e servidores de WebSocket.
- **SignalR**: Para comunicação em tempo real entre o servidor e o frontend via WebSockets.
- **Mock Server**: Geração de dados fictícios de consumo de energia para simulação do sistema.

## **Arquitetura**

- **Frontend (Angular):** Responsável pela exibição dos dados de consumo de energia e gráficos interativos. O frontend se comunica com o backend via API RESTful para dados persistidos e via WebSocket (SignalR) para dados em tempo real.

- **Backend (C#):** A API fornece dados persistidos e o SignalR é utilizado para transmitir informações em tempo real sobre o consumo de energia. Um mock server é utilizado para gerar dados simulados de consumo de energia para cada dispositivo conectado.

## **Instalação**

### **Backend (C#)**

1. Clone o repositório:
    ```bash
    git clone https://[github.com/usuario/energIA.git](https://github.com/EnergIA-restic36/EnergIA)
    ```

2. Acesse a pasta do projeto:
    ```bash
    cd energIA/backend
    ```

3. Restaure as dependências:
    ```bash
    dotnet restore
    ```

4. Compile e execute o backend:
    ```bash
    dotnet run
    ```

   A API estará disponível em `http://localhost:5000`.

### **Frontend (Angular)**

1. Acesse a pasta do frontend:
    ```bash
    cd energIA/frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute o frontend:
    ```bash
    ng serve
    ```

   O frontend estará disponível em `http://localhost:4200`.

## **API - Endpoints**

- **GET /api/energy-devices**: Retorna dispositivos de energia.
- **POST /api/energy-devices**: Adiciona um novo dispositivo.
- **GET /api/mockdata**: Gera dados simulados de consumo de energia.

## **Comunicação em Tempo Real**

Utiliza **SignalR** para comunicação em tempo real entre o backend e o frontend, permitindo a atualização automática dos dados de consumo.


## **Licença**

Licenciado sob a [MIT License](LICENSE).
