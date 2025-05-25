using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_app.Migrations
{
    /// <inheritdoc />
    public partial class finalmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "booking_dtls",
                columns: table => new
                {
                    Booking_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_ID = table.Column<int>(type: "int", nullable: false),
                    Room_ID = table.Column<int>(type: "int", nullable: false),
                    Adlt_cnt = table.Column<int>(type: "int", nullable: false),
                    Chld_cnt = table.Column<int>(type: "int", nullable: false),
                    Booking_dt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Check_in = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Check_out = table.Column<DateTime>(type: "datetime2", nullable: false),
                    no_of_days = table.Column<int>(type: "int", nullable: false),
                    Booking_status = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Transaction_id = table.Column<int>(type: "int", nullable: false),
                    Review = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booking_dtls", x => x.Booking_id);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "room_Details",
                columns: table => new
                {
                    Room_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Room_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Max_Adlt_cnt = table.Column<int>(type: "int", nullable: false),
                    Max_Chld_cnt = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_room_Details", x => x.Room_id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Userid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Userid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "booking_dtls");

            migrationBuilder.DropTable(
                name: "employee");

            migrationBuilder.DropTable(
                name: "room_Details");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
