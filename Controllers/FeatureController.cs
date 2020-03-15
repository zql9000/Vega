using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class FeatureController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;

        public FeatureController(IMapper mapper, IVehicleRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var Features = await repository.GetFeaturesAsync();

            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(Features);
        }
    }
}