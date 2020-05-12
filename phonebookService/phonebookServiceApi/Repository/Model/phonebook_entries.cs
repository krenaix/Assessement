using System;
using System.Collections.Generic;

namespace phonebookServiceApi.Repository.Model
{
    public partial class PhoneBookEntries
    {
        public int Phonebook_id { get; set; }
        public int entry_id { get; set; }

        public virtual Phonebook Phonebook { get; set; }
        public virtual Entry Entry { get; set; }
    }
}
