using API.Models.Domain;

namespace API.Repositories.Interface
{
    public interface IBlogPostRepository : IRepository<BlogPost>
    {
        Task<BlogPost?> GetByUrlHandle(string urlHandle);
    }
}
