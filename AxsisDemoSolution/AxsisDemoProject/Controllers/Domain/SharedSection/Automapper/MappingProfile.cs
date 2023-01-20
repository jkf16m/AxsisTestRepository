using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;

namespace AxsisDemoProject.Controllers.Domain.SharedSection.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
