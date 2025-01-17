using API.DTO;
using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(ICategoryRepository categoryRepository) : ControllerBase
    {

        // GET: api/Categories
        [HttpGet]

        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await categoryRepository.GetAllAsync());
        }

        // GET: api/Categories/5
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCategory([FromRoute] Guid id)
        {
            var category = await categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> PutCategory([FromRoute] Guid id, [FromBody] CategoryDto categoryDto)
        {
            //if (id != categoryDto.Id)
            //{
            //    return BadRequest();
            //}

            var category = new Category { Id = id, Name = categoryDto.Name, UrlHandle = categoryDto.UrlHandle };

            category = await categoryRepository.UpdateAsync(category);


            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory(CategoryDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };
            return Ok(await categoryRepository.CreateAsync(category));

        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var deleted = await categoryRepository.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }



            return Ok();
        }


    }
}
