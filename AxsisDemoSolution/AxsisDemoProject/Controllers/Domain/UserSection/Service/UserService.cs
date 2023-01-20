using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
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
        private EncryptorService _encryptorService;
        public UserService(IUserRepository userRepository, EncryptorService encryptionAlgorithm)
        {
            _userRepository = userRepository;
            _encryptorService = encryptionAlgorithm;
        }

        /**
         * This method adds a new user, but before that, executes all of the validations
         * contained in the User object
         */
        public async Task<AddingUserResult> AddNewUserAsync(User newUser)
        {

            var emailIsValid = newUser.IsEmailValid();
            var passwordIsValid = newUser.IsPasswordValid();
            var emailAlreadyUsed = await _userRepository.IsEmailAlreadyUsedAsync(newUser.Email);


            var result = new AddingUserResult(
                emailAlreadyUsed,
                false,
                emailIsValid,
                passwordIsValid
            );

            if (result.shouldBeAdded)
            {
                await _userRepository.AddAsync(newUser);
            }


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
            // first, creates a new instance based on the stored email by the user, only Id and Email needed
            var storedUserToUpdateEmail = await _userRepository.GetEmailById(userToUpdate.Id);

            var storedUser = new User(userToUpdate.Id, userToUpdate.Name, storedUserToUpdateEmail, userToUpdate.Password, userToUpdate.Status, userToUpdate.Sex, userToUpdate.CreationDate);
            

            // if both passwords matches, then it it will return true here, so it would be safe to update this user
            // with this info.
            bool bothPasswordsMatched = await _userRepository.HasAnyAsync(storedUser.Email, storedUser.EncryptedPassword);


            
            var updatingUserResult = new UpdatingUserResult(
                bothPasswordsMatched: bothPasswordsMatched
            );


            if (updatingUserResult.shouldBeUpdated && userToUpdate.IsPasswordEncrypted)
            {
                await _userRepository.UpdateAsync(userToUpdate);
            }
            return updatingUserResult;
        }

        /**
         * <summary>Disables the user with the given id in the parameter</summary>
         * <param name="userIdToDisable">The ID to the user to disable</param>
         * <returns>Instance of the disabled user</returns>
         */
        public async Task<bool> DisableUserAsync(int userIdToDisable)
        {
            return await _userRepository.DisableAsync(userIdToDisable);
        }

    }
}
