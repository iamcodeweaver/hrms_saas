import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/assets/dashboard1.png",
  "/assets/dashboard2.png",
  "/assets/mobile-view.png",
];

export default function CarouselSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Box sx={{ py: 8, px: 4, backgroundColor: '#f9f9f9' }}>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        Take a Tour of Our Platform
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>

        <Slider {...settings}>
          {images.map((src, i) => (
            <Box
              key={i}
              sx={{
                height: { xs: 250, md: 400 },
                display: 'flex !important',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={src}
                  alt={`slide-${i}`}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Slider>

      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
          Request a Demo
        </Button>
        <Button variant="outlined" color="primary">
          Sign Up Now
        </Button>
      </Box>

    </Box>
  );
}