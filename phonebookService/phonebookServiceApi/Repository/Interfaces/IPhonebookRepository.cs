using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using phonebookServiceApi.Repository.Model;
using phonebookServiceApi.Repository.NoneDBModels;

namespace phonebookServiceApi.Repository.Interfaces
{
    public interface IPhonebookRepository
    {
        PhoneEntries SearchPhonebook(string searchName, string searchNumber, int phonebookId);
        PhoneEntries RemoveContact(string searchName, string searchNumber, int phonebookId, int entryId);

        PhoneEntries GetPhoneEntries(int userId);

        bool CreateContact(Entry newEntry, int phonebookId);
        bool EditContact(Entry existingEntry);
    }
}
