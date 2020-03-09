using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
            
        }

        public DbSet<Make> Make { get; set; }
        public DbSet<Feature> Feature { get; set; }
    }
}