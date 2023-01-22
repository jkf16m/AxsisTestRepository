using System;

namespace AxsisDemoProject.Controllers.DataTransferObjects
{
    public class SessionDTO
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
