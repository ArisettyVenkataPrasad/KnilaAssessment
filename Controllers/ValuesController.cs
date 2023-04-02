using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnilaAssessment.Models;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.Net;

namespace KnilaAssessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ValuesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string query = @"  
                    select Id, FirstName, LastName, Email, PhoneNumber, Address,
                    City, State, Country, PostalCode
                    from dbo.tbl_Employee order by CreatedDate Desc  
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            string res = JsonConvert.SerializeObject(table);
            return Ok(res);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Employee emp)
        {
            string query = @"  
                    insert into dbo.tbl_Employee   
                    (FirstName,LastName,Email,PhoneNumber,Address,City,State,Country,PostalCode,CreatedDate)  
                    values   
                    (  
                    '" + emp.FirstName + @"'  
                    ,'" + emp.LastName + @"'  
                    ,'" + emp.Email + @"'
                    ,'" + emp.PhoneNumber + @"'  
                    ,'" + emp.Address + @"'   
                    ,'" + emp.City + @"'  
                    ,'" + emp.State + @"'  
                    ,'" + emp.Country + @"'
                    ,'" + emp.PostalCode + @"'
                    ,'" + DateTime.Now + @"'
                    )  
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Employee emp)
        {
            string query = @"  
                    update dbo.tbl_Employee set   
                    FirstName = '" + emp.FirstName + @"'  
                    ,LastName = '" + emp.LastName + @"'  
                    ,Email = '" + emp.Email + @"'
                    ,PhoneNumber = '" + emp.PhoneNumber + @"'
                    ,Address = '" + emp.Address + @"'
                    ,City = '" + emp.City + @"'
                    ,State = '" + emp.State + @"'
                    ,Country = '" + emp.Country + @"'
                    ,PostalCode = '" + emp.PostalCode + @"'
                    ,CreatedDate = '" + DateTime.Now + @"'
                    where Id = " + emp.Id + @"   
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }
    }
}
