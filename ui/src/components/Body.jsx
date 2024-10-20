import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './css/body.css';
import axios from 'axios';

const Body = () => {
  const [home, setHome] = useState({});

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("https://13.36.69.227.nip.io/homeHeader/");
        setHome(res.data[0]);
      } catch (err) {
        console.error("Error fetching data: ", err.response ? err.response.data : err.message);
      }
    };
    getHome();
  }, []);

  return (
    <div className='body-container'>
      <div className='body-wrapper'>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              // Customize the bullet pagination here
              const labels = ['HOME', 'ABOUT ME', 'RESUME'];
              return `<span class="${className}">${labels[index]}</span>`;
            },
          }}
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
                <button className='resume-button resume1'>
                  <img src={home.resumeImg && home.resumeImg[0]} className='resume' alt='French resume' />
                  <div className='layer'></div>
                  <p className='resume-lang'>FRENCH</p>
                </button>
              </div>
              <div className='content-resume'>
                <button className='resume-button resume2'>
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
