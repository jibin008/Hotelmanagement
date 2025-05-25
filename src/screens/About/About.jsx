import React from 'react'
import './About.css'
import hotelVideo from '../../imgs/video.mp4'
import {Link} from 'react-router-dom'
import MyFooter from '../../components/Footer/MyFooter'
import MyCopyright from '../../components/Copyright/MyCopyright'

const About = () => {
    return (
        <div>
            <section class="heading">
                <video autoPlay loop class="video-background" muted plays-inline>
                    <source src={hotelVideo} type="video/mp4" />
                </video>

                <center>
                    <div class="welcome-msg ">
                        <h1> About Hotel El Figurin </h1>
                        <p>Nestled along the pristine shores of the azure coastline, HOREL EL FIGURIN redefines luxury and elegance in the heart of paradise. This exquisite seaside hotel offers an unparalleled escape for discerning travelers seeking both relaxation and adventure.
                        As you step into the grand lobby, you are greeted by breathtaking ocean views and a warm, inviting ambiance. Each of our meticulously designed rooms and suites boasts floor-to-ceiling windows, allowing you to bask in the beauty of the sea from the comfort of your own space. With plush furnishings, modern amenities, and private balconies, every detail has been thoughtfully curated to ensure your stay is nothing short of extraordinary.
                       
Discover the ultimate seaside sanctuary at HOREL EL FIGURIN, where luxury meets tranquility, and every moment is a celebration of life’s finest pleasures. </p>
                       <Link to="/"> <a class="btn btn-home btna"> Return to Home</a></Link>
                    </div>

                </center>
            </section>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default About
