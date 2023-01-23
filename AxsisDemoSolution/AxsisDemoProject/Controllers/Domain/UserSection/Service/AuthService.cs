using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.SessionSection.Model;
using AxsisDemoProject.Controllers.Domain.SessionSection.Ports;
using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Service
{
    [AllowAnonymous]
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly EncryptorService _encryptorService;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly byte[] _key;
        public AuthService(IUserRepository userRepository, EncryptorService encryptorService, string issuer, string audience, byte[] key) {
            _userRepository = userRepository;
            _encryptorService = encryptorService;
            _issuer = issuer;
            _audience = audience;
            _key = key;
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
        public async Task<string> GenerateAccessTokenAsync(string email, string password)
        {
            var userId = await _userRepository.GetIdByEmailAsync(email);
            var user = new User(userId, "", email, password, false, "", DateTime.Now, _encryptorService.Encrypt);
            if (await _userRepository.HasAnyAsync(user.Email, user.EncryptedPassword))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("Id", Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, email),
                        new Claim(JwtRegisteredClaimNames.Email, email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    Issuer = _issuer,
                    Audience = _audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha512Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                var stringToken = tokenHandler.WriteToken(token);
                return stringToken ;
            }
            return "";
        }

        public async Task<string> GenerateRefreshTokenAsync(string email, string password)
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            var refreshToken = Convert.ToBase64String(randomNumber);
            await _userRepository.GetByEmailAndPasswordAsync(email, password);
            /*await _userRepository.UpdateRefreshTokenAsync()*/

            return refreshToken;
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_key),
                ValidateLifetime = false // this will ignore token expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler
                                .ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)
                )
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

    }
}
