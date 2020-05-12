
namespace phonebookServiceApi.services.helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string TokenExpirationTimeInHours { get; set; }

        public string Phonebook_ConnectionString { get; set; }
    }

}