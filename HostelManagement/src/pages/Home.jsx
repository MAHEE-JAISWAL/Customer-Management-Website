import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Ensure you have installed this package
import Image1 from './im1.jpg'; // Make sure these image paths are correct
import Image2 from './img1.jpg';
import Image3 from './im3.webp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Home = () => {
  const slides = [
    { img: Image1, alt: 'Luxify Hotel' },
    { img: Image2, alt: 'Luxury Room' },
    { img: Image3, alt: 'Event Venue' }
  ];

  return (
    <Container>
      
      <Box my={4} id="">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h5" gutterBottom > 
              Welcome To Luxify
            </Typography> 
          </Grid>
        </Grid>     
      </Box>
      <Box my={4}>
        <Carousel>
          {slides.map((slide, index) => (
            <CardMedia key={index} component="img" image={slide.img} alt={slide.alt} />
          ))}
        </Carousel>
      </Box>
      <Box my={4} display="flex" justifyContent="center">
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Home;
