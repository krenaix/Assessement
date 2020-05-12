using System;
using System.Collections.Generic;

namespace phonebookServiceApi.Repository.Model
{
    public partial class Entry
    {
        public Entry()
        {
             PhoneBookEntries = new HashSet<PhoneBookEntries>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<PhoneBookEntries> PhoneBookEntries { get; set; }
    }
}
