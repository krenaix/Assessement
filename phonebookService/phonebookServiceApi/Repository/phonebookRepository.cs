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
    public class PhonebookRepository : IPhonebookRepository
    {
        private readonly PhonebookContext _phonebookContext;
        private readonly AppSettings _appSettings;

        public PhonebookRepository(PhonebookContext phonebookContext, IOptions<AppSettings> appSettings)
        {
            _phonebookContext = phonebookContext;
            _appSettings = appSettings.Value;
        }

        public PhoneEntries SearchPhonebook(string searchName, string searchNumber, int phonebookId)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;

            var phonebook = _phonebookContext.Phonebook.Where(ph => ph.Id == phonebookId).FirstOrDefault();

            var phoneBookEntries = _phonebookContext.PhoneBookEntries.Where(pe => pe.Phonebook_id == phonebookId).Include(p => p.Entry)
            .Select(pe => pe.Entry).ToList().Where(e => e.Name.ToLower().Equals(searchName.ToLower()) || e.PhoneNumber.Equals(searchNumber));

            var phoneEntries = new PhoneEntries
            {
                Id = phonebookId,
                Entries = phoneBookEntries,
                Name = phonebook.Name
            };

            return phoneEntries;
        }
    }
}
