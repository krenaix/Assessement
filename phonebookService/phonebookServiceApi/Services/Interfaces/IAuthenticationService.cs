using System;
using System.Collections.Generic;
using phonebookServiceApi.services.dtos;

namespace phonebookServiceApi.services.interfaces
{
    public interface IAuthenticationService
    {
        (UserDto user, PhoneEntriesDTO phoneWithEntries) Authenticate(string phoneNumber, string password);
        bool Register(string phoneNumber, string password, string name);
    }
}
