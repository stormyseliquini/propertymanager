using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication14.Models;
using propertyManagerBackEnd.Structure;

namespace WebApplication14.Controllers
{
    public class propertiesController : ApiController
    {
        private PropertyDataContext db = new PropertyDataContext();

         // GET: api/Properties/Username
       [Route("api/Properties/Username")]
       [HttpGet]
       public IQueryable<property> SearchPropertyByUsername([FromUri]search SearchUser)
        {
            //getting out just username form object



            //user = db.Users.FirstOrDefault(u => u.UserName == username);
            string username = SearchUser.userName;
            IQueryable<property> user = db.properties.Where(u => u.user.userName == username);


            return user;
        }

        // GET: api/properties
        public IQueryable<property> GetProperties()
        {

            //var searchProps = SearchFields
            // .GetType()
            // .GetProperties().Where(p => p != null);


            return db.properties;
        }

        //----------------------------------------------
        //----------------------------------------------

        //GET: api/Properties/Filter
        [Route("api/Properties/Filter")]
        [HttpGet]
        public IQueryable<property> FilterProperties([FromUri]search fieldsObject)
        {
           IQueryable<property> ResultSet = db.properties;
            if (fieldsObject.city != null) { ResultSet = ResultSet.Where(p => p.city == fieldsObject.city); }
            if (fieldsObject.zip != 0) { ResultSet = ResultSet.Where(p => p.zip == fieldsObject.zip); }
            if (fieldsObject.bedroomCount != 0) { ResultSet = ResultSet.Where(p => p.bedroomCount == fieldsObject.bedroomCount); }
            if (fieldsObject.bathroomCount != 0) { ResultSet = ResultSet.Where(p => p.bathroomCount == fieldsObject.bathroomCount); }
            if (fieldsObject.minRent != 0) { ResultSet = ResultSet.Where(p => p.rent > fieldsObject.minRent); }
            if (fieldsObject.maxRent != 0) { ResultSet = ResultSet.Where(p => p.rent < fieldsObject.maxRent); }
            return ResultSet;
        }

        // GET: api/properties/5
        [ResponseType(typeof(property))]
        public IHttpActionResult Getproperty(int id)
        {
            property property = db.properties.Find(id);
            if (property == null)
            {
                return NotFound();
            }

            return Ok(property);
        }

        // PUT: api/properties/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putproperty(int id, property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != property.propertyId)
            {
                return BadRequest();
            }

            db.Entry(property).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!propertyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/properties
        [ResponseType(typeof(property))]
        public IHttpActionResult Postproperty(property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.properties.Add(property);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = property.propertyId }, property);
        }

        // DELETE: api/properties/5
        [ResponseType(typeof(property))]
        public IHttpActionResult Deleteproperty(int id)
        {
            property property = db.properties.Find(id);
            if (property == null)
            {
                return NotFound();
            }

            db.properties.Remove(property);
            db.SaveChanges();

            return Ok(property);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool propertyExists(int id)
        {
            return db.properties.Count(e => e.propertyId == id) > 0;
        }
    }
}