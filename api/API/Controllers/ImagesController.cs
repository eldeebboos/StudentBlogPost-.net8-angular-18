using API.Models.Domain;
using API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController(IBlogImageRepository blogImageRepository) : ControllerBase
    {
        private readonly IBlogImageRepository blogImageRepository = blogImageRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var all = await blogImageRepository.GetAll();
            return Ok(all);
        }


        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file
                , [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);
            if (ModelState.IsValid)
            {
                var blogImage = new BlogImage
                {
                    FileName = fileName,
                    Title = title,
                    FileExtention = Path.GetExtension(file.FileName).ToLower(),
                    DateCreated = DateTime.Now,

                };
                blogImage = await blogImageRepository.Upload(file, blogImage);
                return Ok(blogImage);

            }
            return BadRequest(ModelState);
        }
        private void ValidateFileUpload(IFormFile file)
        {
            var allowdFileExtentions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowdFileExtentions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");

            }
            if (file.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size more than 10MB");

            }

        }
    }
}
