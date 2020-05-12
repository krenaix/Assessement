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
    public class AuthenticationService : IAuthenticationService
    {
        readonly IAuthenticationRepository _authRepository;

        private readonly AppSettings _appSettings;

        private readonly IPasswordHasher _passwordHasher;
        private readonly IMapper _mapper;

        public AuthenticationService(IAuthenticationRepository authRepository, IOptions<AppSettings> appSettings, IPasswordHasher passwordHasher, IMapper mapper)
        {
            _authRepository = authRepository;
            _appSettings = appSettings.Value;
            _passwordHasher = passwordHasher;
             _mapper = mapper;
        }

        public UserDto Authenticate(string phoneNumber, string password)
        {
            var user = _authRepository.Login(phoneNumber);
            if (user != null)
            {
                var unHashedPassword = _passwordHasher.Check(user.Password, password);

                if (!unHashedPassword.Verified)
                    return null;
                

                var userDto = _mapper.Map<UserDto>(user);


                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(int.Parse(_appSettings.TokenExpirationTimeInHours)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                userDto.Token = tokenHandler.WriteToken(token);

                return userDto;
            }
            else
            {
                return null;
            }
        }

        public bool Register(string phoneNumber, string password, string name)
        {
            var hashedPassword = _passwordHasher.Hash(password);

            var userId = _authRepository.Register(phoneNumber, hashedPassword, name);

            return userId != -1 ? true : false;
        }
    }
}
