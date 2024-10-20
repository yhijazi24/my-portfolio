import React, { useEffect, useRef, useState } from 'react';
import './css/body.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Body = () => {
  const [home, setHome] = useState({});
  const tabletRef = useRef(null);
  const contentResumeRefs = useRef([]);

  // Fetch data from API
  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("https://13.36.69.227.nip.io/homeHeader/");
        console.log(res);
        setHome(res.data[0]);
      } catch (err) {
        console.error("Error fetching data: ", err.response ? err.response.data : err.message);
      }
    };
    getHome();
  }, []);

  // Manage tablet 3D rotation effect
  useEffect(() => {
    const tablet = tabletRef.current;

    const handleMouseMove = (e) => {
      const rect = tablet.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * 10;
      const rotateY = (centerX - x) / centerX * 10;

      tablet.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      tablet.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    tablet.addEventListener('mousemove', handleMouseMove);
    tablet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tablet.removeEventListener('mousemove', handleMouseMove);
      tablet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='body-container'>
      <div className='body-wrapper'>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className='swiper-container'
        >
          <SwiperSlide>
            <div className='content'>
              <h1 className='content-title' ref={tabletRef}>{home.title}</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content'>
              <p className='content-info'>
                {home.aboutMe}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content content3'>
              <div className='content-resume'>
                <button className='resume-button resume1' ref={el => (contentResumeRefs.current[0] = el)}>
                  <img src={home.resumeImg && home.resumeImg[0]} className='resume' alt='French resume' />
                  <div className='layer'></div>
                  <p className='resume-lang'>FRENCH</p>
                </button>
              </div>
              <div className='content-resume'>
                <button className='resume-button resume2' ref={el => (contentResumeRefs.current[1] = el)}>
                  <img src={home.resumeImg && home.resumeImg[1]} className='resume' alt='English resume' />
                  <div className='layer'></div>
                  <p className='resume-lang'>ENGLISH</p>
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Body;
