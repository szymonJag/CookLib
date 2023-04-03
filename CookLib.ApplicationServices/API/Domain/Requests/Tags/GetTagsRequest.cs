using CookLib.ApplicationServices.API.Domain.Responses.Tags;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Tags
{
    public class GetTagsRequest : IRequest<GetTagsResponse>
    {
        public string Name { get; set; }
    }
}
