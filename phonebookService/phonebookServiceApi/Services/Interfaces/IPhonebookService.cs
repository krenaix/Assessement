using System;
using System.Collections.Generic;
using phonebookServiceApi.services.dtos;

namespace phonebookServiceApi.services.interfaces
{
    public interface IPhonebookService
    {
        PhoneEntriesDTO SearchPhonebook(string searchName, string searchNumber, int phonebookId);
    }
}
