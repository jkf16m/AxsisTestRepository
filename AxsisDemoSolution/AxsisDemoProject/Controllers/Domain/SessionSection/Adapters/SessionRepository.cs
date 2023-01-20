using AxsisDemoProject.Controllers.Domain.DataLayer;
using AxsisDemoProject.Controllers.Domain.SessionSection.Model;
using AxsisDemoProject.Controllers.Domain.SessionSection.Ports;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.SessionSection.Adapters
{
    public class SessionRepository : ISessionRepository
    {
        private readonly AxsisDemoContext _axsisDemoContext;
        public SessionRepository(AxsisDemoContext axsisDemoContext)
        {
            _axsisDemoContext = axsisDemoContext;
        }
        public async Task<Session> CreateSessionAsync(string token, int userId, DateTime expirationDate)
        {
            var newSession = new Session(token, userId, expirationDate);

            await _axsisDemoContext.Sessions.AddAsync(newSession);

            await _axsisDemoContext.SaveChangesAsync();

            return newSession;
        }

        public async Task<bool> ExpireSessionAsync(int userId, string token)
        {
            var removedSession = await _axsisDemoContext.Sessions.FirstOrDefaultAsync(q => q.UserId == userId && q.Token == token);

            if (removedSession == null) return false;

            _axsisDemoContext.Sessions.Remove(removedSession);

            await _axsisDemoContext.SaveChangesAsync();

            return true;
        }

        public async Task<Session> GetSessionAsync(int userId, string token)
        {
            return await _axsisDemoContext.Sessions.FirstOrDefaultAsync(q => q.UserId == userId && q.Token == token);
        }

        public async Task<Session> UpdateSessionAsync(int userId, string token, string newToken)
        {
            var session = await _axsisDemoContext.Sessions.FirstOrDefaultAsync(q=>q.UserId == userId && q.Token == token);
            
            session.Token = newToken;

            await _axsisDemoContext.SaveChangesAsync();

            return session;
        }
    }
}
