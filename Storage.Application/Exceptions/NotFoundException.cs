namespace Storage.Application.Exceptions
{
    public class NotFoundException(string message) : Exception(message); 

    public class AlreadyExistException(string message) : Exception(message);

    public class EmptyRequestException(string message) : Exception(message); 
}
