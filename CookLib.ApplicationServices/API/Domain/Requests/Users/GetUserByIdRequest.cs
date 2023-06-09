﻿using CookLib.ApplicationServices.API.Domain.Responses.User;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.User
{
    public class GetUserByIdRequest : RequestBase, IRequest<GetUserByIdResponse>
    {
        public int Id { get; set; }
    }
}
