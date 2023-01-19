using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Service
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        public async Task<bool> AuthenticateAsync(User user)
        {
            return await _userRepository.ShouldHaveBasicAuthenticationAsync(user);
        }

        public async Task<bool> AuthorizeAsync(User user)
        {
            return await _userRepository.ShouldBeAuthorized(user);
        }
    }
}
