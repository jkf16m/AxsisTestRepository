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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public bool? Status { get; private set; }
        public string Sex { get; private set; }
        public DateTime? CreationDate { get; private set; }
      /*  public string RefreshToken { get; private set; }
        public DateTime RefreshTokenExpirationDate { get; private set; }*/

        private AccessCredentials _credentials;
        [NotMapped]
        public AccessCredentials Credentials { get {
                return _credentials;
            }
            private set { 
                _credentials = new AccessCredentials() { Email = value.Email, Password = value.Password };
            }
        }

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
            set {
                _encryptionPasswordAlgorithm= value;
                EncryptedPassword = _encryptionPasswordAlgorithm?.Invoke($"{Email.ToLower()}:{Password}") ?? "";
                IsPasswordEncrypted = !EncryptedPassword.IsNullOrEmpty();
            }
        }



        private User() { }
        public User(int id, string name, string email, string password, bool status, string sex, DateTime creationDate,
            Func<string, string> encryptionAlgorithmFunction = null, string refreshToken = "", DateTime? refreshTokenExpirationDate = null
            )
        {
            Id = id;
            Name = name; Email = email;
            Password = password; Status = status;
            CreationDate = creationDate;
            Sex = sex;
            IsPasswordEncrypted = false;
            EncryptionPasswordAlgorithm = encryptionAlgorithmFunction;
            /*RefreshToken = refreshToken;
            RefreshTokenExpirationDate = refreshTokenExpirationDate ?? DateTime.MinValue;*/
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

        private static readonly string[] _regularExpressionsToMatch =
        {
                ".{10,}",           // at least 10 characters
                @"(?=.*\d)",        // at least has one number
                @"(?=[a-z])",       // at least has one lowercase letter
                @"(?=[A-Z])",       // at least has one capital letter
                @"(?=[\!""\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\^\`\~\\_])"
                                    // at least one symbol
        };
        public bool IsPasswordValid()
        {
            
            var allMatched = _regularExpressionsToMatch
                .All(
                    expression => Regex.IsMatch(Password, expression)
                );

            return allMatched;
        }

        private static readonly string _rfc5322CompliantEmailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
        public bool IsEmailValid()
        {
            return Regex.IsMatch(Email, _rfc5322CompliantEmailRegex);
        }

        /**
         * <summary>Mutates the property "Password" replacing it with the current value of "EncryptedPassword" only if EncryptedPassword is assigned or not null</summary>
         */
        public bool EncryptPassword()
        {
            if (EncryptedPassword.IsNullOrEmpty()) return false;

            Password = EncryptedPassword; return true;
        }

        internal void UpdateDate(DateTime now)
        {
            CreationDate = now;
        }
    }
}
