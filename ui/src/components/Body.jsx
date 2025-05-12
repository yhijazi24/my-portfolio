import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './css/body.css';
import axios from 'axios';

const Body = () => {
  const [home, setHome] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const labels = ['HOME', 'ABOUT ME', 'RESUME'];

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-upzy.onrender.com/homeHeader/");
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

  if (!home) return <div className="loading">Loading...</div>;

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
              <h1 className='content-title'>{home?.title || 'No Title Provided'}</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content'>
              <p className='content-info'>{home?.aboutMe || 'No About Me text available.'}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content content3'>
              <div className='content-resume'>
                {home?.frenchResumeLink && Array.isArray(home.resumeImg) && home.resumeImg[0] && (
                  <a href={home.frenchResumeLink} target="_blank" rel="noopener noreferrer">
                    <button className='resume-button resume1'>
                      <img src={home.resumeImg[0]} className='resume' alt='French resume' />
                      <div className='layer'></div>
                      <p className='resume-lang'>FRENCH</p>
                    </button>
                  </a>
                )}
              </div>
              <div className='content-resume'>
                {home?.englishResumeLink && Array.isArray(home.resumeImg) && home.resumeImg[1] && (
                  <a href={home.englishResumeLink} target="_blank" rel="noopener noreferrer">
                    <button className='resume-button resume2'>
                      <img src={home.resumeImg[1]} className='resume' alt='English resume' />
                      <div className='layer'></div>
                      <p className='resume-lang'>ENGLISH</p>
                    </button>
                  </a>
                )}
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
