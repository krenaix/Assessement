using System;
using System.Collections.Generic;

namespace phonebookServiceApi.services.dtos
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
    }
}
