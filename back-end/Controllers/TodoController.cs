
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;
        public  TodoController(ITodoService todoService)
        {
            _todoService=todoService;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetTodoItemDto>>>>Get(){
            return Ok(await _todoService.GetAllTodoItems());
        }
        
        [HttpGet("{name}")]
        public async Task<ActionResult<ServiceResponse<GetTodoItemDto>>> GetSingle(string name){
            var response=await _todoService.GetTodoItem(name);
            if(response is null){
                return NotFound(response);
            }
            return Ok(response);    
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetTodoItemDto>>>> AddTodoItem(AddTodoItemDto item){
            return Ok( await _todoService.AddTodoItem(item));
        }
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<GetTodoItemDto>>>> UpdateTodoItem(UpdateTodoItemDto item){
            var response=await _todoService.UpdateTodoItem(item);
            if(response.Data is null){
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<GetTodoItemDto>>> DeleteTodoItem(int id){
            var response=await _todoService.DeleteTodoItem(id); 
            if(response.Data is null){
                    return NotFound(response);
            }
            return Ok(response);
        }
    }
}
