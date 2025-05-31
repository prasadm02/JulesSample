var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
using AuthService.Api.Services; // Added for UserService
using Microsoft.AspNetCore.Authentication.JwtBearer; // Added for JWT
using Microsoft.IdentityModel.Tokens; // Added for JWT
using System.Text; // Added for JWT

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // Added for CORS

builder.Services.AddCors(options => // Added for CORS
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:4200") // Angular default dev port
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddSingleton<UserService>(); // Added for UserService
builder.Services.AddControllers(); // Added to use controllers

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins); // Added for CORS

app.UseAuthentication(); // Added for JWT
app.UseAuthorization(); // Added for JWT

// Map controller actions
app.MapControllers(); // Added to use controllers

app.Run();
