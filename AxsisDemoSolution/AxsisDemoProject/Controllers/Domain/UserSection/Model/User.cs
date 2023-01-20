using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace AxsisDemoProject.Controllers.Domain.UserSection.Model
{
    public class User : IEquatable<User>
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public bool Status { get; private set; }
        public string Sex { get; private set; }
        public DateTime CreationDate { get; private set; }

        [NotMapped]
        public bool IsPasswordEncrypted {get; private set;}

        [NotMapped]
        public string EncryptedPassword { get; private set; }


        private Func<string, string> _encryptionPasswordAlgorithm;
        [NotMapped]
        public Func<string, string> EncryptionPasswordAlgorithm {
            get {
                return _encryptionPasswordAlgorithm;
            }
            private set {
                _encryptionPasswordAlgorithm= value;
                EncryptedPassword = _encryptionPasswordAlgorithm?.Invoke($"{Id}:{Email}:{Password}") ?? "";
            }
        }



        private User() { }
        public User(int id, string name, string email, string password, bool status, string sex, DateTime creationDate,
            Func<string, string> encryptionAlgorithmFunction = null
            )
        {
            Id = id;
            Name = name; Email = email;
            Password = password; Status = status;
            CreationDate = creationDate;
            Sex = sex;
            IsPasswordEncrypted = false;
            EncryptionPasswordAlgorithm = encryptionAlgorithmFunction;
            EncryptedPassword = EncryptionPasswordAlgorithm?.Invoke($"{Id}:{Email}:{Password}") ?? "";
        }

        public User Disable()
        {
            Status = false;
            return this;
        }

        public bool ShouldBeAdded() { return true; }



        public bool Equals(User other)
        {
            return (Id == other.Id
                && Name == other.Name
                && Email == other.Email
                && Password == other.Password
                && Status == other.Status
                && Sex == other.Sex
                && CreationDate == other.CreationDate);
        }

        public bool IsPasswordValid()
        {
            var regularExpressionsToMatch = new string[]
            {
                ".{7,}",            // at least 7 characters
                @"(?=.*\d)",        // at least has one number
                @"(?=[a-z])",       // at least has one lowercase letter
                @"(?=[A-Z])"        // at least has one capital letter

            };
            var allMatched = regularExpressionsToMatch
                .All(
                expression => Regex.IsMatch(Password, expression)
                );

            return allMatched;
        }

        public bool IsEmailValid()
        {
            string Rfc5322CompliantEmailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
            return Regex.IsMatch(Email, Rfc5322CompliantEmailRegex);
        }

        
    }
}
