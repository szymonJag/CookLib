﻿namespace CookLib.ApplicationServices.Components.Helpers
{
    public class HelperMethods : IHelperMethods
    {
        public List<int> StringToIntList(string inputString, char separator)
        {
            return inputString.Split(separator)
                      .Select(s => int.TryParse(s, out int i) ? i : 0)
                      .Where(i => i != 0)
                      .ToList();
        }
    }
}