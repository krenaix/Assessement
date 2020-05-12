using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.dtos;
using Microsoft.Extensions.Logging;
using System;
using phonebookServiceApi.Repository.Interfaces;

namespace phonebookServiceApi.services.decorators.authenticationDecorators
{
    public class AuthExceptionDecorator : IAuthenticationService
    {
        private readonly ILogger<AuthValidationDecorator> _logger;
        private readonly IAuthenticationService _authService;
        public AuthExceptionDecorator(ILogger<AuthValidationDecorator> logger, IAuthenticationService authService)
        {
            _authService = authService;
            _logger = logger;
        }

        public UserDto Authenticate(string phoneNumber, string password)
        {
            try
            {
                return _authService.Authenticate(phoneNumber, password);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception occurred during authentication. stackTrace: {ex.ToString()}");

                throw ex;
            }
        }

        public bool Register(string username, string password, string name)
        {
            try
            {
                return _authService.Register(username, password, name);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Exception occurred during Registration. stackTrace: {ex.ToString()}");
                throw ex;
            }
            
        }
    }
}
