using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.DataLayer;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
            _axsisDemoContext.AddAsync(newUser);

            return Task.CompletedTask;
        }

        public async Task<bool> DisableAsync(int userIdToDisable)
        {
            var userToDisable = await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Id == userIdToDisable);

            if (userToDisable == null) return false;

            userToDisable.Disable();

            _axsisDemoContext.SaveChanges();

            return true;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _axsisDemoContext.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<string> GetEmailById(int id)
        {
            return (await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Id == id)).Email;
        }

        public async Task<int> GetIdByEmail(string email)
        {
            return (await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Email == email)).Id;
        }

        public async Task<bool> HasAnyAsync(string email, string password)
        {
            return await _axsisDemoContext.Users.AnyAsync(q => q.Email == email && q.Password == password);
        }

        public async Task<bool> IsEmailAlreadyUsedAsync(string email)
        {
            return await _axsisDemoContext.Users.AnyAsync(q => q.Email == email);

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
