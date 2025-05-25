import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import contactImg from '../../imgs/contact.jpg';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Review.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Review = () => {
    
  const [reviews, setReviews] = useState([
    { name: 'Vishnu Bose', rating: 5, comment: 'Amazing stay! Highly recommend!' },
    { name: 'Sarath Madhav', rating: 4, comment: 'Great service, rooms were clean.' },
    { name: 'Prasanth P P', rating: 4, comment: 'Great service,' },
    { name: 'Syam P Mohan', rating: 3, comment: 'Good Ambience,Loved it!' },
    
  ]);

  const handleSub = () => {
    alert("Review added Successfully");

    
  }
  
  const [value, setValue] = React.useState(4);

  return (
    
    <div className='contactBody'>
    <section className='reviewPage' style={{
        backgroundSize:'cover'
    }}>
       

    <Box sx={{ width: '100%' }}>
      
      <h2>Guest Reviews</h2>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <Grid key={index} size={20}>
            <h3>{review.name}</h3>
            <p>Rating:  <Rating name="read-only" value={review.rating} readOnly /></p>
            <p>{review.comment}</p>
            </Grid>
            
          </div>
        ))}
      </Grid>
      <br></br>
                  <div>
                    <h2>Leave your Review</h2>
                      <Grid>
                          <Grid>
                              <TextField
                                  id="standard-multiline-flexible"
                                  label="Your Name"
                                  multiline
                                  maxRows={4}
                                  variant="standard"
                              />
                          </Grid>
                          <Grid>
                            <br></br>
                              <TextField
                                  id="standard-multiline-flexible"
                                  label="Your Review"
                                  multiline
                                  maxRows={4}
                                  variant="standard"
                              />
                          </Grid>
                          <Grid>
                            <br></br><br></br>
                              <Rating
                                  name="simple-controlled"
                                  value={value}
                                  onChange={(event, newValue) => {
                                      setValue(newValue);
                                  }}
                              />
                          </Grid>
                          <Grid>
                            <br></br><br></br>
                          <Button  onClick={() => handleSub()}>Submit</Button>
                          </Grid>

                      </Grid>

                  </div>
    </Box>

   

   
    </section>
<MyFooter/>
<MyCopyright/>
</div>
  )
}

export default Review
