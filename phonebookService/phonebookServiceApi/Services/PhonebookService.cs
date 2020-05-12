using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Claims;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.helpers;
using phonebookServiceApi.Repository.Interfaces;
using phonebookServiceApi.services.dtos;
using AutoMapper;
using System.Threading.Tasks;
using phonebookServiceApi.Repository.Model;

namespace phonebookServiceApi.services
{
    public class PhonebookService : IPhonebookService
    {
        readonly IPhonebookRepository _phoneRepository;

        private readonly AppSettings _appSettings;

        private readonly IPasswordHasher _passwordHasher;
        private readonly IMapper _mapper;

        public PhonebookService(IPhonebookRepository phoneRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _phoneRepository = phoneRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public PhoneEntriesDTO SearchPhonebook(string searchName, string searchNumber, int phonebookId)
        {
            var phoneEntriedDto = _mapper.Map<PhoneEntriesDTO>(_phoneRepository.SearchPhonebook(searchName, searchNumber, phonebookId));

            return phoneEntriedDto;
        }

        public PhoneEntriesDTO RemoveContact(string searchName, string searchNumber, int phonebookId, int entryId)
        {
            var phoneEntriedDto = _mapper.Map<PhoneEntriesDTO>(_phoneRepository.RemoveContact(searchName, searchNumber, phonebookId, entryId));

            return phoneEntriedDto;
        }

        public PhoneEntriesDTO GetPhoneEntries(int userId)
        {
            var phoneEntriedDto = _mapper.Map<PhoneEntriesDTO>(_phoneRepository.GetPhoneEntries(userId));

            return phoneEntriedDto;
        }

        public bool CreateContact(EntryDTO newEntry, int phonebookId)
        {
            return _phoneRepository.CreateContact(_mapper.Map<Entry>(newEntry), phonebookId);
        }

        public bool EditContact(EntryDTO existingEntry)
        {
            return _phoneRepository.EditContact(_mapper.Map<Entry>(existingEntry));
        }
    }
}
