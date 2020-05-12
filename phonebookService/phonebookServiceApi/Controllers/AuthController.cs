using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using phonebookServiceApi.services.interfaces;

namespace phonebookServiceApi.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IAuthenticationService _authService;

        public AuthenticationController(ILogger<AuthenticationController> logger, IAuthenticationService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPut("authenticate")]
        public IActionResult Authenticate(string phoneNumber, string password)
        {
             _logger.LogInformation($"[Authentication Controller] Received Authenticate request, phoneNumber:{phoneNumber}");
            var userWithPhoneEntries = _authService.Authenticate(phoneNumber, password);

            if (userWithPhoneEntries.user == null)
                return BadRequest(new { message = "Phone number or password is incorrect" });

            dynamic user_and_phone_entries = new {
                user  = userWithPhoneEntries.user,
                phoneEntries = userWithPhoneEntries.phoneWithEntries
            };
            return Ok(user_and_phone_entries);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(string phoneNumber, string password, string name)
        {
             _logger.LogInformation($"[Register Controller] Received Register request, phoneNumber:{phoneNumber}");
            var user = _authService.Register(phoneNumber, password, name);

            return Ok(user);
        }
    }
}
