using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using System;

namespace AxsisDemoProject.Controllers.Domain.SessionSection.Model
{
    public class Session
    {
        public string Token { get; private set; }
        public DateTime ExpirationDate { get; private set; }
        public int UserId { get; private set; }
        public User User { get; private set; }

        private Session() { }

        public Session(string token, int userId, DateTime expirationDate) {
            Token = token;
            UserId = userId;
            ExpirationDate = expirationDate;
        }
    }
}
