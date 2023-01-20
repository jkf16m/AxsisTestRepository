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

        public Task<bool> DisableAsync(int userIdToDisable)
        {
            var userToDisable = _users.FirstOrDefault(q => q.Id == userIdToDisable);

            if (userToDisable == null) return Task.FromResult(false);

            userToDisable.Disable();

            return Task.FromResult(true);
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
