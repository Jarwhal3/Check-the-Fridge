using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CheckTheFridge.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0;
        public int MealDbId { get; set; } = 0;
        public int AppUserId { get; set; } = 0;

        [JsonIgnore]
        public ApplicationUser ? AppUser { get; set; }
    }
}