using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.dtos;
using Microsoft.Extensions.Logging;
using System;
using phonebookServiceApi.Repository.Interfaces;

namespace phonebookServiceApi.services.decorators.phonebookDecorators
{
    public class PhoneExceptionDecorator : IPhonebookService
    {
        private readonly ILogger<PhoneValidationDecorator> _logger;
        private readonly IPhonebookRepository _phoneRepository;
        private readonly IPhonebookService _phoneService;
        public PhoneExceptionDecorator(IPhonebookRepository phoneRepository, ILogger<PhoneValidationDecorator> logger, IPhonebookService phoneService)
        {
            _phoneService = phoneService;
            _logger = logger;
            _phoneRepository = phoneRepository;
        }

        public PhoneEntriesDTO SearchPhonebook(string searchName, string searchNumber, int phonebookId)
        {
            try
            {
                return _phoneService.SearchPhonebook(searchName, searchNumber, phonebookId);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Exception occurred during search. phonebookId: {phonebookId}, stackTrace: {ex.ToString()}");

                throw ex;
            }
        }
    }
}
