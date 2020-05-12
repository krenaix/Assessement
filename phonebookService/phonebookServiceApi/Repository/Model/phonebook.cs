using System;
using System.Collections.Generic;

namespace phonebookServiceApi.Repository.Model
{
    public partial class Phonebook
    {
        public Phonebook()
        {
            PhoneBookEntries = new HashSet<PhoneBookEntries>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }

        public virtual User user { get; set; }

        public virtual ICollection<PhoneBookEntries> PhoneBookEntries { get; set; }
    }
}
