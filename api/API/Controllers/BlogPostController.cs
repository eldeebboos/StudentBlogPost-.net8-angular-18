using API.DTO;
using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController(ICategoryRepository categoryRepository
        , IBlogPostRepository blogPostRepository) : ControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateBlogPost([FromBody] BlogPostDto request)

        {
            var blogPost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = []
            };

            foreach (var categoryGuid in request.CategoriesGuids)
            {
                var existingCategory = await categoryRepository.GetByIdAsync(categoryGuid);

                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            await blogPostRepository.CreateAsync(blogPost);

            var response = new BlogPostDto
            {
                Author = blogPost.Author,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                ShortDescription = blogPost.ShortDescription,
                Title = blogPost.Title,
                UrlHandle = blogPost.UrlHandle,
                Id = blogPost.Id,
                CategoriesGuids = blogPost.Categories.Select(x => x.Id).ToArray()
            };


            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogPosts = await blogPostRepository.GetAllAsync();
            var response = new List<BlogPostDto>();

            foreach (var blogPost in blogPosts)
            {
                response.Add(

                    new BlogPostDto
                    {
                        Author = blogPost.Author,
                        Content = blogPost.Content,
                        FeaturedImageUrl = blogPost.FeaturedImageUrl,
                        IsVisible = blogPost.IsVisible,
                        PublishedDate = blogPost.PublishedDate,
                        ShortDescription = blogPost.ShortDescription,
                        Title = blogPost.Title,
                        UrlHandle = blogPost.UrlHandle,
                        Id = blogPost.Id,
                        CategoriesGuids = blogPost.Categories.Select(x => x.Id).ToArray(),
                        Categories = blogPost.Categories.Select(x => new CategoryDto { Id = x.Id, Name = x.Name, UrlHandle = x.UrlHandle }).ToArray()
                    }
                    );
            }

            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var blogPost = await blogPostRepository.GetByIdAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }
            var response = new BlogPostDto
            {
                Author = blogPost.Author,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                ShortDescription = blogPost.ShortDescription,
                Title = blogPost.Title,
                UrlHandle = blogPost.UrlHandle,
                Id = blogPost.Id,
                CategoriesGuids = blogPost.Categories.Select(x => x.Id).ToArray(),
                Categories = blogPost.Categories.Select(x => new CategoryDto { Id = x.Id, Name = x.Name, UrlHandle = x.UrlHandle }).ToArray()

            };

            return Ok(response);
        }

        [HttpGet("{urlHandle}")]
        public async Task<IActionResult> GetByUrlHandle([FromRoute] string urlHandle)
        {
            var blogPost = await blogPostRepository.GetByUrlHandle(urlHandle);
            if (blogPost == null)
            {
                return NotFound();
            }
            var response = new BlogPostDto
            {
                Author = blogPost.Author,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                ShortDescription = blogPost.ShortDescription,
                Title = blogPost.Title,
                UrlHandle = blogPost.UrlHandle,
                Id = blogPost.Id,
                CategoriesGuids = blogPost.Categories.Select(x => x.Id).ToArray(),
                Categories = blogPost.Categories.Select(x => new CategoryDto { Id = x.Id, Name = x.Name, UrlHandle = x.UrlHandle }).ToArray()

            };

            return Ok(response);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var obj = await blogPostRepository.DeleteAsync(id);
            if (!obj)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Put([FromRoute] Guid id, [FromBody] BlogPostDto request)
        {
            var blogPost = new BlogPost
            {
                Id = id,
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = []
            };

            foreach (var categoryGuid in request.CategoriesGuids)
            {
                var existingCategory = await categoryRepository.GetByIdAsync(categoryGuid);

                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            var original = await blogPostRepository.UpdateAsync(blogPost);



            if (original == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
