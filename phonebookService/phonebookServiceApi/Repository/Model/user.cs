using System;
using System.Collections.Generic;

namespace phonebookServiceApi.Repository.Model
{
    public partial class User
    {
        public User()
        {
            Phonebook = new HashSet<Phonebook>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string CreatedDate { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Phonebook> Phonebook { get; set; }
    }
}
