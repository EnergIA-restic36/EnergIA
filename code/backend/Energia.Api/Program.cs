using Energia.Api.Context;
using Energia.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EnergiaDbContext>();

builder.Services.AddScoped<AmbienteRepository>();
builder.Services.AddScoped<ConsumoRepository>();
builder.Services.AddScoped<TipoDispositivoRepository>();
builder.Services.AddScoped<DispositivoRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<EnergiaDbContext>();
    dbContext.Database.EnsureCreated();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
