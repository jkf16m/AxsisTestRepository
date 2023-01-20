using AxsisDemoProject.Controllers.Domain.SharedSection.Services;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestAxsisDemoProject.Controllers.Domain.SessionSection.Adapters;
using TestAxsisDemoProject.Controllers.Domain.UserSection.Adapters;

namespace TestAxsisDemoProject.Controllers.Domain.UserSection.Service
{
    [TestClass]
    public class AuthServiceTest
    {

        private AuthService _authService;

        [TestInitialize]
        public void Init() {
            _authService = new AuthService(new UserMockRepository(), new SessionMockRepository(), new EncryptorService());
        }


        [TestMethod]
        public async Task TryToAuthenticateStoredUser()
        {
            var tokenDate = DateTime.Parse("2022-01-01");
            Console.WriteLine(tokenDate.ToString());
            var result = await _authService.CreateTokenAsync("jkf16m@gmail.com", "1234", tokenDate);


            Assert.AreEqual(
                "293ae30a478dd9a4f8098586ac1291e2edcfe9c4cb2088ee75013010f0b2229a"
                ,result);
        }

        [TestMethod]
        public async Task FailedAuthentication()
        {
            var tokenDate = DateTime.Parse("2022-02-02");
            var result = await _authService.CreateTokenAsync("jkf16m@gmail.com", "12345", tokenDate);
            Assert.AreEqual("",result);
        }

        [TestMethod]
        public async Task SuccessfulTokenExpiration()
        {
            var wasTokenExpired = await _authService.ExpireAsync("jkf16m@gmail.com", "293ae30a478dd9a4f8098586ac1291e2edcfe9c4cb2088ee75013010f0b2229a");
            Assert.IsTrue(wasTokenExpired);
        }

        [TestMethod]
        public async Task WrongTokenExpiration()
        {
            var wasTokenExpired = await _authService.ExpireAsync("jkf16m@gmail.com", "BBLABLABLAESTE NO ES EL TOKEN JAJA");
            Assert.IsFalse(wasTokenExpired);

        }
    }
}
