using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class PreparationStepsProfile : Profile
    {
        public PreparationStepsProfile()
        {
            this.CreateMap<PreparationStep, PreparationStepDTO>()
                .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description));

            this.CreateMap<AddPreparationStepRequest, PreparationStep>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Step, y => y.MapFrom(z => z.Step))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description));
        }
    }
}
