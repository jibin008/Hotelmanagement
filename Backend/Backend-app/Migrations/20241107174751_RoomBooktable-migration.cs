using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_app.Migrations
{
    /// <inheritdoc />
    public partial class RoomBooktablemigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "room_Booking_details",
                columns: table => new
                {
                    Booking_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_ID = table.Column<int>(type: "int", nullable: false),
                    Room_ID = table.Column<int>(type: "int", nullable: false),
                    Adlt_cnt = table.Column<int>(type: "int", nullable: false),
                    Chld_cnt = table.Column<int>(type: "int", nullable: false),
                    Booking_dt = table.Column<DateOnly>(type: "date", nullable: false),
                    Check_in = table.Column<DateOnly>(type: "date", nullable: false),
                    Check_out = table.Column<DateOnly>(type: "date", nullable: false),
                    no_of_days = table.Column<int>(type: "int", nullable: false),
                    Booking_status = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Transaction_id = table.Column<int>(type: "int", nullable: false),
                    Review = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_room_Booking_details", x => x.Booking_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "room_Booking_details");
        }
    }
}
