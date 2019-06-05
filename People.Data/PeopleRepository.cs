using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace People.Data
{
    public class PeopleRepository
    {
        private string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Person> GetPeople()
        {
            using (var context = new PeopleContext(_connectionString))
            {
                return context.People.ToList();
            }
        }

        public Person Add(Person person)
        {
            using (var context = new PeopleContext(_connectionString))
            {
                context.People.Add(person);
                context.SaveChanges();
                int id = person.Id;
                return person;
            }
        }

        public void Delete(int id)
        {
            using (var context = new PeopleContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "DELETE FROM People WHERE Id = @id",
                    new SqlParameter("@id", id));
            }
        }

        public void DeleteAll(Array arr)
        {
            using (var context = new PeopleContext(_connectionString))
            {
                foreach(int id in arr)
                {
                    context.Database.ExecuteSqlCommand(
                        "DELETE FROM People WHERE Id = @id",
                    new SqlParameter("@id", id));
                }
            }
        }
    }
}
