using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AxsisDemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SessionController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;
        private readonly IMapper _mapper;
        public SessionController(AuthService authService, UserService userService, IMapper mapper)
        {
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
        }

        // POST api/<SessionController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SessionCredentialsDTO sessionCredentialsDTO)
        {
            var accessToken = await _authService.GenerateAccessTokenAsync(sessionCredentialsDTO.Email, sessionCredentialsDTO.Password);

            var session = new SessionDTO()
            {
                AccessToken = accessToken,
                RefreshToken = null
            };

            if (session == null) return BadRequest("Invalid client request");
            return Ok(session);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SessionDTO sessionDTO)
        {
            throw new NotImplementedException();
        }


    }
}
