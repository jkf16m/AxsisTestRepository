using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AxsisDemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    { 
        private readonly UserService _userService;
        private readonly AuthService _authService;
        private readonly IMapper _mapper;
        public UserController(UserService userService, AuthService authService, IMapper mapper) {
            _userService = userService;
            _authService = authService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            
            var users = await _userService.GetUsersAsync();

            var usersDTO = users.Select(q =>
            {
                var user = _mapper.Map<UserDTO>(q);
                return user;
            }
            );

            return Ok(usersDTO);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            

            var user = await _userService.GetUserByIdAsync(id);

            var userDTO = _mapper.Map<UserDTO>(user);

            return Ok(userDTO);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDTO user)
        {
            
            var userInstance = _mapper.Map<User>(user);
            var addingUserResult = await _userService.AddNewUserAsync(userInstance);
            var addingUserResultDTO = _mapper.Map<AddingUserResultDTO>(addingUserResult);
            return Ok(addingUserResultDTO);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UserUpdateDTO user)
        {
            
            user.Id = id;

            var userInstance = _mapper.Map<User>(user);

            var result = await _userService.UpdateUserAsync(userInstance, user.CurrentEmail, user.NewEmail, user.CurrentPassword, user.NewPassword);

            var updatingUserResultDTO = _mapper.Map<UpdatingUserResultDTO>(result);

            return Ok(updatingUserResultDTO);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            return Ok(await _userService.DisableUserAsync(id));
        }
    }
}
