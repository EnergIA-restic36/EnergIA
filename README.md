# **EnergIA: Gestão de Energia Inteligente**

**EnergIA** é um sistema de monitoramento e gestão de energia inteligente, projetado para otimizar o uso de energia em tempo real. O sistema utiliza **Angular** para o frontend e **C# com ASP.NET Core** para o backend, oferecendo uma API para acessar dados de consumo e monitoramento, além de comunicação em tempo real via **SignalR** (WebSockets). O projeto conta ainda com um mock para gerar dados simulados de consumo de energia, proporcionando uma experiência realista de monitoramento.

Pagina Login
![image](https://github.com/user-attachments/assets/5b5c1bba-44da-49e7-bad1-d94a2bf16f68)


Pagina Home

![image](https://github.com/user-attachments/assets/0c65597a-8d53-4e27-a54d-d7c1c9a0f400)


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

Clone o repositório:
    ```bash
    git clone https://[github.com/usuario/energIA.git](https://github.com/EnergIA-restic36/EnergIA)
    ```
    
### **Websocket (C#)**
1. Acesse a pasta do projeto:
    ```bash
    cd energIA/backend/Energia.WebSocket
    ```

2. Restaure as dependências:
    ```bash
    dotnet restore
    ```

3. Execute o backend:
    ```bash
    dotnet run
    ```

### **Mock do Sensor (C#)**
1. Acesse a pasta do projeto:
    ```bash
    cd energIA/backend/Energia.SensorMock
    ```

2. Restaure as dependências:
    ```bash
    dotnet restore
    ```

3. Execute o backend

   O mock do sensor precisa passar o id na inicialização para registar o sensor. Pode ser um id de um sensor já cadastrado no banco de dados ou um id que ainda não exista.

   **Para cada sensor que quiser simular é necessário executar uma instânca da aplicação Energia.SensorMock**

   Alguns IDs já cadastrados:

    e5d4b6ac-fb4b-45ad-8a2f-bf82d30df25b
    
    1fdfbd0d-c0cf-4152-b186-db78eded1891
    
    08378394-bd72-491a-bd7a-71771decdbc4
    
    fbe707c6-293e-4a01-b82b-bd832b537eed
    
    a63fea0c-f4bf-46f2-bf16-d2d7a24d7698
   
    ```bash
    dotnet run --id=e5d4b6ac-fb4b-45ad-8a2f-bf82d30df25b
    ```

### **API (C#)**
1. Acesse a pasta do projeto:
    ```bash
    cd energIA/backend/Energia.Api
    ```

2. Restaure as dependências:
    ```bash
    dotnet restore
    ```

3. Execute o backend:
    ```bash
    dotnet run
    ```    
    
A API estará disponível em `https://localhost:7061`.

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
   
   login: admin
   
   senha: admin

## **API - Endpoints**

- **GET /api/energy-devices**: Retorna dispositivos de energia.
- **POST /api/energy-devices**: Adiciona um novo dispositivo.
- **GET /api/mockdata**: Gera dados simulados de consumo de energia.

## **Comunicação em Tempo Real**

Utiliza **SignalR** para comunicação em tempo real entre o backend e o frontend, permitindo a atualização automática dos dados de consumo.


## **Licença**

Licenciado sob a [MIT License](LICENSE).
