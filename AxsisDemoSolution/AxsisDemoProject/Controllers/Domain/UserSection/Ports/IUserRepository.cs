using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Ports
{
    public interface IUserRepository
    {
        Task AddAsync(User newUser);
        Task DisableAsync(int userIdToDisable);
        Task<bool> HasAnyAsync(User userToUpdate);
        Task UpdateAsync(User userToUpdate);
    }
}
