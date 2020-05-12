using System;
using System.Collections.Generic;
using phonebookServiceApi.Repository.Model;
using phonebookServiceApi.Repository.NoneDBModels;

namespace phonebookServiceApi.Repository.Interfaces
{
    public interface IPhonebookRepository
    {
        PhoneEntries SearchPhonebook(string searchName, string searchNumber, int phonebookId);
    }
}
