import { useEffect, useState } from 'react';
import './App.css';
import { useParams } from 'react-router';

/**
 * This renders the More details of selected hotel in previous page
 * @returns table of selected hotel data.
 */
function HotelDetail() {
    const [selectedHotelDetails, setSelectedHotelDetails] = useState();
    const [isContentAvailable, setIsContentAvailable] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        GetSelectedHotelDetails(id);
    }, [id]);

    const contents = isContentAvailable && selectedHotelDetails ? (
        <div className="table-container">
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Location</th>
                        <th>Rating</th>
                        <th>Dates Of Travel</th>
                        <th>Board Basis</th>
                        <th>Rooms - Quantity</th>
                        <th>Hotel Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={selectedHotelDetails.id}>
                        <td>{selectedHotelDetails.name}</td>
                        <td>{selectedHotelDetails.location}</td>
                        <td>{selectedHotelDetails.rating}</td>
                        <td>{selectedHotelDetails.datesOfTravel[0]} To {selectedHotelDetails.datesOfTravel[1]}</td>
                        <td>{selectedHotelDetails.boardBasis}</td>
                        <td>
                            {selectedHotelDetails.rooms.map((room) => (
                                <span key={room.roomType}>
                                    {room.roomType} - {room.amount}
                                    <br />
                                </span>
                            ))}
                        </td>
                        <td>
                            {selectedHotelDetails.imageUrl}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
        <p><em>No details available for this hotel.</em></p>
    );

    return (
        <div>
            {isContentAvailable ? (
                <>
                    {selectedHotelDetails && <h1 id="tableLabel">Details of {selectedHotelDetails.name}</h1>}
                    {contents}
                </>
            ) : (
                <p><em>No content available for this hotel.</em></p>
            )}
        </div>
    );

    async function GetSelectedHotelDetails(id) {
        let hotelId = id.replace(/\D/g, "");
        try {
            const response = await fetch(`/api/Hotel/details?Id=${hotelId}`);
            if (response.status === 204 || response.status === 404) {
                setIsContentAvailable(false);
                console.log("No content available.");
            } else if (response.ok) {
                const data = await response.json();
                setIsContentAvailable(true);
                setSelectedHotelDetails(data);
            } else {
                setIsContentAvailable(false);
                console.error("Failed to fetch hotel details.");
            }
        } catch (error) {
            setIsContentAvailable(false);
            console.error("An error occurred while fetching hotel details:", error);
        }
    }
}

export default HotelDetail;
