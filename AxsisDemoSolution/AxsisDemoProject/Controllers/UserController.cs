using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AxsisDemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    { 
        private readonly UserService _userService;
        private readonly IMapper _mapper;
        public UserController(UserService userService, IMapper mapper) {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<UserDTO>> GetAsync()
        {
            var users = await _userService.GetUsersAsync();

            var usersDTO = users.Select(q =>
            {
                var user = _mapper.Map<UserDTO>(q);
                return user;
            }
            );

            return usersDTO;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            var userDTO = _mapper.Map<UserDTO>(user);

            return userDTO;
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<AddingUserResultDTO> Post([FromBody] UserDTO user)
        {
            var userInstance = _mapper.Map<User>(user);
            var addingUserResult = await _userService.AddNewUserAsync(userInstance);
            var addingUserResultDTO = _mapper.Map<AddingUserResultDTO>(addingUserResult);
            return addingUserResultDTO;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<UpdatingUserResultDTO> Put(int id, [FromBody] UserDTO user)
        {
            user.Id = id;
            var userInstance = _mapper.Map<User>(user);

            var result = await _userService.UpdateUserAsync(userInstance);

            var updatingUserResultDTO = _mapper.Map<UpdatingUserResultDTO>(result);

            return updatingUserResultDTO;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _userService.DisableUserAsync(id);
        }
    }
}
