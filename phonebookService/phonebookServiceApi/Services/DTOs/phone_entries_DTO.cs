using System;
using System.Collections.Generic;

namespace phonebookServiceApi.services.dtos
{
    public class PhoneEntriesDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<EntryDTO> Entries { get; set; }
    }
}
