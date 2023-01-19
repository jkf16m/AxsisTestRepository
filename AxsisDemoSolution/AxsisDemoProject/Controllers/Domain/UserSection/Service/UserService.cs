using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
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
        public async Task<AddingUserResult> AddNewUserAsync(User newUser)
        {

            var emailIsValid = newUser.IsEmailValid();
            var passwordIsValid = newUser.IsPasswordValid();
            var emailAlreadyUsed = await _userRepository.IsEmailAlreadyUserAsync(newUser.Email);


            var result = new AddingUserResult(
                emailAlreadyUsed,
                false,
                emailIsValid,
                passwordIsValid
            );

            if (result.shouldBeAdded)
                await _userRepository.AddAsync(newUser);


            return result;
        }

        /**
         * <summary>
         * This method updates the corresponding user from the Id, with all the values
         * ONLY if the passwords and Id match.
         * If the password doesn't match with the stored one, it won't update this user.
         * </summary>
         */
        public async Task<UpdatingUserResult> UpdateUserAsync(User userToUpdate)
        {
            if (
                await _userRepository.HasAnyAsync(userToUpdate)
            )
            {
                
            }
            var updatingUserResult = new UpdatingUserResult(
                bothPasswordsMatched: await _userRepository.ShouldBeAuthorized(userToUpdate)
            );

            if (updatingUserResult.shouldBeUpdated)
            {
                await _userRepository.UpdateAsync(userToUpdate);
            }
            return updatingUserResult;
        }

        public async Task DisableUserAsync(int userIdToDisable)
        {
            await _userRepository.DisableAsync(userIdToDisable);
        }

    }
}
