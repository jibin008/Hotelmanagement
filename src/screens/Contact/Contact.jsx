import React from 'react'
import './Contact.css'
import contactImg from '../../imgs/contact.jpg';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
const Contact = () => {
    return (
        <div className='contactBody'>
            <section className='contactPage' style={{
                backgroundSize:'cover'
            }}>
                <div className='content'>
                    <h2 className='contact-us-hd'>Contact Us </h2>
                    <p className='contact-us-para'>We are delighted that you are considering HOREL EL FIGURIN for your next luxurious seaside getaway. Our dedicated team is here to assist you with any inquiries, reservations, or special requests you may have. Your comfort and satisfaction are our top priorities, and we are committed to providing you with an exceptional experience from the moment you reach out to us.</p>
                </div>

                <div className='mycontainer'>
                    <div className='contactInfo'>
                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-map-marker' aria-hidden="true"></i>

                            </div>
                            <div className='text'>
                                <h3>Address</h3>
                                HOREL EL FIGURIN

                                <p>123 Oceanview Drive, <br />Seaside Paradise, SP 45678, <br />Country: INDIA</p>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-phone' aria-hidden="true"></i>

                            </div>
                            <div className='text'>
                                <h3>Phone</h3>
                                <p>9995435945</p>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='icon'>
                                <i className='fa fa-envelope-o' aria-hidden="true"></i>
                            </div>
                            <div className='text'>
                                <h3>Email</h3>
                                <p>Mailtoelfigurin@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className='contactForm'>
                        <form>
                            <h2>Send Message</h2>
                            <div className='inputBox'>
                                <input type="text" name="" required="required" className="contact-input"/>
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="text" name="" required="required"  className="contact-input"/>
                                <span>Email</span>
                            </div>
                            <div className='inputBox'>
                                <textarea required="requred"  className="contact-input"></textarea>
                                <span>Type your message ...</span>
                            </div>
                            <div className='inputBox'>
                                <input type="submit" name="" value="Send"  className="contact-input"/>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        <MyFooter/>
        <MyCopyright/>
        </div>
    )
}

export default Contact
