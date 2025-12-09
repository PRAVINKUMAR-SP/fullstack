import React from 'react'
import hero_img from '../../assets/woman1.png'
import { FaShippingFast } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from 'react-icons/md'

const Hero = () => {
    return (
        <div className='hero h-screen'>
            <div className="hero-top">
                <div className="hero-left">
                    <h2 className='text-[26px] font-bold'>Unleash Your Unique Style.</h2>
                    <h1 className='text-[3.5rem] font-bold hover:transform-3d'>With Collection That Lets Your Style and Fashion Speak</h1>
                    <p className='text-[16px] font-bold mt-5'>Shop the latest trends and classic essentials from our collections</p>
                </div>
                <div className="hero-right max-w-[50%]">
                    <img src={hero_img} alt="" className='w-[600px] h-[500px] object-fit-contain!'/>
                </div>
            </div>
            <div className="hero-bottom flex justify-between mt-10 w-full p-10 ">
                <div className="hero_content flex gap-5">
                    <div className="info_icon"><FaShippingFast className='hero_icon' /></div>
                        <div className="detail">
                            <h3>Free Shipping</h3>
                            <p>Free Shipping on order</p>
                        </div>
                </div>
                <div className="hero_content">
                    <div className="info_icon"><FiSend className='hero_icon'/></div>
                    <div className="detail">
                        <h3>Wordwide Delivery</h3>
                        <p>We Deliver to all countries</p>
                    </div>
                </div>
                <div className="hero_content">
                    <div className="info_icon"><BiSupport className='hero_icon'/></div>
                    <div className="detail">
                        <h3>2/4 Support</h3>
                        <p>full support on process</p>
                    </div>
                </div>
                <div className="hero_content">
                    <div className="info_icon"><MdPayment className='hero_icon'/></div>
                    <div className="detail">
                        <h3>Secure Payment</h3>
                        <p>Your payment Secure</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero