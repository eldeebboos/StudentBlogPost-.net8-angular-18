using API.Models.Domain;

namespace API.Repositories.Interface
{
    public interface IBlogImageRepository
    {
        Task<BlogImage> Upload(IFormFile file, BlogImage blogImage);
        Task<IEnumerable<BlogImage>> GetAll();
    }
}
