namespace ProjectHotel.Server.HotelDataModels
{
    public class HotelDetails
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? location { get; set; }
        public double rating { get; set; }
        public string? imageUrl { get; set; }
        public List<string>? datesOfTravel { get; set; }
        public string? boardBasis { get; set; }
        public List<Room>? rooms { get; set; }
    }
}
