using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Requests.Users;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.ApplicationServices.API.Domain.Responses.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ApiControllerBase
    {
        public UsersController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getUsersByUsername/")]
        public async Task<IActionResult> GetUsers([FromQuery] GetUsersRequest request)
        {
            return await this.HandleRequest<GetUsersRequest, GetUsersResponse>(request);
        }

        [HttpGet]
        [Route("getUserByUsername/")]
        public async Task<IActionResult> GetUser([FromQuery] GetUserRequest request)
        {
            return await this.HandleRequest<GetUserRequest, GetUserResponse>(request);
        }

        [Authorize]
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            var request = new GetUserByIdRequest() { Id = id };
            return await this.HandleRequest<GetUserByIdRequest, GetUserByIdResponse>(request);

        }
        [AllowAnonymous]
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

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateUserById([FromRoute] int id, [FromBody] UpdateUserByIdRequest request)
        {
            request.Id = id;
            return await this.HandleRequest<UpdateUserByIdRequest, UpdateUserByIdResponse>(request);
        }
    }

}