using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using phonebookServiceApi.services.helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using phonebookServiceApi.Repository.Model;
using phonebookServiceApi.Repository.Interfaces;
using phonebookServiceApi.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services;
using phonebookServiceApi.services.decorators.authenticationDecorators;
using Microsoft.Data.Sqlite;
using phonebookServiceApi.services.decorators.phonebookDecorators;

namespace phonebookServiceApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            var optionsBuilder = new DbContextOptionsBuilder();
            var _builder = new SqliteConnectionStringBuilder(appSettings.Phonebook_ConnectionString);

            //register the db context
            services.AddDbContext<PhonebookContext>(opts => opts.UseSqlite(_builder.ConnectionString));

            // repositories
            services.AddScoped<IPhonebookRepository, PhonebookRepository>();
            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();

            // services
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IPhonebookService, PhonebookService>();

            services.AddScoped<IPasswordHasher, PasswordHasher>();

            // Decorators
            services.Decorate<IAuthenticationService, AuthValidationDecorator>();
            services.Decorate<IAuthenticationService, AuthExceptionDecorator>();
            services.Decorate<IPhonebookService, PhoneValidationDecorator>();
            services.Decorate<IPhonebookService, PhoneExceptionDecorator>();

            services.AddCors(o => o.AddPolicy("AllowCors", builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
            }));

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                .RequireAuthenticatedUser().Build());
            });

            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAutoMapper(c=>c.AddProfile<AutoMapping>(), typeof(Startup));

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowCors");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
