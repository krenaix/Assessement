using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.dtos;
using Microsoft.Extensions.Logging;
using System;
using phonebookServiceApi.Repository.Interfaces;

namespace phonebookServiceApi.services.decorators.phonebookDecorators
{
    public class PhoneValidationDecorator : IPhonebookService
    {
        private readonly ILogger<PhoneValidationDecorator> _logger;
        private readonly IPhonebookRepository _phoneRepository;
        private readonly IPhonebookService _phoneService;
        public PhoneValidationDecorator(IPhonebookRepository phoneRepository,ILogger<PhoneValidationDecorator> logger, IPhonebookService phoneService)
        {
            _phoneService = phoneService;
            _logger = logger;
            _phoneRepository = phoneRepository;
        }

        public PhoneEntriesDTO SearchPhonebook(string searchName, string searchNumber, int phonebookId)
        {
            return _phoneService.SearchPhonebook(searchName, searchNumber, phonebookId);
        }
    }
}
