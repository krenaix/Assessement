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

        [HttpPut("search")]
        public IActionResult Search(SearchCriteriaDTO searchCriteria, int phonebookId)
        {
             _logger.LogInformation($"[Phonebook Controller] Received search request, phonebookId:{phonebookId}");
            var PhoneEntries = _phoneService.SearchPhonebook(searchCriteria.EntryName, searchCriteria.EntryNumber, phonebookId);

            return Ok(PhoneEntries);
        }
    }
}
