using System.Collections.Generic;
using System.Linq;
using phonebookServiceApi.services.interfaces;
using phonebookServiceApi.services.dtos;
using Microsoft.Extensions.Logging;
using System;
using phonebookServiceApi.Repository.Interfaces;

namespace phonebookServiceApi.services.decorators.authenticationDecorators
{
    public class AuthValidationDecorator : IAuthenticationService
    {
        private readonly ILogger<AuthValidationDecorator> _logger;
        private readonly IAuthenticationRepository _authRepository;
        private readonly IAuthenticationService _authService;
        public AuthValidationDecorator(IAuthenticationRepository authRepository,ILogger<AuthValidationDecorator> logger, IAuthenticationService authService)
        {
            _authService = authService;
            _logger = logger;
            _authRepository = authRepository;
        }

        public UserDto Authenticate(string phoneNumber, string password)
        {
            return _authService.Authenticate(phoneNumber, password);
        }

        public bool Register(string phoneNumber, string password, string name)
        {
            if(_authRepository.CheckUserExists(phoneNumber)) {
                throw new Exception("the specified phone number has already been registered");
            } 
            else 
            {
                return _authService.Register(phoneNumber, password, name);
            }
        }
    }
}
