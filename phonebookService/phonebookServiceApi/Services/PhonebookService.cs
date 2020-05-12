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
    }
}
