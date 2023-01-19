using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using System;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Service
{
    public class UserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /**
         * This method adds a new user, but before that, executes all of the validations
         * contained in the User object
         */
        public async Task<bool> AddNewUserAsync(User newUser)
        {
            var validationResult = newUser.ShouldBeAdded();


            if (validationResult)
                await _userRepository.AddAsync(newUser);


            return validationResult;
        }

        /**
         * <summary>
         * This method updates the corresponding user from the Id, with all the values
         * ONLY if the passwords and Id match.
         * If the password doesn't match with the stored one, it won't update this user.
         * </summary>
         */
        public async Task<bool> UpdateUserAsync(User userToUpdate)
        {
            if (
                await _userRepository.HasAnyAsync(userToUpdate)
            )
            {
                await _userRepository.UpdateAsync(userToUpdate);
            }
            return true;
        }

        public async Task DisableUserAsync(int userIdToDisable)
        {
            await _userRepository.DisableAsync(userIdToDisable);
        }

    }
}
