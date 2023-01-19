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
        public UserMockRepository() {
            _users = new List<User>()
            {
                new User(
                    id: 1,
                    name: "José Daniel",
                    email: "jkf16m@gmail.com",
                    password: "1234",
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

        public Task DisableAsync(int userIdToDisable)
        {
            _users = _users.Select(user => {
                if (user.Id == userIdToDisable)
                {
                    return user.Disable();
                }
                else
                {
                    return user;
                }
            }).ToList();

            return Task.CompletedTask;
        }

        public Task<bool> HasAnyAsync(User userToUpdate)
        {
            return Task.FromResult(_users.Exists(user => user.Equals(userToUpdate)));
        }

        public Task<bool> IsEmailAlreadyUserAsync(string email)
        {
            return Task.FromResult(
                _users.Any(user => user.Email == email)
                ) ;
        }

        public Task<bool> ShouldBeAuthorized(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ShouldHaveBasicAuthenticationAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(User userToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
