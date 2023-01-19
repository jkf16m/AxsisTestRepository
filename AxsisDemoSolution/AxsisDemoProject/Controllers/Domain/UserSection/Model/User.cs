using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Model
{
    public class User
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public bool Status { get; private set; }
        public string Sex { get; private set; }
        public DateTime CreationDate { get; private set; }



        private User() { }
        public User(string id, string name, string email, string password, bool status, string sex, DateTime creationDate)
        {
            Id = id;
            Name = name; Email = email;
            Password = password; Status = status;
            CreationDate = creationDate;
            Sex = sex;
        }

        public bool ShouldBeAdded() { return true; }

    }
}
