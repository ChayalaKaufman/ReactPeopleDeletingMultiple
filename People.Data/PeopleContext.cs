﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace People.Data
{
    public class PeopleContext : DbContext
    {
        private string _connectionString;

        public PeopleContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbSet<Person> People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(_connectionString);
        }
    }
}
