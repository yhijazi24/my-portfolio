import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './css/body.css';
import axios from 'axios';

const Body = () => {
  const [home, setHome] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const labels = ['HOME', 'ABOUT ME', 'RESUME'];

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("http://localhost:5000/homeHeader/");
        setHome(res.data[0]);
      } catch (err) {
        console.error("Error fetching data: ", err.response ? err.response.data : err.message);
      }
    };
    getHome();
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <div className='body-container'>
      <div className='body-wrapper'>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
          className='swiper-container'
        >
          <SwiperSlide>
            <div className='content'>
              <h1 className='content-title'>{home.title}</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content'>
              <p className='content-info'>{home.aboutMe}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content content3'>
              <div className='content-resume'>
              <a href={home.frenchResumeLink} target="_blank" rel="noopener noreferrer">
              <button className='resume-button resume1'>
                  <img src={home.resumeImg && home.resumeImg[0]} className='resume' alt='French resume' />
                  <div className='layer'></div>
                  <p className='resume-lang'>FRENCH</p>
                </button></a>
              </div>
              <div className='content-resume'>
              <a href={home.englishResumeLink} target="_blank" rel="noopener noreferrer">
                <button className='resume-button resume2'>
                  <img src={home.resumeImg && home.resumeImg[1]} className='resume' alt='English resume' />
                  <div className='layer'></div>
                  <p className='resume-lang'>ENGLISH</p>
                </button></a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='pagination'>
      <div className='custom-pagination'>
        {labels.map((label, index) => (
          <span
            key={index}
            className={`pagination-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            {label}
          </span>
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default Body;
