using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using Microsoft.EntityFrameworkCore;

namespace AxsisDemoProject.Controllers.Domain.DataLayer
{
    public class AxsisDemoContext : DbContext
    {
        public AxsisDemoContext(): base()
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
