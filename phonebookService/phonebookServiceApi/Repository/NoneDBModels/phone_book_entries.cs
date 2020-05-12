using System;
using System.Collections.Generic;
using phonebookServiceApi.Repository.Model;

namespace phonebookServiceApi.Repository.NoneDBModels
{
    public class PhoneEntries
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Entry> Entries { get; set; }
    }
}
