using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    public class MakeController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;

        public MakeController(IMapper mapper, IVehicleRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var Makes = await repository.GetMakesAsync();

            return mapper.Map<List<Make>, List<MakeResource>>(Makes);
        }
    }
}