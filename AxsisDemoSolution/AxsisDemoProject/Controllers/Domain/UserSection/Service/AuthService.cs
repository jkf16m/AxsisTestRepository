using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.SessionSection.Model;
using AxsisDemoProject.Controllers.Domain.SessionSection.Ports;
using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using Microsoft.Identity.Client;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Service
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ISessionRepository _sessionRepository;
        private readonly EncryptorService _encryptorService;
        public AuthService(IUserRepository userRepository, ISessionRepository sessionRepository , EncryptorService encryptorService) {
            _userRepository = userRepository;
            _encryptorService = encryptorService;
            _sessionRepository = sessionRepository;
        }

        /**
         * <summary>
         * Authenticates user, to give him the basic access to try all the resources of the website,
         * this doesn't give him all the available authorization
         * </summary>
         * <param name="email">Email of the user</param>
         * <param name="password">Password of the user, it doesn't have to be encoded</param>
         * <returns>A token string, supposed to be stored by the client, it will be null if the authentication wasn't
         * sucessful</returns>
         */
        public async Task<Session> CreateTokenAsync(string email, string password, DateTime tokenDate)
        {
            var userId = await _userRepository.GetIdByEmailAsync(email);
            var userTryingToLogIn = new User(userId, "", email, password, false, "", DateTime.MinValue, _encryptorService.Encrypt);

            if(await _userRepository.HasAnyAsync(userTryingToLogIn.Email, userTryingToLogIn.EncryptedPassword))
            {
                return (
                    await _sessionRepository.CreateSessionAsync
                    (
                    // this is the session generated token, it will be regenerated each request
                    _encryptorService.Encrypt($"{userTryingToLogIn.EncryptedPassword}:{tokenDate}")
                    // this is the session generated token expiration date
                    , userTryingToLogIn.Id, tokenDate.AddDays(1)
                    )
                );
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> AuthenticateAsync(string token)
        {
            string tokenWithoutTextBearer = "";
            if (token.StartsWith("Bearer"))
                tokenWithoutTextBearer = token.Replace("Bearer", "").Trim();
            return await _sessionRepository.TokenExistsAsync(tokenWithoutTextBearer);
        }

        public async Task<string> ConsumeTokenAsync(string email, string token, DateTime tokenDate)
        {
            var userId = await _userRepository.GetIdByEmailAsync(email);

            var session = await _sessionRepository.GetSessionAsync(userId, token);

            if (session == null) return "";

            var newToken = _encryptorService.Encrypt($"{token}:{tokenDate}");

            return (await _sessionRepository.UpdateSessionAsync(userId, token, newToken)).Token;

        }

        /**
         * <summary>Expires the given token of the session</summary>
         * <param name="token">token string</param>
         * <returns>True if there was a token session in DB, false it there wasn't any
         * (there is no need to expose this data to the client, it is for unit testing purposes)
         * </returns>
         */
        public async Task<bool> ExpireAsync(string email, string token)
        {
            var userId = await _userRepository.GetIdByEmailAsync(email);
            return await _sessionRepository.ExpireSessionAsync(userId, token);
        }

    }
}
