using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using Backend_app.Models;
using System.Data;


namespace Backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestController(IConfiguration configuration)
        {
            _configuration = configuration;
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());
            SqlCommand cmd = null;
        }

       

        [HttpPost]
        [Route("Registration")]

        public string Registration(Users users)
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());
            string msg = string.Empty;
            SqlCommand cmd = new SqlCommand("sp_Registration", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Name", users.Name);
            cmd.Parameters.AddWithValue("@PhoneNo", users.PhoneNo);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Address", users.Address);
            cmd.Parameters.AddWithValue("@IsActive", users.IsActive);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i > 0)
            {
                msg = "Registerd Successfully...";
            }
            else
            {
                msg = "Error.";
            }
            return msg;
        }


        [HttpPost]
        [Route("Login")]

        public string Login(Users users)
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());
            string msg = string.Empty;
            SqlDataAdapter da = null;
            da = new SqlDataAdapter("sp_Login", conn);

            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@PhoneNo", users.PhoneNo);
            DataTable dt = new DataTable();
            da.Fill(dt);

            

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    int IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    if (IsActive==1)
                    {
                        msg = "111";// Guest
                    }
                    else
                    {
                        msg = "333";//Admin
                    }
                }
            }
            else
            {
                msg = "222";// NoData found
            }
            return msg;
        }


        [HttpPost]
        [Route("Add_Room")]

        public string Add_Room(Room_Details room)
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());
            string msg = string.Empty;
            SqlCommand cmd = new SqlCommand("sp_AddRoom", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            // cmd.Parameters.AddWithValue("@Room_id", room.Room_id);
            cmd.Parameters.AddWithValue("@Room_Type", room.Room_Type);
            cmd.Parameters.AddWithValue("@Rate", room.Rate);
            cmd.Parameters.AddWithValue("@Max_Adlt_cnt", room.Max_Adlt_cnt);
            cmd.Parameters.AddWithValue("@Max_Chld_cnt", room.Max_Chld_cnt);
            cmd.Parameters.AddWithValue("@Description", room.Description);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i > 0)
            {
                msg = "Room added.";
            }
            else
            {
                msg = "Error.";
            }
            return msg;
        }



        [HttpGet]
        [Route("GetUsers")]

        public List<Users> GetUsers()
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());


            SqlDataAdapter da = new SqlDataAdapter("sp_getusers", conn);

            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Users> list = new List<Users>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Users usr = new Users();
                    usr.Name = dt.Rows[i]["Name"].ToString();
                    usr.PhoneNo = dt.Rows[i]["PhoneNo"].ToString();
                    usr.Email = dt.Rows[i]["Email"].ToString();
                    usr.Address = dt.Rows[i]["Address"].ToString();
                    usr.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    list.Add(usr);


                }
            }
            if (list.Count > 0)
            {
                return list;
            }
            else
            {
                return null;
            }

        }

        [HttpGet]
        [Route("GetRoomDetails")]

        public List<Room_Details> GetRoomDetails()
       
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());


            SqlDataAdapter da = new SqlDataAdapter("sp_getroom_dtls", conn);

            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Room_Details> list = new List<Room_Details>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Room_Details room = new Room_Details();
                    room.Room_id = Convert.ToInt32(dt.Rows[i]["Room_id"].ToString());
                    room.Room_Type = dt.Rows[i]["Room_Type"].ToString();
                    room.Rate = Convert.ToDecimal(dt.Rows[i]["Rate"].ToString());
                    room.Max_Adlt_cnt = Convert.ToInt32(dt.Rows[i]["Max_Adlt_cnt"].ToString());
                    room.Max_Chld_cnt = Convert.ToInt32(dt.Rows[i]["Max_Chld_cnt"].ToString());
                    room.Description = dt.Rows[i]["Description"].ToString();
                    list.Add(room);


                }
            }
            if (list.Count > 0)
            {
                return list;
            }
            else
            {
                return null;
            }

        }

        [HttpGet]
        [Route("GetRoomByID")]

        public List<Room_Details> GetRoomByID(int Room_id)
       {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());


            SqlDataAdapter da = new SqlDataAdapter("sp_GetRoomByID", conn);
           // SqlCommand cmd = new SqlCommand("sp_GetRoomByID", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Room_id", Room_id);
            DataTable dt = new DataTable();

            
          
            da.Fill(dt);
          

            List<Room_Details> list = new List<Room_Details>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Room_Details room = new Room_Details();
                    room.Room_id = Convert.ToInt32(dt.Rows[i]["Room_id"].ToString());
                    room.Room_Type = dt.Rows[i]["Room_Type"].ToString();
                    room.Rate = Convert.ToDecimal(dt.Rows[i]["Rate"].ToString());
                    room.Max_Adlt_cnt = Convert.ToInt32(dt.Rows[i]["Max_Adlt_cnt"].ToString());
                    room.Max_Chld_cnt = Convert.ToInt32(dt.Rows[i]["Max_Chld_cnt"].ToString());
                    room.Description = dt.Rows[i]["Description"].ToString();
                    list.Add(room);


                }
            }
            if (list.Count > 0)
            {
                return list;
            }
            else
            {
                return null;
            }

        }


        [HttpPut("{Room_id}")]
        
        public string Edit_RoomDetails(int Room_id, Room_Details room)
       {
            string msg = "";
            if (room != null)
            {
                SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());

                SqlCommand cmd = new SqlCommand("sp_UpdateRoomDetails", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Room_id",Room_id);
                cmd.Parameters.AddWithValue("@Room_Type", room.Room_Type);
                cmd.Parameters.AddWithValue("@Rate", room.Rate);
                cmd.Parameters.AddWithValue("@Max_Adlt_cnt", room.Max_Adlt_cnt);
                cmd.Parameters.AddWithValue("@Max_Chld_cnt", room.Max_Chld_cnt);
                cmd.Parameters.AddWithValue("@Description", room.Description);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    msg = "Data has been updated";

                }
                else
                {
                    msg = "error";
                }


            }
            return msg;
        }

        [HttpDelete("{Room_id}")]
        //[Route("DeleteRoom")]
        public string Delete_Room(int Room_id)
        {
            string msg = "";

            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());

            SqlCommand cmd = new SqlCommand("sp_DeleteRoom", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Room_id", Room_id);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
            if (i > 0)
            {
                msg = "Data has been Deleted";

            }
            else
            {
                msg = "error";
            }



            return msg;
        }

        [HttpGet]
        [Route("GetRoomBookingDetails")]

        public List<Booking_Dtls> GetRoomBookingDetails()
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());


            SqlDataAdapter da = new SqlDataAdapter("sp_getRoomBookingDtls", conn);

            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Booking_Dtls> list = new List<Booking_Dtls>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Booking_Dtls bookdtls = new Booking_Dtls();
                    bookdtls.User_ID = Convert.ToInt32(dt.Rows[i]["User_ID"]);
                    bookdtls.Room_ID = Convert.ToInt32(dt.Rows[i]["Room_ID"]);
                    bookdtls.Adlt_cnt = Convert.ToInt32(dt.Rows[i]["Adlt_cnt"]);
                    bookdtls.Chld_cnt = Convert.ToInt32(dt.Rows[i]["Chld_cnt"]);
                    bookdtls.Booking_dt = Convert.ToDateTime(dt.Rows[i]["Booking_dt"]);
                    bookdtls.Check_in = Convert.ToDateTime(dt.Rows[i]["Check_in"]);
                    bookdtls.Check_out = Convert.ToDateTime(dt.Rows[i]["Check_out"]);
                    bookdtls.no_of_days = Convert.ToInt32(dt.Rows[i]["no_of_days"]);
                    bookdtls.Booking_status = Convert.ToInt32(dt.Rows[i]["Booking_status"]);
                    bookdtls.Amount = Convert.ToDecimal(dt.Rows[i]["Amount"]);
                    bookdtls.Transaction_id = Convert.ToInt32(dt.Rows[i]["Transaction_id"]);
                    bookdtls.Review = dt.Rows[i]["Review"].ToString();
                    list.Add(bookdtls);


                }
            }
            if (list.Count > 0)
            {
                return list;
            }
            else
            {
                return null;
            }

        }

        [HttpPost]
        [Route("RoomBooking")]

        public string RoomBooking(Booking_Dtls booking)
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());
            string msg = string.Empty;
            SqlCommand cmd = new SqlCommand("usp_RoomBooking", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@User_ID", booking.User_ID);
            cmd.Parameters.AddWithValue("@Room_ID", booking.Room_ID);
            cmd.Parameters.AddWithValue("@Adlt_cnt", booking.Adlt_cnt);
            cmd.Parameters.AddWithValue("@Chld_cnt", booking.Chld_cnt);
            cmd.Parameters.AddWithValue("@Booking_dt", booking.Booking_dt);
            cmd.Parameters.AddWithValue("@Check_in", booking.Check_in);
            cmd.Parameters.AddWithValue("@Check_out", booking.Check_out);
            cmd.Parameters.AddWithValue("@no_of_days", booking.no_of_days);
            cmd.Parameters.AddWithValue("@Booking_status", booking.Booking_status);
            cmd.Parameters.AddWithValue("@Amount", booking.Amount);
            cmd.Parameters.AddWithValue("@Transaction_id", booking.Transaction_id);
            cmd.Parameters.AddWithValue("@Review", booking.Review);
            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i > 0)
            {
                msg = "Room Booked.";
            }
            else
            {
                msg = "Error.";
            }
            return msg;
        }


        [HttpPut]
        [Route("ConfirmPayment")]
        public string Confirm_Payment()
        {
            string msg = "";
            
                SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());

                SqlCommand cmd = new SqlCommand("sp_Confirm_Payment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                string Tran_No = GenerateCustomerID();
                cmd.Parameters.AddWithValue("@Trans_no", Tran_No);
              
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    msg = "Payment Successfull.";

                }
                else
                {
                    msg = "error";
                }


            
            return msg;
        }


        public static string GenerateCustomerID()
        {
            string TrID = DateTime.Now.ToString("MMddmmss");
            return TrID;
        }
        //[HttpDelete("{Booking_id}")]
        //public string DeleteRoomBooking(int Booking_id)
        //{
        //    string msg = "";

        //    SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("Default_connection").ToString());

        //    SqlCommand cmd = new SqlCommand("sp_DeleteRoomBooking", conn);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@Booking_id", Booking_id);

        //    conn.Open();
        //    int i = cmd.ExecuteNonQuery();
        //    conn.Close();
        //    if (i > 0)
        //    {
        //        msg = "Cancelled Booking";

        //    }
        //    else
        //    {
        //        msg = "error";
        //    }



        //    return msg;
        //}

    }
}
