﻿using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class CommentsController : ApiControllerBase
    {
        public CommentsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getByRecipeId/{id}")]
        public async Task<IActionResult> GetAllCommentsByRecipeId([FromRoute] int id)
        {
            var request = new GetAllCommentsByRecipeIdRequest() { Id = id };
            return await this.HandleRequest<GetAllCommentsByRecipeIdRequest, GetAllCommentsByRecipeIdResponse>(request);
        }

        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddComment([FromBody] AddCommentRequest request)
        {
            return await this.HandleRequest<AddCommentRequest, AddCommentResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteCommentById([FromRoute] int id)
        {
            var request = new DeleteCommentByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteCommentByIdRequest, DeleteCommentByIdResponse>(request);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateCommentById([FromRoute] int id, [FromBody] UpdateCommentByIdRequest request)
        {
            request.Id = id;
            return await this.HandleRequest<UpdateCommentByIdRequest, UpdateCommentByIdResponse>(request);
        }
    }
}