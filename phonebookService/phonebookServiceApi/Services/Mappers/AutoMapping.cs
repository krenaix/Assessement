using AutoMapper;
using phonebookServiceApi.Repository.Model;
using phonebookServiceApi.Repository.NoneDBModels;
using phonebookServiceApi.services.dtos;

public class AutoMapping: Profile
{
    public AutoMapping() 
    {
        CreateMap<User, UserDto>();
        CreateMap<PhoneEntries, PhoneEntriesDTO>();
        CreateMap<Entry, EntryDTO>();
        CreateMap<EntryDTO, Entry>();
    }
}