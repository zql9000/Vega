using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using vega.Extensions;

namespace vega.Persistence
{

    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehiclesAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicle.FindAsync(id);

            return await context.Vehicle
                .Include(v => v.Features)
                    .ThenInclude(f => f.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicle.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Vehicle.Remove(vehicle);
        }

        public async Task<List<Make>> GetMakesAsync() {
            return await context.Make.Include(m => m.Models).ToListAsync();
        }

        public async Task<List<Feature>> GetFeaturesAsync() {
            return await context.Feature.ToListAsync();
        }

        public async Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery vehicleQuery)
        {
            var result = new QueryResult<Vehicle>();

             var query = context.Vehicle
                .Include(v => v.Features)
                    .ThenInclude(f => f.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .AsQueryable();
            
            if (vehicleQuery.MakeId.HasValue)
                query = query.Where(v => v.Model.Make.Id == vehicleQuery.MakeId.Value);

            if (vehicleQuery.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == vehicleQuery.ModelId.Value);

            var ColumnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["Make"] = v => v.Model.Make.Name,
                ["Model"] = v => v.Model.Name,
                ["ContactName"] = v => v.ContactName,
                ["Id"] = v => v.Id
            };

            query = query.ApplyOrdering(vehicleQuery, ColumnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(vehicleQuery);
            
            result.Items = await query.ToListAsync();

            return result; 
        }
    }
}