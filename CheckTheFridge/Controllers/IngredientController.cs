using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CheckTheFridge.DBInterface;
using CheckTheFridge.Models;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Query;
using Azure.Core;

namespace CheckTheFridge.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class IngredientController : ControllerBase
    {
        private readonly DataContext _context;
        public IngredientController(DataContext context) 
        {
            _context = context;
        }
        //
        //GETS
        //
        [HttpGet("GetIngredients")]
        public async Task<ActionResult<List<Ingredient>>> GetIngredients()
        {
             return Ok(await _context.Ingredients.ToListAsync());
        }

        [HttpGet("{Id}/GetIngredient")]
        public async Task<ActionResult<Ingredient>> GetIngredient(int Id)
        {
            var ingredient = await _context.Ingredients.FindAsync(Id);

            if (ingredient == null)
            {
                return BadRequest("Ingredient doesnt Exist");
            }
          
            return Ok(ingredient);
        }
        /*
        [HttpGet("GetAPIIngredients")]
        public async Task<ActionResult<List<Ingredient>>> GetAPIIngredients()
        {
            var ingredientList = 
            return Ok(await _context.Ingredients.ToListAsync());
        }
        */
        //
        //POSTS
        //
        [HttpPost("Add/{Name}/{Description}/{Quantity}/{MealDbId}/{UserId}")]
        public async Task<IActionResult> Add(string Name, string Description, int Quantity, int MealDbId, int UserId)
        {
            var user = await _context.ApplicationUsers.FindAsync(UserId);

            if (user == null)
            {
                return BadRequest("User DNE");
            }
            if (user.FridgeIngredients != null)
            {
                var match = user.FridgeIngredients.Select(f => f.MealDbId == MealDbId);
                if (match == null)
                {
                    return BadRequest("User already has Ingredient");
                }

            }
                                                     
            var ingredient = new Ingredient
            {
                Name = Name,
                Description = Description,
                Quantity = Quantity,
                MealDbId = MealDbId,
                AppUserId = UserId,
                AppUser = user
            };

            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();
            return Ok("Ingredient created!");
        }
        //Edit ingredient
        [HttpPut("Edit/{Id}")]
        public async Task<IActionResult> Edit(int Id, string ? Name, string ? Description, int Quantity = 0)
        {
            var ingredient = await _context.Ingredients.FindAsync(Id);
            if (ingredient == null)
            {
                return BadRequest("Could not find ingredient");
            }
            if (Name != null)
                ingredient.Name = Name;
            if (Description != null)
                ingredient.Description = Description;
            if (Quantity != 0)
                ingredient.Quantity = Quantity;

            await _context.SaveChangesAsync();
            return Ok("Ingredient edited!");
        }

        //
        //DELETES
        //
        [HttpDelete]
        public async Task<IActionResult> Delete(int Id)
        {
            var ingredient = await _context.Ingredients.FindAsync(Id);

            if (ingredient == null)
            {
                return BadRequest("Ingredient doesn't Exist");
            }

            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();
            return Ok("Ingredient deleted!");
        }
    }
}
