using Energia.SensorMock;

var builder = Host.CreateApplicationBuilder(args);
builder.Configuration.AddCommandLine(args);
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
