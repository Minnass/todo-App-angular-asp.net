
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using TodoApi.Models;

namespace TodoApi.Services.TodoService
{
    public class TodoService : ITodoService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;
        public TodoService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _dataContext = context;
        }

        public async Task<ServiceResponse<List<GetTodoItemDto>>> GetAllTodoItems()
        {
            var serviceResponse = new ServiceResponse<List<GetTodoItemDto>>();
            var dbTodoList = await _dataContext.Todolist.ToListAsync();
            serviceResponse.Data = dbTodoList.Select(c => _mapper.Map<GetTodoItemDto>(c)).ToList();
            return serviceResponse;
        }
        public async Task<ServiceResponse<List<GetTodoItemDto>>> AddTodoItem(AddTodoItemDto item)
        {
            var serviceResponse = new ServiceResponse<List<GetTodoItemDto>>();
            try
            {
                var todoItem = _dataContext.Todolist.FirstOrDefault(c => c.Name == item.Name && c.Description == item.Description);
                if (todoItem is not null)
                {
                    throw new Exception("Task already Exixst");
                }
                var tmp = _mapper.Map<TodoItem>(item);
                _dataContext.Todolist.Add(tmp);
                _dataContext.SaveChanges();
                serviceResponse.Message = "Add successfully";
                serviceResponse.Data = (await _dataContext.Todolist.ToListAsync()).Select(c => _mapper.Map<GetTodoItemDto>(c)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }
        public async Task<ServiceResponse<List<GetTodoItemDto>>> GetTodoItem(string name)
        {
            var serviceResponse = new ServiceResponse<List<GetTodoItemDto>>();
            try
            {
                var todoItems = _dataContext.Todolist.Where(c => c.Name.Contains(name));
                if (todoItems is null || todoItems.Count() == 0)
                {
                    throw new Exception("Task not found");
                }
                serviceResponse.Message = $"{todoItems.Count()} has found";
                serviceResponse.Data = todoItems.Select(c => _mapper.Map<GetTodoItemDto>(c)).ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetTodoItemDto>> UpdateTodoItem(UpdateTodoItemDto item)
        {

            var serviceResponse = new ServiceResponse<GetTodoItemDto>();
            try
            {
                var todoItem = _dataContext.Todolist.FirstOrDefault(c => c.Id == item.Id);
                if (todoItem is null)
                {
                    throw new Exception($"Task not found");
                }
                todoItem.Name = item.Name;
                todoItem.Description = item.Description;
                _dataContext.SaveChanges();
                serviceResponse.Data = _mapper.Map<GetTodoItemDto>(todoItem);
                serviceResponse.Message = "Update successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetTodoItemDto>>> DeleteTodoItem(int id)
        {
            Debug.WriteLine(id);
            var serviceResponse = new ServiceResponse<List<GetTodoItemDto>>();
            try
            {
                var todoItem = _dataContext.Todolist.FirstOrDefault(c => c.Id == id);
                if (todoItem is null)
                {
                    throw new Exception($"Item has id'{id}' not found");
                }
                _dataContext.Todolist.Remove(todoItem);

                _dataContext.SaveChanges();
                serviceResponse.Message = "Delete successfully";
                serviceResponse.Data = (await _dataContext.Todolist.ToListAsync()).Select(c => _mapper.Map<GetTodoItemDto>(c)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}
