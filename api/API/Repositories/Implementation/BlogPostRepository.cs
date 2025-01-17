using API.Data;
using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Implementation
{
    public class BlogPostRepository(ApiContext context) : IBlogPostRepository
    {
        private readonly ApiContext _context = context;
        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            _context.BlogPosts.Add(blogPost);
            await _context.SaveChangesAsync();
            return blogPost;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(c => c.Id == id);
            if (blogPost != null)
            {
                _context.BlogPosts.Remove(blogPost);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await _context.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetByIdAsync(Guid id)
        {
            return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(c => c.Id == id);

        }

        public async Task<BlogPost?> GetByUrlHandle(string urlHandle)
        {
            return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(c => c.UrlHandle == urlHandle);

        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var originalBlogPost = await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(c => c.Id == blogPost.Id);
            if (originalBlogPost != null)
            {
                //originalBlogPost.Name = blogPost.Name;
                //originalBlogPost.UrlHandle = blogPost.UrlHandle;
                _context.Entry(originalBlogPost).CurrentValues.SetValues(blogPost);
                originalBlogPost.Categories = blogPost.Categories;
                await _context.SaveChangesAsync();

                return blogPost;
            }
            return null;
        }
    }
}
