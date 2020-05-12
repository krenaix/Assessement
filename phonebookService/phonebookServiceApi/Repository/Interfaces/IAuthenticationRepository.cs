using System;
using System.Collections.Generic;
using phonebookServiceApi.Repository.Model;
using phonebookServiceApi.Repository.NoneDBModels;

namespace phonebookServiceApi.Repository.Interfaces
{
    public interface IAuthenticationRepository
    {
        int Register(string phoneNumber, string password, string name);
        bool CheckUserExists(string phoneNumber);
        User GetUserByPhoneNumber(string phoneNumber);

        User Login (string phoneNumber);
    }
}
