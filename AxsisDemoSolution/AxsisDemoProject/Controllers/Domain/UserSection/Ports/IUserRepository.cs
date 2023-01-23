using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using System;
using System.Collections.Generic;
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
        /**
         * <summary>Checks if there is an existing user with this assigned email and encrypted password</summary>
         * <param name="email">Email of the user to look for</param>
         * <param name="password">Password ALREADY ENCRYPTED</param>
         * <returns>True if the repository has the user else False</returns>
         */
        Task<bool> HasAnyAsync(string email, string password);
        Task<bool> IsEmailAlreadyUsedAsync(string email);

         /**
         <summary>
         * This method gives users Basic Authentication to the app, so they can start authorizing themselves.
        </summary>
         */
        Task<bool> ShouldHaveBasicAuthenticationAsync(User user);
        Task UpdateAsync(User userToUpdate);
        Task<bool> ShouldBeAuthorized(User userToUpdate);

        /**
         * <summary>Gets email of the user of the specified id</summary>
         */
        Task<string> GetEmailById(int id);
        /**
         * <summary>Gets id of the user of the specified email</summary>
         */
        Task<int> GetIdByEmailAsync(string email);

        /**
         * <summary>Get all users from the repository</summary>
         */
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);

        Task<User> GetByEmailAndPasswordAsync(string email, string password);
    }
}
