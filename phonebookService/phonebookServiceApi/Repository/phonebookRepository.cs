using System;
using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.Repository.Model;
using Microsoft.EntityFrameworkCore;
using phonebookServiceApi.Repository.Interfaces;
using phonebookServiceApi.services.helpers;
using Microsoft.Extensions.Options;
using phonebookServiceApi.Repository.NoneDBModels;
using System.Threading.Tasks;

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

        public PhoneEntries GetPhoneEntries(int userId)
        {
            var phonebook = _phonebookContext.Phonebook.Where(ph => ph.UserId == userId).FirstOrDefault();

            var phoneBookEntries = _phonebookContext.PhoneBookEntries.Where(pe => pe.Phonebook_id == phonebook.Id).Include(p => p.Entry)
            .Select(pe => pe.Entry).ToList();

            var phoneEntries = new PhoneEntries
            {
                Id = phonebook.Id,
                Entries = phoneBookEntries,
                Name = phonebook.Name
            };

            return phoneEntries;
        }

        public PhoneEntries SearchPhonebook(string searchName, string searchNumber, int phonebookId)
        {
            var searchNameVal = string.IsNullOrEmpty(searchName) ? string.Empty : searchName;
            var searchNumberVal = string.IsNullOrEmpty(searchNumber) ? string.Empty : searchNumber;
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;

            var phonebook = _phonebookContext.Phonebook.Where(ph => ph.Id == phonebookId).FirstOrDefault();

            var phoneBookEntries = _phonebookContext.Entries.FromSqlRaw($@"select e.* from entry e join phonebook_entries pe
                                    on e.Id = pe.entry_id 
                                     where pe.phonebook_id = {phonebookId} and 
                                    ('{searchNameVal}' = '' or name like '%{searchNameVal}%')
                                    and
                                    ('{searchNumberVal}' = '' or PhoneNumber like '%{searchNumberVal}%')").AsNoTracking().ToList();

            var phoneEntries = new PhoneEntries
            {
                Id = phonebookId,
                Entries = phoneBookEntries,
                Name = phonebook.Name
            };

            return phoneEntries;
        }

        public PhoneEntries RemoveContact(string searchName, string searchNumber, int phonebookId, int entryId)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;

            var phoneEntry = _phonebookContext.PhoneBookEntries.Where(pe => pe.entry_id == entryId && pe.Phonebook_id == phonebookId).FirstOrDefault();
            _phonebookContext.PhoneBookEntries.Remove(phoneEntry);

            var entry = _phonebookContext.Entries.Where(e => e.Id == entryId).FirstOrDefault();
            _phonebookContext.Remove(entry);

            _phonebookContext.SaveChanges();

            var phonebook = _phonebookContext.Phonebook.Where(ph => ph.Id == phonebookId).FirstOrDefault();

            IEnumerable<Entry> phoneBookEntries = null;

            if (!string.IsNullOrEmpty(searchName) || !string.IsNullOrEmpty(searchNumber))
            {
                phoneBookEntries = _phonebookContext.PhoneBookEntries.Where(pe => pe.Phonebook_id == phonebookId).Include(p => p.Entry)
                .Select(pe => pe.Entry).ToList().Where(e => e.Name.ToLower().Equals(searchName.ToLower()) || e.PhoneNumber.Equals(searchNumber));
            }
            else
            {
                phoneBookEntries = _phonebookContext.PhoneBookEntries.Where(pe => pe.Phonebook_id == phonebookId).Include(p => p.Entry)
                .Select(pe => pe.Entry).ToList();
            }

            var phoneEntries = new PhoneEntries
            {
                Id = phonebookId,
                Entries = phoneBookEntries,
                Name = phonebook.Name
            };

            return phoneEntries;
        }


        public bool CreateContact(Entry newEntry, int phonebookId)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;

            _phonebookContext.Entries.Add(newEntry);

            _phonebookContext.SaveChanges();

            var phonebookEntry = new PhoneBookEntries
            {
                entry_id = newEntry.Id,
                Phonebook_id = phonebookId
            };

            _phonebookContext.PhoneBookEntries.Add(phonebookEntry);
            _phonebookContext.SaveChangesAsync();

            return true;
        }

        public bool EditContact(Entry existingEntry)
        {
            _phonebookContext.ChangeTracker.LazyLoadingEnabled = false;

            var dbEntry = _phonebookContext.Entries.Where(en => en.Id == existingEntry.Id).FirstOrDefault();

            dbEntry.Name = existingEntry.Name;
            dbEntry.PhoneNumber = existingEntry.PhoneNumber;

            _phonebookContext.SaveChanges();

            return true;
        }
    }
}
