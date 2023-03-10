using AutoMapper;
using AxsisDemoProject.Controllers.DataTransferObjects;
using AxsisDemoProject.Controllers.Domain.UserSection.Model;
using AxsisDemoProject.Controllers.Domain.UserSection.Service.Results;

namespace AxsisDemoProject.Controllers.Domain.SharedSection.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<UserDTO, User>();
            CreateMap<User, UserDTO>().ForMember(m=>m.Password, o => o.Ignore());
            CreateMap<AddingUserResultDTO, AddingUserResult>().ReverseMap();
            CreateMap<UpdatingUserResultDTO, UpdatingUserResult>().ReverseMap();
            CreateMap<UserUpdateDTO, User>()
                .ForMember(m => m.Email, o => o.MapFrom(n => n.NewEmail))
                .ForMember(m => m.Password, o => o.MapFrom(n => n.NewPassword));
        }
    }
}
