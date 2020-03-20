using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehiclesAsync(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery filter);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);

        Task<List<Make>> GetMakesAsync();
        Task<List<Feature>> GetFeaturesAsync();
    }
}