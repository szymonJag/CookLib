using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class PreparationStepsProfile : Profile
    {
        public PreparationStepsProfile()
        {
            CreateMap<PreparationStep, PreparationStepDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description));

            CreateMap<AddPreparationStepRequest, PreparationStep>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description));

            CreateMap<PreparationStepRequestDTO, PreparationStep>()
               .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
               .ForMember(x => x.Description, y => y.MapFrom(z => z.Description));

            CreateMap<UpdatePreparationStepByIdRequest, PreparationStep>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description))
                .ReverseMap();
        }
    }
}
