﻿using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Comments
{
    public class GetAllCommentsByRecipeIdRequest : IRequest<GetAllCommentsByRecipeIdResponse>
    {
        public int Id { get; set; }
    }
}
