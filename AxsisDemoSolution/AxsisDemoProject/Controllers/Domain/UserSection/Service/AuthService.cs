using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Service
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        /**
         * <summary>
         * Authenticates user, to give him the basic access to try all the resources of the website,
         * this doesn't give him all the available authorization
         * </summary>
         * <param name="email">Email of the user</param>
         * <param name="password">Password of the user, it doesn't have to be encoded</param>
         * <returns>A token string, supposed to be stored by the client</returns>
         */
        public async Task<string> AuthenticateAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<string> AuthorizeAsync(User user)
        {
            return "prueba";
        }
    }
}
