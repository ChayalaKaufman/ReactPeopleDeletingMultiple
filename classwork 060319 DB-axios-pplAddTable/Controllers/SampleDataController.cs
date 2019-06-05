using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using People.Data;

namespace classwork_060319_DB_axios_pplAddTable.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleDataController : Controller
    {
        private string _connectionString;

        public SampleDataController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("addPerson")]
        [HttpPost]
        public Person AddPerson(Person person)
        {
            PeopleRepository repo = new PeopleRepository(_connectionString);
            repo.Add(person);
            return person;
        }

        [Route("getPeople")]
        [HttpGet]
        public IEnumerable<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);
        }

        [Route("deleteAll")]
        [HttpPost]
        public void DeleteAll(Array arr)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeleteAll(arr);
        }
    }
}
