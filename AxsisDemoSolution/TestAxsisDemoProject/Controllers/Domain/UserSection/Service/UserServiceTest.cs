using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestAxsisDemoProject.Controllers.Domain.UserSection.Adapters;
using AxsisDemoProject.Controllers.Domain.SharedSection.Services;

namespace TestAxsisDemoProject.Controllers.Domain.UserSection.Service
{
    [TestClass]
    public class UserServiceTest
    {
        private UserService userService;
        private EncryptorService _encryptorService;

        [TestInitialize]
        public void Initialize()
        {
            _encryptorService = new EncryptorService();
            var mockRepository = new UserMockRepository();

            userService = new UserService(mockRepository, _encryptorService);
        }

        [TestMethod]
        public async Task AddNewUserWithAlreadyUsedEmailAndInvalidPasswordTestAsync()
        {
            var newUser = new User(2, "hola", "jkf16m@gmail.com", "123", false, "female", DateTime.MinValue);
            var result = await userService.AddNewUserAsync(newUser);
            Assert.AreEqual(new AddingUserResult(
                    emailAlreadyUsed: true,
                    idRepeated: false,
                    validEmail: true,
                    validPassword: false
             ).shouldBeAdded,result.shouldBeAdded);
        }

        [TestMethod]
        public async Task AddNewUserWithValidEmailAndPassword()
        {
            var newUser = new User(
                2, "hola",
                "jkf20m@gmail.com",
                "asjdlñfj 287@ JAJ",
                true,
                "male",
                DateTime.MaxValue
                );

            var result = await userService.AddNewUserAsync(newUser);
            Assert.AreEqual(
                new AddingUserResult(
                    emailAlreadyUsed: false,
                    idRepeated: false,
                    validEmail: true,
                    validPassword: true
                    ).shouldBeAdded
                ,result.shouldBeAdded) ;
        }

        [TestMethod]
        // falta actualizar
        public async Task UpdateExistingUserWithTheSameId()
        {
            var updateDanielUser = new User(
                1, "Daniel", "jkf19m@gmail.com", "12345", true, sex: "female", DateTime.MinValue);

            var result = await userService.UpdateUserAsync(updateDanielUser, updateDanielUser.Email, updateDanielUser.Password, "contraseña1A@");

            Assert.AreEqual(
                new UpdatingUserResult(true,true, true, true).shouldBeUpdated
                , result.shouldBeUpdated
                );
        }

        [TestMethod]
        public async Task WontUpdateUserIfSentPasswordAndStoredPasswordDoesntMatch()
        {
            var updateDanielUser = new User(
                1, "Daniel", "jkf19m@gmail.com", "122224", false, sex: "female", DateTime.MinValue);

            var result = await userService.UpdateUserAsync(updateDanielUser, "ao@gma", updateDanielUser.Password, "js");

            Assert.AreEqual(
                new UpdatingUserResult(false,true, false, false).shouldBeUpdated
                , result.shouldBeUpdated
                );
        }

        [TestMethod]
        public async Task DeleteUserWithTheGivenIdNoMatterWhichUserRequestedIt()
        {
            var deletedId = 1;
            var result = await userService.DisableUserAsync(deletedId);
            //this is a valid user

            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task TryToDeleteUserWithTheGivenIdButItDoesntExist()
        {
            var deletedId = 99;
            var result = await userService.DisableUserAsync(deletedId);
            // this will try to delete a user in the mock repository but it doesn't exist

            Assert.IsFalse(result);
        }
    }
}