import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import './AvailaibleRooms.css'; // Import the CSS file

const AvailableRooms = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/customer/availableRooms");
        setAvailableRooms(response.data.availableRooms);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAvailableRooms();
  }, []);

  const roomImages = [
    "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg",
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    "https://fariyas.com/wp-content/uploads/2023/08/Slide-2.jpg",
    "https://image-tc.galaxy.tf/wijpeg-9vualzt3dbue0hi00ba4q49ub/chatwalhotelnyc-c-004-build-crop.jpg?width=1920el"
    // Add more image URLs for each room
  ];

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom id="Avail">
        Available Rooms
      </Typography>
      <Grid container spacing={4}>
        {availableRooms.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="room-card">
              <CardMedia
                component="img"
                height="200"
                image={roomImages[index % roomImages.length]} // Rotate through the images
                alt={`Room ${room}`}
                className="room-image"
              />
              <CardContent>
                <Typography variant="h5" component="h3">
                  Room {room}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: Available
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: $100 per night
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableRooms;
