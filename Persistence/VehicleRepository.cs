using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

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
    }
}