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
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred during search. phonebookId: {phonebookId}, stackTrace: {ex.ToString()}");

                throw ex;
            }
        }

        public PhoneEntriesDTO RemoveContact(string searchName, string searchNumber, int phonebookId, int entryId)
        {
            try
            {
                return _phoneService.RemoveContact(searchName, searchNumber, phonebookId, entryId);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred while removing a contact. phonebookId: {phonebookId}, stackTrace: {ex.ToString()}");

                throw ex;
            }
        }

        public PhoneEntriesDTO GetPhoneEntries(int userId)
        {
            try
            {
                return _phoneService.GetPhoneEntries(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred while fetching contacts. userId: {userId}, stackTrace: {ex.ToString()}");

                throw ex;
            }
        }

        public bool CreateContact(EntryDTO newEntry, int phonebookId)
        {
            try
            {
                return _phoneService.CreateContact(newEntry, phonebookId);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred while creating contact. phonebookId: {phonebookId}, stackTrace: {ex.ToString()}");

                return false;
            }
        }

        public bool EditContact(EntryDTO existingEntry)
        {
            try
            {
                return _phoneService.EditContact(existingEntry);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred while editing contact. entryId: {existingEntry.Id}, stackTrace: {ex.ToString()}");

                return false;
            }
        }
    }
}
