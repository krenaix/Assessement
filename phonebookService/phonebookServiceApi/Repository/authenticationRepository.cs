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
        private readonly AppSettings _appSettings;


        private string phonebook_text =  "'s phonebook";

        public AuthenticationRepository(PhonebookContext phonebookContext, IOptions<AppSettings> appSettings)
        {
            _phonebookContext = phonebookContext;
            _appSettings = appSettings.Value;
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

        public (User, PhoneEntries) Login (string phoneNumber)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;
            var user = _phonebookContext.User.Where(user => user.Username == phoneNumber).FirstOrDefault();
            var phonebook = _phonebookContext.Phonebook.Where(ph => ph.UserId == user.Id).FirstOrDefault();

            var phoneBookEntries = _phonebookContext.PhoneBookEntries.Where(pe => pe.Phonebook_id == phonebook.Id).Include(p => p.Entry)
            .Select(pe => pe.Entry).ToList();

            var phoneEntries = new PhoneEntries
            {
                Id = phonebook.Id,
                Entries = phoneBookEntries,
                Name = phonebook.Name
            };

            return (user, phoneEntries);
        }
    }
}
