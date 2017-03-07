using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication14.Models
{
    public class search
    {
        public string userName { get; set; }
        public string city { get; set; }
        public int zip { get; set; }
        public int minRent { get; set; }
        public int maxRent { get; set; }
        public int bedroomCount { get; set; }
        public int bathroomCount { get; set; }


    }
}