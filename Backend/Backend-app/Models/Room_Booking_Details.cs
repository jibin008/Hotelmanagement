using System.ComponentModel.DataAnnotations;

namespace Backend_app.Models
{
    public class Room_Booking_Details
    {
        [Key] public int Booking_id { get; set; }
        public int User_ID { get; set; }
        public int Room_ID { get; set; }
        public int Adlt_cnt { get; set; }
        public int Chld_cnt { get; set; }
        public DateOnly Booking_dt { get; set; }
        public DateOnly Check_in { get; set; }
        public DateOnly Check_out { get; set; }
        public int no_of_days { get; set; }
        public int Booking_status { get; set; }
        public decimal Amount { get; set; }
        public int Transaction_id { get; set; }
        public int Review { get; set; }
    }
}
