using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ApiControllerBase
    {
        public UsersController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getByUsername/")]
        public async Task<IActionResult> GetUsers([FromQuery] GetUsersRequest request)
        {
            return await this.HandleRequest<GetUsersRequest, GetUsersResponse>(request);
        }
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            var request = new GetUserByIdRequest() { Id = id };
            return await this.HandleRequest<GetUserByIdRequest, GetUserByIdResponse>(request);

        }
        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddUser([FromBody] AddUserRequest request)
        {
            return await this.HandleRequest<AddUserRequest, AddUserResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteUserById([FromRoute] int id)
        {
            var request = new DeleteUserByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteUserByIdRequest, DeleteUserByIdResponse>(request);
        }
    }
}