using API.Data;
using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Implementation
{
    public class CategoryRepository(ApiContext context) : ICategoryRepository
    {
        private readonly ApiContext _context = context;
        public async Task<Category> CreateAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

        }

        public async Task<Category?> UpdateAsync( Category category)
        {
            var originalCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id ==category.Id);
            if (originalCategory != null)
            {
                //originalCategory.Name = category.Name;
                //originalCategory.UrlHandle = category.UrlHandle;
                _context.Entry(originalCategory).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();

                return category;
            }
            return null;
        }
    }
}
