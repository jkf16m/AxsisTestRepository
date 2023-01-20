using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Ports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestAxsisDemoProject.Controllers.Domain.UserSection.Adapters
{
    internal class UserMockRepository : IUserRepository
    {
        private List<User> _users;
        public UserMockRepository()
        {
            _users = new List<User>()
            {
                new User(
                    id: 1,
                    name: "José Daniel",
                    email: "jkf16m@gmail.com",
                    password: "b1c21dae1437148b0ba52444a2bfd4f3c77896a3b40814598e92621ff7522cac", //encrypted: b1c21dae1437148b0ba52444a2bfd4f3c77896a3b40814598e92621ff7522cac
                    status: true,
                    sex: "male",
                    creationDate: DateTime.MaxValue
                    )
            };
        }

        public Task AddAsync(User newUser)
        {
            _users.Add(newUser);
            return Task.CompletedTask;
        }

        public Task<bool> DisableAsync(int userIdToDisable)
        {
            var userToDisable = _users.FirstOrDefault(q => q.Id == userIdToDisable);

            if (userToDisable == null) return Task.FromResult(false);

            userToDisable.Disable();

            return Task.FromResult(true);
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetByIdAsync(int id)
        {
            return Task.FromResult(_users.First(q => q.Id == id));
        }

        public Task<string> GetEmailById(int id)
        {
            return Task.FromResult(_users.First(q => q.Id == id).Email);
        }

        public Task<int> GetIdByEmailAsync(string email)
        {
            return Task.FromResult(_users.First(q => q.Email == email).Id);
        }

        public Task<bool> HasAnyAsync(string email, string password)
        {
            return Task.FromResult(_users.Exists(user => user.Email == email && user.Password.Equals(password,StringComparison.CurrentCultureIgnoreCase)));
        }

        public Task<bool> IsEmailAlreadyUsedAsync(string email)
        {
            return Task.FromResult(
                _users.Any(user => user.Email == email)
                ) ;
        }

        public Task<bool> ShouldBeAuthorized(User user)
        {
            return Task.FromResult(
                _users.Any(u => u.Id == user.Id && u.Password == user.Password)
                ) ;
        }

        public Task<bool> ShouldHaveBasicAuthenticationAsync(User user)
        {
            throw new NotImplementedException();
        }


        public Task UpdateAsync(User userToUpdate)
        {
            _users = _users.Select(u =>
            {
                if(u.Id == userToUpdate.Id)
                {
                    return new User(u.Id, userToUpdate.Name, userToUpdate.Email, userToUpdate.Password,
                        userToUpdate.Status, userToUpdate.Sex, userToUpdate.CreationDate);
                }
                else
                {
                    return u;
                }
            }).ToList();

            return Task.CompletedTask;
        }
    }
}
