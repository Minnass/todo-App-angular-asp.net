namespace TodoApi.DTO
{
    public class GetTodoItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public  string? Description { get; set; }
        public string? Action { get; set; }
    }
}