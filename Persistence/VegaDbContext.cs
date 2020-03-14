using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Persistence
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<Make> Make { get; set; }
        public DbSet<Feature> Feature { get; set; }

        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf =>
                new { vf.VehicleId, vf.FeatureId }
            );
        }
    }
}