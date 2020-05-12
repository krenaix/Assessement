using System.Linq;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using phonebookServiceApi.Controllers;
using phonebookServiceApi.Repository.Data;
using phonebookServiceApi.Repository.Model;

namespace phonebookService.Tests
{
    [TestFixture]
    public class PhoneBookServiceTests
    {
        PhonebookRepository repo;
        AuthenticationRepository auth_repo;
        PhonebookContext dbContext;
        [SetUp]
        public void Setup()
        {
            SqliteCommand sqlite_cmd;
            SqliteConnection sqlite_conn = new SqliteConnection(@"Data Source=../../../database/phonebook.db");
            // open the connection:
            sqlite_conn.Open();

            // create a new SQL command:
            sqlite_cmd = sqlite_conn.CreateCommand();

            sqlite_cmd.CommandText = "DROP Table 'phonebook_entries'";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = "DROP Table 'entry'";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = "DROP Table 'phonebook'";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = "DROP Table 'user'";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE 'entry' (
                    'Id'  INTEGER PRIMARY KEY AUTOINCREMENT,
                    'Name'   TEXT NOT NULL,
                    'PhoneNumber'  TEXT NOT NULL
                    )";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE 'user' (
                        'Id'  INTEGER PRIMARY KEY AUTOINCREMENT,
                        'Username'  TEXT NOT NULL UNIQUE,
                        'Password'  TEXT NOT NULL,
                        'created_date' TEXT NOT NULL,
                        'Name'   TEXT NOT NULL
                        )";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE 'phonebook' (
                        'Id'  INTEGER PRIMARY KEY AUTOINCREMENT,
                        'Name'   TEXT NOT NULL,
                        'UserId' INTEGER NOT NULL,
                        FOREIGN KEY('UserId') REFERENCES 'user'('Id')
                        )";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE 'phonebook_entries' (
                        'phonebook_id' INTEGER NOT NULL,
                        'entry_id'  INTEGER NOT NULL,
                        FOREIGN KEY('phonebook_id') REFERENCES 'phonebook'('Id'),
                        PRIMARY KEY('phonebook_id','entry_id'),
                        FOREIGN KEY('entry_id') REFERENCES 'entry'('Id')
                        )";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_conn.Close();

            var optionsBuilder = new Microsoft.EntityFrameworkCore.DbContextOptionsBuilder<PhonebookContext>();
            optionsBuilder.UseSqlite("Data Source=../../../database/phonebook.db");
            dbContext = new PhonebookContext(optionsBuilder.Options);


            repo = new PhonebookRepository(dbContext);
            auth_repo = new AuthenticationRepository(dbContext);

            
        }

        private void Register()
        {
            var result = auth_repo.Register("0611354073", "testing_with_plain_password", "Ernesti Echevalier");
        }

        [Test]
        public void Given_UserIsNew_UserAttemptsToCreateAnAccount()
        {
            var result = auth_repo.Register("+27746477427", "testing_with_plain_password", "Natsu");

            Assert.Positive(result);
        }

        [Test]
        public void Given_UserIsAuthenticated_UserAttemptsToCreateContact()
        {
            Register();
            var entry = new Entry
            {
                Name = "Rimuru Tempest",
                PhoneNumber = "123456789"
            };
            var result = repo.CreateContact(entry, 1);

            Assert.IsTrue(result);
        }

        [Test]
        public void Given_UserIsAuthenticated_UserAttemptsToRemoveAContact()
        {
            Register();
            var entry = new Entry
            {
                Name = "Rimuru Tempest",
                PhoneNumber = "123456789"
            };
            var result = repo.CreateContact(entry, 1);
            var phoneEntries = repo.GetPhoneEntries(1);

            var entryetst = phoneEntries.Entries.ToList().FirstOrDefault();
            var remove_result = repo.RemoveContact("", "", 1, entryetst.Id);

            Assert.IsNotNull(remove_result);
        }

        [Test]
        public void Given_UserIsAuthenticated_UserAttemptsToFetchListOfContacts()
        {
            Register();
            var entry = new Entry
            {
                Name = "Rimuru Tempest",
                PhoneNumber = "123456789"
            };
            var result = repo.CreateContact(entry, 1);

            var phoneEntries = repo.GetPhoneEntries(1);

            Assert.IsNotNull(phoneEntries);
            Assert.IsNotEmpty(phoneEntries.Entries);
        }

        [Test]
        public void Given_UserIsAuthenticated_UserAttemptsToEditAContact()
        {
            Register();
            var entry = new Entry
            {
                Name = "Rimuru Tempest",
                PhoneNumber = "123456789"
            };
            var result = repo.CreateContact(entry, 1);

            var phoneEntries = repo.GetPhoneEntries(1);
            var entryetst = phoneEntries.Entries.ToList()[0];

            entryetst.Name = "Son Goku"; // change this to check  changes in db
            var edit_result = repo.EditContact(entryetst);

            Assert.IsTrue(edit_result);
        }

        [Test]
        public void Given_UserIsAuthenticated_UserAttemptsToSearchAContact()
        {
            Register();
            var entry = new Entry
            {
                Name = "Rimuru Tempest",
                PhoneNumber = "123456789"
            };
            var result = repo.CreateContact(entry, 1);

            var search_result = repo.SearchPhonebook("rimuru", "", 1);

            Assert.IsNotNull(search_result);
            Assert.IsNotEmpty(search_result.Entries);
        }
    }
}