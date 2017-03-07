using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication14.Models
{
    public class user
    {
        public int userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public bool isPropertyManager { get; set; }
        public string userName { get; set; }

        //nav
        public virtual ICollection<property> properties { get; set; }


    }
}