using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AxsisDemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IMapper _mapper;
        public SessionController(AuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        // GET: api/<SessionController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SessionController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SessionController>
        [HttpPost]
        public async Task<string> Post([FromBody] SessionCredentialsDTO sessionCredentialsDTO)
        {
            return await _authService.AuthenticateAsync(sessionCredentialsDTO.Email, sessionCredentialsDTO.Password, DateTime.Now);
        }

        // PUT api/<SessionController>/5
        [HttpPut]
        public async Task<string> Put([FromBody] SessionDataDTO session)
        {
            return await _authService.ConsumeTokenAsync(session.Email, session.Token, DateTime.Now);
        }

        // DELETE api/<SessionController>/5
        [HttpDelete]
        public async Task<bool> Delete([FromBody] SessionDataDTO session)
        {
            return await _authService.ExpireAsync(session.Email, session.Token);
        }
    }
}
