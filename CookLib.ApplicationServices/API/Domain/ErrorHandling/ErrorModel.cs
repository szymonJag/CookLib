﻿namespace CookLib.ApplicationServices.API.Domain.ErrorHandling
{
    public class ErrorModel
    {
        public ErrorModel(string error)
        {
            Error = error;
        }

        public string Error { get; }
    }
}
