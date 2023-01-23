using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using Microsoft.EntityFrameworkCore;

namespace AxsisDemoProject.Controllers.Domain.DataLayer
{
    public class AxsisDemoContext : DbContext
    {
        public AxsisDemoContext(DbContextOptions<AxsisDemoContext> options): base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
