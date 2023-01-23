using AxsisDemoProject.Controllers.Domain.UserSection.Adapters;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using AutoMapper;
using AxsisDemoProject.Controllers.Domain.SharedSection.Automapper;
using AxsisDemoProject.Controllers.Domain.SessionSection.Ports;
using AxsisDemoProject.Controllers.Domain.SessionSection.Adapters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AxsisDemoProject
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
            services.AddControllersWithViews();

            services.AddDbContext<AxsisDemoContext>(options => {
                var connection_string = Configuration.GetConnectionString("AxsisDemoDatabase");
                options.UseSqlServer(connection_string);
            });

            // AUTHENTICATION
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]
                        )
                    ),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });
            services.AddAuthorization();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ISessionRepository, SessionRepository>();

            services.AddScoped<EncryptorService>();
            services.AddScoped<AuthService>(o =>
            {
                return new AuthService(
                    userRepository: o.GetService<IUserRepository>(),
                    encryptorService: o.GetService<EncryptorService>(),
                    issuer: Configuration["Jwt:Issuer"],
                    audience: Configuration["Jwt:Audience"],
                    key: Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])
                ) ;
            });
            services.AddScoped<UserService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


            // AUTOMAPPER CONFIGURATION
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
