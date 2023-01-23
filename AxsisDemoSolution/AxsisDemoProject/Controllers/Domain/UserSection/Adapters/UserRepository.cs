using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using AxsisDemoProject.Controllers.Domain.DataLayer;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using System;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Adapters
{
    public class UserRepository : IUserRepository
    {
        private readonly AxsisDemoContext _axsisDemoContext;
        private readonly EncryptorService _encryptorService;
        public UserRepository(AxsisDemoContext axsisDemoContext, EncryptorService encryptorService)
        {
            _axsisDemoContext = axsisDemoContext;
            _encryptorService = encryptorService;
        }

        public async Task AddAsync(User newUser)
        {
            await _axsisDemoContext.AddAsync(newUser);

            await _axsisDemoContext.SaveChangesAsync();
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
            return await _axsisDemoContext.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User> GetByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _axsisDemoContext.Users.AsNoTracking().FirstOrDefaultAsync(q => q.Email == email);
            var tempUser = new User(0, "", email, password, false, "", DateTime.Now, _encryptorService.Encrypt);
            var encryptedPassword = tempUser.EncryptedPassword;
            return await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Email == email && q.Password == encryptedPassword);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _axsisDemoContext.Users.AsNoTracking().FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<string> GetEmailById(int id)
        {
            return (await _axsisDemoContext.Users.AsNoTracking().FirstOrDefaultAsync(q => q.Id == id)).Email;
        }

        public async Task<int> GetIdByEmailAsync(string email)
        {
            var user =  (await _axsisDemoContext.Users.FirstOrDefaultAsync(q => q.Email == email));
            if (user == null) return 0;
            return user.Id;
        }

        public async Task<bool> AuthenticateAsync(string email, string encryptedPassword)
        {
            return await _axsisDemoContext.Users.AnyAsync(q => q.Email == email && q.Password == encryptedPassword );
        }

        public async Task<bool> AuthenticateActiveUsersAsync(string email, string encryptedPassword)
        {
            return await _axsisDemoContext.Users.AnyAsync(q => q.Email == email && q.Password == encryptedPassword && q.Status == true);
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

        public async Task UpdateAsync(User userToUpdate)
        {

            _axsisDemoContext.Update(userToUpdate);

            await _axsisDemoContext.SaveChangesAsync();
        }

        
    }
}
