using System.ComponentModel.DataAnnotations;

namespace Backend_app.Models
{
    public class Users
    {
        
      [Key]  public int Userid { get; set; }
        public string? Name { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string? Address { get; set; }
        public int IsActive { get; set; }
    }
}
