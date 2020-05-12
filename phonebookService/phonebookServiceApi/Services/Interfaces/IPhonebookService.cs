using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using phonebookServiceApi.services.dtos;

namespace phonebookServiceApi.services.interfaces
{
    public interface IPhonebookService
    {
        PhoneEntriesDTO SearchPhonebook(string searchName, string searchNumber, int phonebookId);

        PhoneEntriesDTO RemoveContact(string searchName, string searchNumber, int phonebookId, int entryId);

        PhoneEntriesDTO GetPhoneEntries(int userId);

        bool CreateContact(EntryDTO newEntry, int phonebookId);

        bool EditContact(EntryDTO existingEntry);
    }
}
