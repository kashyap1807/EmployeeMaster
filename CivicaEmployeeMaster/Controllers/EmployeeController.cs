using CivicaEmployeeMaster.Dtos;
using CivicaEmployeeMaster.Models;
using CivicaEmployeeMaster.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace CivicaEmployeeMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet("GetAllEmployees")]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var response = _employeeService.GetEmployees();
                if (!response.Success)
                {
                    return NotFound(response);
                }
                return Ok(response);
            }
            catch(Exception ex)
            {
                return NotFound(ex); 
            }
            
        }
        [HttpGet("GetAllEmployeesByPagination")]
        public IActionResult GetPaginatedEmployees(string? search, int page = 1, int pageSize = 4, string sortOrder = "asc")
        {
            var response = new ServiceResponse<IEnumerable<EmployeeDto>>();
            response = _employeeService.GetPaginatedEmployees(page, pageSize, search, sortOrder);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }
        [HttpGet("GetEmployeeCount")]
        public IActionResult GetEmployeeCount(string? search)
        {
            var response = _employeeService.TotalEmployees(search);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpGet("GetEmployeeById/{id}")]
        public IActionResult GetEmployeeById(int id)
        
        {
            var response = _employeeService.GetEmployeeById(id);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPut("UpdateEmployee")]
        //[Authorize]
        public IActionResult UpdateEmployee(UpdateEmployeeDto employeeDto)
        {
            var employee = new Employee()
            {
                Id = employeeDto.Id,
                EmployeeEmail = employeeDto.EmployeeEmail,
                DepartmentId = employeeDto.DepartmentId,
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Gender = employeeDto.Gender,
                BasicSalary = employeeDto.BasicSalary,
                Allowance = employeeDto.Allowance,
                DateOfJoining = employeeDto.DateOfJoining,
            };

            var result = _employeeService.UpdateEmployee(employeeDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("Create")]
        //[Authorize]
        public IActionResult AddEmployee(AddEmployeeDto addemployeeDto)
        {

            var employee = new Employee()

            {
                FirstName = addemployeeDto.FirstName,
                LastName = addemployeeDto.LastName,
                DepartmentId = addemployeeDto.DepartmentId,
                EmployeeEmail = addemployeeDto.EmployeeEmail,
                BasicSalary = addemployeeDto.BasicSalary,
                Gender = addemployeeDto.Gender,
                Allowance = addemployeeDto.Allowance,
                DateOfJoining=addemployeeDto.DateOfJoining

            };

            var result = _employeeService.AddContact(employee);
            return !result.Success ? BadRequest(result) : Ok(result);

        }

        [HttpDelete("Delete/{id}")]
        //[Authorize] 
        public IActionResult DeleteConfirmed(int id)
        {
            if (id > 0)
            {
                var result = _employeeService.RemoveEmployee(id);
                return !result.Success ? BadRequest(result) : Ok(result);
            }
            else
            {
                return BadRequest("Please enter proper data");
            }
        }
        [HttpGet("GetTotalSalaryByDepartmentAndYear")]
        public IActionResult GetTotalSalaryByDepartmentAndYear(int year)
        {
            var response = _employeeService.GetTotalSalaryByDepartmentAndYear(year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpGet("GetTotalSalaryByYear")]
        public IActionResult GetTotalSalaryByYear(int year)
        {
            var response = _employeeService.GetTotalSalaryByYear(year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpGet("GetTotalSalaryByMonth")]
        public IActionResult GetTotalSalaryByMonth(int month,int year)
        {
            var response = _employeeService.GetTotalSalaryByMonth(month,year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpGet("GetTotalProfTaxByMonth")]
        public IActionResult GetTotalProfTaxByMonth(int month, int year)
        {
            var response = _employeeService.GetTotalProfTaxByMonth(month, year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [ExcludeFromCodeCoverage]
        [HttpGet("GetTotalSalaryByMonthYearAndId/{employeeId},{month},{year}")]
        public IActionResult GetTotalSalaryByMonthYearAndId(int employeeId,int month, int year)
        {
            var response = _employeeService.GetTotalSalaryByMonthYearAndId(employeeId,month, year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
        [HttpGet("GetTotalSalaryByYearAndId/{employeeId},{year}")]
        public IActionResult GetTotalSalaryByYearAndId(int employeeId, int year)
            {
            var response = _employeeService.GetTotalSalaryByYearAndId(employeeId, year);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
