﻿namespace AxsisDemoProject.Controllers.DataTransferObjects
{
    public class UserUpdateDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CurrentEmail { get; set; }
        public string NewEmail { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string Status { get; set; }
        public string Sex { get; set; }
    }
}