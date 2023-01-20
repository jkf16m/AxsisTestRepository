﻿using System;

namespace AxsisDemoProject.Controllers.DataTransferObjects
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public string Sex { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
