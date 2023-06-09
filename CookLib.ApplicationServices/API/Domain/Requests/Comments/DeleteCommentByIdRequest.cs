﻿using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Comments
{
    public class DeleteCommentByIdRequest : RequestBase, IRequest<DeleteCommentByIdResponse>
    {
        public int Id { get; set; }
    }
}
