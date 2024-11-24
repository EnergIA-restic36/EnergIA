using Energia.WebSocket;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors();

var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider.GetRequiredService<EnergiaDbContext>();
//    dbContext.Database.EnsureCreated();
//}

app.UseHttpsRedirection();

app.UseCors(p =>
{
    p.WithOrigins("http://localhost:4200", "https://localhost:7061")
    //p.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
});

app.MapHub<EnergiaHub>("/energiaHub");

app.Run();
