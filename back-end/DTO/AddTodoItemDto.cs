namespace TodoApi.DTO
{
    public class AddTodoItemDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Action { get; set; }
    }
}