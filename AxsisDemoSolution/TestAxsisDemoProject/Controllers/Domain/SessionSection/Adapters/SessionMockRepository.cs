using AxsisDemoProject.Controllers.Domain.SessionSection.Model;
using AxsisDemoProject.Controllers.Domain.SessionSection.Ports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestAxsisDemoProject.Controllers.Domain.SessionSection.Adapters
{
    public class SessionMockRepository : ISessionRepository
    {
        private List<Session> _sessions;
        public SessionMockRepository()
        {
            _sessions = new List<Session>()
            {
                new Session("293ae30a478dd9a4f8098586ac1291e2edcfe9c4cb2088ee75013010f0b2229a", 1, DateTime.Now.AddDays(1))
            };
        }
        public Task<Session> CreateSessionAsync(string token, int userId, DateTime expirationDate)
        {
            var addedSession = new Session(
                token: token,
                userId: userId,
                expirationDate: expirationDate
                );
            _sessions.Add(addedSession);

            return Task.FromResult(addedSession);
        }

        public Task<bool> ExpireSessionAsync(int userId, string token)
        {
            var activeSessionsOfThisUser = _sessions.Where(q => q.UserId == userId);

            var activeToken = activeSessionsOfThisUser.FirstOrDefault(t => t.Token == token);

            if (activeToken == null) return Task.FromResult(false);

            _sessions.Remove(activeToken);

            return Task.FromResult(true);
        }
    }
}
