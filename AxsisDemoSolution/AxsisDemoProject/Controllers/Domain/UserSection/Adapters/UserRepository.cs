using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.DataLayer;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Adapters
{
    public class UserRepository : IUserRepository
    {
        private readonly AxsisDemoContext _axsisDemoContext;
        public UserRepository(AxsisDemoContext axsisDemoContext)
        {
            _axsisDemoContext = axsisDemoContext;
        }

        public Task AddAsync(User newUser)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> DisableAsync(int userIdToDisable)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> HasAnyAsync(User userToUpdate)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> IsEmailAlreadyUserAsync(string email)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ShouldBeAuthorized(User user)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ShouldHaveBasicAuthenticationAsync(User user)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateAsync(User userToUpdate)
        {
            throw new System.NotImplementedException();
        }
    }
}
