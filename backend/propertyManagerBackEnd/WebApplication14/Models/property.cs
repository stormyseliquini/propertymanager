using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication14.Models
{
    public class property
    {
        [Required]
        public int propertyId { get; set; }
        [Required]
       public int userId { get; set; }
        [Required]
        public string propertyName { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string city { get; set; }
        [Required]
        public string state { get; set; }
        [Required]
        public int zip { get; set; }
        [Required]
        [StringLength(10)]
        public string contactPhone { get; set; }
        [Required]
        public int rent { get; set; }
        [Required]
        public int sqrFt { get; set; }
        public int leaseTerm { get; set; }
        [Required]
        public int bedroomCount { get; set; }
        public int bathroomCount { get; set; }
        public byte[] propertyImage { get; set; }
        public bool petFriendly { get; set; }


        public user user { get; set; }

    }
}