using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication14.Models;

namespace propertyManagerBackEnd.Structure
{
    public class PropertyDataContext : DbContext
    {
        public PropertyDataContext() : base("propertyDB")
        {

        }

        public IDbSet<property> properties { get; set; }
        public IDbSet<user> users { get; set;}



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // 1 user has many properties
            modelBuilder.Entity<user>()
                        .HasMany(t => t.properties)
                        .WithRequired(property => property.user)
                        .HasForeignKey(property => property.userId);

            base.OnModelCreating(modelBuilder);
        }
    }
}