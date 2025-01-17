
namespace API.Repositories.Interface
{
    public interface IRepository<T>
    {
        Task<T> CreateAsync(T obj);
        Task<T?> UpdateAsync(T obj);
        Task<bool> DeleteAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(Guid id);
    }
}
