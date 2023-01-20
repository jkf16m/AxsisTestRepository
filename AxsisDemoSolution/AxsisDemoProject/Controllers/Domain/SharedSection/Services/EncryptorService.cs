using System.Text;
using System;
using System.Security.Cryptography;

namespace AxsisDemoProject.Controllers.Domain.SharedSection.Services
{
    public class EncryptorService
    {
        public EncryptorService() { }

        /**
         * <summary>Encrypts string into a SHA256 hash.</summary>
         */
        public string Encrypt(string str)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashValue = sha256.ComputeHash(Encoding.UTF8.GetBytes(str));
                return Convert.ToHexString(hashValue);
            }
        }
    }
}
