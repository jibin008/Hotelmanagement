import React from 'react'
import MyCarousel from '../../components/Carousel/MyCarousel'
import card5 from '../../imgs/card5.jpg';
import card2 from '../../imgs/card2.jpg';
import card4 from '../../imgs/card4.jpg';
import card3 from '../../imgs/card3.jpg';
import card1 from '../../imgs/card1.jpg';
import './Rooms.css'
import { Link, useParams } from "react-router-dom";
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import { child, get, ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { useEffect } from 'react';
import { useState} from 'react';
import axios from 'axios';





const SingleRoom = () => {

   const { roomType } = useParams();
   
   const [typeofRoom, setTypeofRoom] = React.useState("");
   
   // const roomType ="1";

    const [roomsDetails, setRoomsDetails] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
       
        try {
            axios.get(`https://localhost:7080/api/Test/GetRoomByID?Room_id=${roomType}`)

            .then((result) => {
                    
                    
                    setRoomsDetails([ result.data]);

                    console.log('after arr',roomsDetails);

                    //alert(JSON.stringify(result.data[0], null, 2));
                })
        } catch (error) {
            console.error("Error fetching room data:", error);
        }

    }, []);
   
console.log(roomType)
    var myVar;


    return (
        

<div>
<MyCarousel  title="ROOMS" />
<center>
    <h1 className='room-details-heading h1hgt' >Details of room</h1>
  </center>
  <div className='singleRoom-cards'>{
                    (() => {
                
                    if (roomType == 1) //Single
                    
                        return<>
                        
                

                            <div class="card">
                                <img class="cardimg" src={card5} />
                            </div>

                            <div class="card">
                                <img class="cardimg" src={card2} />
                            </div>

                            <div class="card">
                                <img class="cardimg" src={card3} />
                            </div>
                        
                        </>
                    else if (roomType == 2) //double
                        return<>
                        <div className="card " onMouseEnter={() => setTypeofRoom(2)}>
                            <div class="icon">
                                <img src={card2} />

                            </div>
                        </div>
                    </>
                    else if (roomType == 3) //family
                        return<>
                        <div className="card " onMouseEnter={() => setTypeofRoom(3)}>
                            <div class="icon">
                                <img src={card5} />

                            </div>
                        </div>
                    </>
                    })()
                }
                




</div>

<ul>
   {roomsDetails.map((itm, k) =>


<div className='single-room-detail'>
<div className='single-room-detail-para'>

<h1 className='h1hgt'>Details</h1>

<p>{JSON.stringify(itm[0].description)}</p>


</div>

<div className='single-room-detail-list'>
<h1 className='h1hgt'> Info</h1>
<p>Price : Rs {JSON.stringify(itm[0].rate)} <br /> <br />
Adult count :  {JSON.stringify(itm[0].max_Adlt_cnt)} Person <br /> <br />
Child count : {JSON.stringify(itm[0].max_Chld_cnt)} <br /> <br />
</p>
</div>
</div> 
            )}
 </ul>

        <div className='single-room-detail'>
                 <div className='single-room-detail-list2'>

                     <h1 className='h1hgt'>Extras</h1>
                     <p>"Plush pillows and breathable bed linens" <br />
                      "Comfortable Beds" <br />
                         "AC" <br />
                     </p>

                 </div>

                 <div className='single-room-detail-list2 div2'>
                     {/* <h1 className='white'> Extras</h1> */}

                     <p>
                         "Complimentary refreshments <br />
                         "Adequate safety/security" <br />
                         "Internet" <br />
                     </p>

                 </div>

</div>


<center>
                 <div>
                     <Link to={`/booknow/${roomType}`}><button className='btn bookNow-btn'>Book Now</button></Link>
                 </div>
</center>
        </div>



    )
}

export default SingleRoom;