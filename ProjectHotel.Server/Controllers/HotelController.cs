using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ProjectHotel.Server.HotelDataModels;

namespace ProjectHotel.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<HotelDetails>> Get()
        {
            string hotelJSON = System.IO.File.ReadAllText("./HotelDetails.json"); //Readimg the json file
            List<HotelDetails>? hotelDetailsList = JsonSerializer.Deserialize<List<HotelDetails>>(hotelJSON); //deserialize it 
            return hotelDetailsList; //returning the data to api
        }

        [HttpGet("details")]
        public ActionResult<HotelDetails> Getdetails([FromQuery] int Id)
        {
            //Further Improvement:-  here we can try to deserialize the object required
            string hotelJSON = System.IO.File.ReadAllText("./HotelDetails.json");
            List<HotelDetails>? hotelDetailsList = JsonSerializer.Deserialize<List<HotelDetails>>(hotelJSON);
            var selectedHotelDetails = hotelDetailsList.FirstOrDefault(hotel => hotel.id == Id);
            return selectedHotelDetails;
        }
    }
}
