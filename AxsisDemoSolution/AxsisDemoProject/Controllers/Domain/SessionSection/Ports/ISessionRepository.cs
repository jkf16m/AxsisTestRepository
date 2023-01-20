using AxsisDemoProject.Controllers.Domain.SessionSection.Model;
using System;
using System.Security.Principal;
using System.Threading.Tasks;

namespace AxsisDemoProject.Controllers.Domain.SessionSection.Ports
{
    public interface ISessionRepository
    {
        Task<Session> CreateSessionAsync(string token, int userId, DateTime expirationDate);
        Task<bool> ExpireSessionAsync(int userId, string token);
    }
}
