﻿namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class IngredientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Kcal { get; set; }
        public IngredientTypeDTO Type { get; set; }

    }

}


