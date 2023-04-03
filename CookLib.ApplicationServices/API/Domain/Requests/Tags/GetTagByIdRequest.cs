using CookLib.ApplicationServices.API.Domain.Responses.Tags;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Tags
{
    public class GetTagByIdRequest : IRequest<GetTagByIdResponse>
    {
        public int Id { get; set; }
    }
}
