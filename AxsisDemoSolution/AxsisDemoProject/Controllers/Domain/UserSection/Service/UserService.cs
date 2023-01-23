using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        /**
         * This method adds a new user, but before that, executes all of the validations
         * contained in the User object
         */
        public async Task<AddingUserResult> AddNewUserAsync(User newUser)
        {
            // validations
            var emailIsValid = newUser.IsEmailValid();
            var passwordIsValid = newUser.IsPasswordValid();
            var emailAlreadyUsed = await _userRepository.IsEmailAlreadyUsedAsync(newUser.Email);

            // store validations in object
            var result = new AddingUserResult(
                emailAlreadyUsed,
                false,
                emailIsValid,
                passwordIsValid
            );

            // configuration of user before adding it
            newUser.UpdateDate(DateTime.Now);
            newUser.EncryptionPasswordAlgorithm = _encryptorService.Encrypt;
            var successfulPasswordEncryption = newUser.EncryptPassword();


            // when everything has been set
            if (result.shouldBeAdded && successfulPasswordEncryption)
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
        public async Task<UpdatingUserResult> UpdateUserAsync(User userNewUpdatedState, string currentEmail, string newEmail, string currentPassword, string newPassword)
        {
            // first, creates a new instance based on the stored email by the user, only Id and Email needed
            var storedUser = await _userRepository.GetByIdAsync(userNewUpdatedState.Id);

            var storedUserTempInstance = new User(
                userNewUpdatedState.Id,
                userNewUpdatedState.Name,
                storedUser.Email,
                currentPassword,
                userNewUpdatedState.Status ?? false,
                userNewUpdatedState.Sex,
                storedUser.CreationDate ?? DateTime.MinValue,
                _encryptorService.Encrypt
            );
            

            // if both passwords matches, then it it will return true here, so it would be safe to update this user
            // with this info.
            bool bothPasswordsMatched = await _userRepository.AuthenticateAsync(storedUser.Email, storedUserTempInstance.EncryptedPassword);

            // this is the new state, derived from the stored one as defaults values
            var userToUploadAndUpdate = new User(
                id: userNewUpdatedState.Id,
                name: userNewUpdatedState.Name ?? storedUser.Name,
                email: userNewUpdatedState.Email ?? storedUser.Email,
                password: userNewUpdatedState.Password.IsNullOrEmpty() ? currentPassword : userNewUpdatedState.Password,
                status: userNewUpdatedState.Status ?? storedUser.Status ?? false,
                sex: userNewUpdatedState.Sex ?? storedUser.Sex,
                creationDate: userNewUpdatedState.CreationDate ?? storedUser.CreationDate ?? DateTime.MinValue,
                encryptionAlgorithmFunction: _encryptorService.Encrypt
            );

            userToUploadAndUpdate.EncryptPassword();

            var updatingUserResult = new UpdatingUserResult(
                bothPasswordsMatched: bothPasswordsMatched,
                wasPasswordEncrypted: userToUploadAndUpdate.IsPasswordEncrypted
            );


            if (updatingUserResult.shouldBeUpdated && userToUploadAndUpdate.IsPasswordEncrypted)
            {
                await _userRepository.UpdateAsync(userToUploadAndUpdate);
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

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
    }
}
