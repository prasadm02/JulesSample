using AuthService.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace AuthService.Api.Services
{
    public class UserService
    {
        private static List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "testuser1", PasswordHash = "password123" },
            new User { Id = 2, Username = "testuser2", PasswordHash = "securepassword" },
            new User { Id = 3, Username = "anotheruser", PasswordHash = "mysecret" }
        };

        public User? ValidateUser(string username, string password)
        {
            var user = _users.FirstOrDefault(u => u.Username == username);

            if (user != null && user.PasswordHash == password)
            {
                return user;
            }
            return null;
        }
    }
}
