using System.ComponentModel.DataAnnotations;

namespace Backend_app.Models
{
    public class Room_Details
    {
        [Key] public int Room_id { get; set; }
        public string Room_Type { get; set; }
        public Decimal Rate { get; set; }
        public int Max_Adlt_cnt { get; set; }
        public int Max_Chld_cnt { get; set; }
        public string? Description { get; set; }
    }
}
