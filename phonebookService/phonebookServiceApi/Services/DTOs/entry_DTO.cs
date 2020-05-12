using System;
using System.Collections.Generic;

namespace phonebookServiceApi.services.dtos
{
    public class EntryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
    }
}
