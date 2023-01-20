using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using System;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Ports
{
    public interface IUserRepository
    {
        Task AddAsync(User newUser);
        /**
         * <summary>Disables the user with the given id</summary>
         * <param name="userIdToDisable">The id of the user to disable</param>
         * <returns>Returns true if the user could be disabled, and false if the given id of user doesn't exist</returns>
         */
        Task<bool> DisableAsync(int userIdToDisable);
        Task<bool> HasAnyAsync(User userToUpdate);
        Task<bool> IsEmailAlreadyUsedAsync(string email);

         /**
         <summary>
         * This method gives users Basic Authentication to the app, so they can start authorizing themselves.
        </summary>
         */
        Task<bool> ShouldHaveBasicAuthenticationAsync(User user);
        Task UpdateAsync(User userToUpdate);
        Task<bool> ShouldBeAuthorized(User userToUpdate);
    }
}
