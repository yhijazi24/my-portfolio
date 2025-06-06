import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './css/body.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Body = () => {
  const [home, setHome] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("https://portfolio-w14d.onrender.com/homeHeader/");
        const data = Array.isArray(res.data) ? res.data[0] : null;
        if (data) {
          setHome(data);
        } else {
          console.warn("No home header found.");
        }
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

  const title = i18n.language === 'fr' ? home.titleFr : home.title;
  const aboutMe = i18n.language === 'fr' ? home.aboutMeFr : home.aboutMe;

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
              <h1 className='content-title'>{title || 'No Title Provided'}</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content'>
              <p className='content-info'>{aboutMe || 'No About Me text available.'}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='content content3'>
              <div className='content-resume'>
                {home.frenchResumeLink && home.frenchResumeImg && (
                  <a href={home.frenchResumeLink} target="_blank" rel="noopener noreferrer">
                    <button className='resume-button resume1'>
                      <img src={home.frenchResumeImg} className='resume' alt='French resume' />
                      <div className='layer'></div>
                      <p className='resume-lang'>{t("french")}</p>
                    </button>
                  </a>
                )}
              </div>
              <div className='content-resume'>
                {home.englishResumeLink && home.englishResumeImg && (
                  <a href={home.englishResumeLink} target="_blank" rel="noopener noreferrer">
                    <button className='resume-button resume2'>
                      <img src={home.englishResumeImg} className='resume' alt='English resume' />
                      <div className='layer'></div>
                      <p className='resume-lang'>{t("english")}</p>
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
          {[t("home"), t("aboutMe"), t("resume")].map((label, index) => (
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
