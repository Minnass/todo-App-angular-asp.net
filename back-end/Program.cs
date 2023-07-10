

global using TodoApi.Data;
global using TodoApi.Services.TodoService;
global using TodoApi.Models;
global using TodoApi.DTO;
global using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TodoApi.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options=>
options.AddPolicy(name:"TodoList",policy=>{
    policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
}));

//ConnectionString Configuration
builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//add services
builder.Services.AddScoped<ITodoService, TodoService>();

//add mapper

var mapperConfig = new MapperConfiguration(mc =>
    {
        mc.AddProfile(new AutoMapperProfile());
    });

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("TodoList");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
