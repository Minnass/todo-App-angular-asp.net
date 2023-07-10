namespace TodoApi.Services.TodoService
{
    public interface ITodoService
    {
        Task<ServiceResponse<List<GetTodoItemDto>>> GetAllTodoItems();

        Task<ServiceResponse<List<GetTodoItemDto>>> GetTodoItem(string name);
        Task<ServiceResponse<List<GetTodoItemDto>>> AddTodoItem(AddTodoItemDto item);  
        Task<ServiceResponse<GetTodoItemDto>> UpdateTodoItem(UpdateTodoItemDto item);
        Task<ServiceResponse<List<GetTodoItemDto>>>DeleteTodoItem(int id);
    }
}
