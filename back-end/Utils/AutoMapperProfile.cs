namespace TodoApi.Utils
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TodoItem,GetTodoItemDto>();
            CreateMap<AddTodoItemDto,TodoItem>();
            CreateMap<UpdateTodoItemDto,TodoItem>();
        }
    }
}