using Backend_app.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend_app.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
            
        }
    
         public DbSet<Employee> employee {  get; set; }
         public DbSet<Users> users { get; set; }
         public DbSet<Room_Details> room_Details { get; set; }
         public DbSet<Booking_Dtls> booking_dtls { get; set; }
        public DbSet<Room_Booking_Details> room_Booking_details { get; set; }
        //public DbSet<Booking_Details> booking_Details { get; set; }
    }
}
