using API.Data;
using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Implementation
{
    public class BlogImageRepository(IWebHostEnvironment hostEnvironment
                , IHttpContextAccessor httpContextAccessor, ApiContext context) : IBlogImageRepository
    {
        private readonly IWebHostEnvironment hostEnvironment = hostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;
        private readonly ApiContext _context = context;



        public async Task<IEnumerable<BlogImage>> GetAll()
        {
            var result = await _context.BlogImages.ToListAsync();

            return result;
        }

        public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
        {
            //Upload Image to API/Images
            var localPath = Path.Combine(hostEnvironment.ContentRootPath
                , "Images", $"{blogImage.FileName}{blogImage.FileExtention}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            //update Database
            var httpContext = httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpContext.Scheme}://{httpContext.Host}{httpContext.PathBase}/Images/{blogImage.FileName}{blogImage.FileExtention}";

            blogImage.Url = urlPath;


            await _context.BlogImages.AddAsync(blogImage);
            await _context.SaveChangesAsync();

            return blogImage;
        }
    }
}
