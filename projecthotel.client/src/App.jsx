import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from "react-router";


/**
 * This renders the list of Hotels in a table format
 * @returns table of hotel data
 */
function App() {
    const [forecasts, setForecasts] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once.</em></p>
        : <div className="table-container">
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Location</th>
                        <th>Rating</th>
                        <th>Board Basis</th>
                        <th>Rooms - Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((hotel) => (
                        <tr onClick={() => navigateToHotelDetailsPage(hotel.id)} key={hotel.id}>
                            <td>{hotel.name}</td>
                            <td>{hotel.location}</td>
                            <td>{hotel.rating}</td>
                            <td>{hotel.boardBasis}</td>
                            <td>
                                {hotel.rooms.map((room) => (
                                    <span key={room.roomType}>
                                        {room.roomType} - {room.amount}
                                        <br />
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>;

    return (
        < div >
            {
                < div >
                    <h1 id="tableLabel">List Of Hotels</h1>
                    {contents}
                </div >
            }
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch("api/Hotel");
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }

    function navigateToHotelDetailsPage(id) {
        navigate(`/hotel/:${id}`)
    }
}

export default App;