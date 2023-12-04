using CsvHelper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IsracardTaskServer.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class CitiesController : ControllerBase
    {
        
        [HttpGet]
        public IEnumerable<City> Get()
        {
            List<City> cities = new List<City>();
            using (var reader = new StreamReader("data\\world-cities_csv.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<dynamic>();
                
                foreach (var record in records)
                {
                    var city = new City { name = record.name, country = record.country, subcountry = record.subcountry, geonameid = record.geonameid };
                    bool exists = false;

                    foreach (var c in cities)
                    {
                        if(c.name == record.name && c.country == record.country)
                        {
                            exists = true;
                        }
                    }
                    if (!exists)
                        cities.Add(city);
                }
            }

            return cities.OrderBy(x => x.name).ToList();
        }
    }
}
