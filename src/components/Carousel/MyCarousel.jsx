import React from 'react';
import slider1 from '../../imgs/hotel1.jpg';
import slider2 from '../../imgs/hotel2.jpg';
import slider3 from '../../imgs/hotel3.jpg';
import mainimage from '../../imgs/MainImg.jpg';
import './MyCarousel.css';
import { Link } from 'react-router-dom'
import { TbBackground } from 'react-icons/tb';




var sliderStyle1 = {
    backgroundImage: `url(${slider1})`
}

var sliderStyle2 = {
    backgroundImage: `url(${slider2})`
}

var sliderStyle3 = {
    backgroundImage: `url(${mainimage})`,
    backgroundSize: 'cover',

}
const MyCarousel = (props) => {

    return (
        <div className="carousel slide" id="carouselExampleIndicators" data-ride="carousel" data-interval='7000'>
            
            <div className='carousel-inner' role="listbox">

                

                <div className='carousel-item' style={sliderStyle3}>
                    <div className='carousel-caption text-center'>
                        <h1>{props.title}</h1>
                        <h3>{props.subtitle}</h3>
                        <Link to="/rooms"><a className='btn btn-outline-light btn-lg carousel-btn'>Our Rooms</a></Link>
                    </div>
                </div>

            </div>

            <a className='carousel-control-prev' href="#carouselExampleIndicators" role="button" data-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden="true"></span>
            </a>


            <a className='carousel-control-next' href="#carouselExampleIndicators" role="button" data-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden="true"></span>
            </a>
        </div>
    )
}

export default MyCarousel;