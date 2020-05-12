using System;
using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.Repository.Model;
using Microsoft.EntityFrameworkCore;
using phonebookServiceApi.Repository.Interfaces;
using phonebookServiceApi.services.helpers;
using Microsoft.Extensions.Options;
using phonebookServiceApi.Repository.NoneDBModels;

namespace phonebookServiceApi.Repository.Data
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly PhonebookContext _phonebookContext;


        private string phonebook_text =  "'s phonebook";

        public AuthenticationRepository(PhonebookContext phonebookContext)
        {
            _phonebookContext = phonebookContext;
        }

        public bool CheckUserExists(string phoneNumber)
        {
            return _phonebookContext.User.Where((user) => user.Username == phoneNumber).Any();
        }

        public int Register(string phoneNumber, string password, string name)
        {
            try
            {
                var userObj = new User()
                {
                    CreatedDate = DateTime.Now.Date.ToString(),
                    Username = phoneNumber,
                    Password = password,
                    Name = name
                };

                _phonebookContext.User.Add(userObj);
                _phonebookContext.SaveChanges();

                var phonebook = new Phonebook()
                {
                    Name = $"{name}{phonebook_text}",
                    UserId = userObj.Id
                };

                _phonebookContext.Phonebook.Add(phonebook);
                _phonebookContext.SaveChanges();

                return userObj.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }


        }

        public User GetUserByPhoneNumber(string phoneNumber)
        {
            return _phonebookContext.User.Where(user => user.Username == phoneNumber).FirstOrDefault();
        }

        public User Login (string phoneNumber)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;
            var user = _phonebookContext.User.Where(user => user.Username == phoneNumber).FirstOrDefault();

            return user;
        }
    }
}
