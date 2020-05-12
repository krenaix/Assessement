using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.dtos;

namespace phonebookServiceApi.Controllers
{
    [ApiController]
    [Route("/api/phonebook")]
    public class PhonebookController : ControllerBase
    {
        private readonly ILogger<PhonebookController> _logger;
        private readonly IPhonebookService _phoneService;

        public PhonebookController(ILogger<PhonebookController> logger, IPhonebookService phoneService)
        {
            _logger = logger;
            _phoneService = phoneService;
        }

        [HttpPost("search")]
        public IActionResult Search(SearchCriteriaDTO searchCriteria, int phonebookId)
        {
             _logger.LogInformation($"[Phonebook Controller] Received search request, phonebookId:{phonebookId}");
            var PhoneEntries = _phoneService.SearchPhonebook(searchCriteria.EntryName, searchCriteria.EntryNumber, phonebookId);

            return Ok(PhoneEntries);
        }

        [HttpPut("remove")]
        public IActionResult Remove(SearchCriteriaDTO searchCriteria, int phonebookId, int entryId)
        {
             _logger.LogInformation($"[Phonebook Controller] Received search request, phonebookId:{phonebookId}");
            var PhoneEntries = _phoneService.RemoveContact(searchCriteria.EntryName, searchCriteria.EntryNumber, phonebookId, entryId);

            return Ok(PhoneEntries);
        }

        [HttpGet("contacts")]
        public IActionResult FetchContacts(int userId)
        {
             _logger.LogInformation($"[Phonebook Controller] Received Fetch Contacts request, userId:{userId}");
            var PhoneEntries = _phoneService.GetPhoneEntries(userId);

            return Ok(PhoneEntries);
        }

        [HttpPut("create")]
        public IActionResult Create(EntryDTO entry, int phonebookId)
        {
             _logger.LogInformation($"[Phonebook Controller] Received create contact request, phonebookId:{phonebookId}");
            var result = _phoneService.CreateContact(entry, phonebookId);

            return Ok(result);
        }

        [HttpPut("edit")]
        public IActionResult Edit(EntryDTO entry)
        {
             _logger.LogInformation($"[Phonebook Controller] Received edit contact request, entryId:{entry.Id}");
            var result = _phoneService.EditContact(entry);

            return Ok(result);
        }
    }
}
