using Energia.WebSocket;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddDbContext<EnergiaDbContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<EnergiaDbContext>();
    dbContext.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.MapHub<EnergiaHub>("/energiaHub");

app.MapGet("/consumos", async (EnergiaDbContext context) =>
{
    var consumos = await context.Dispositivos
        .Include(d => d.TipoDipositivo)
        .Include(d => d.Ambiente)
        .Include(d => d.Consumos).ToListAsync();

    return Results.Ok(consumos);
}).WithName("consumos");

app.Run();
