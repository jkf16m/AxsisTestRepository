using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Ports
{
    public interface IUserRepository
    {
        Task AddAsync(User newUser);
        Task DisableAsync(int userIdToDisable);
        Task<bool> HasAnyAsync(User userToUpdate);
        /**
         * <summary>
         * This method, authorizes an user to its own resources
         * </summary>
         */
        Task<bool> ShouldBeAuthorized(User user);
        /**
         <summary>
         * This method gives users Basic Authentication to the app, so they can start authorizing themselves.
        </summary>
         */
        Task<bool> ShouldHaveBasicAuthenticationAsync(User user);
        Task UpdateAsync(User userToUpdate);
    }
}
