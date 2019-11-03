/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import bannerMuse from '../../images/bannermuse.jpg';
import bannerNovartis from '../../images/bannernovartis.jpg';
import bannerBayer from '../../images/bannerbayer.png';
import './AdRotator.scss';

const links = [
  'http://www.muse.mu',
  'http://www.novartis.com.ar',
  'http://www.bayer.com.ar'
];

const openAd = idx => {
  window.open(links[idx]);
};

export const AdRotator = () => (
  <Carousel
    infiniteLoop
    autoPlay
    showArrows={false}
    propTables={false}
    width="700px"
    interval={2500}
    showThumbs={false}
    showIndicators={false}
    showStatus={false}
    onClickItem={openAd}
  >
    <div className="ad-rotator-image">
      <img src={bannerMuse} />
    </div>
    <div className="ad-rotator-image">
      <img src={bannerNovartis} />
    </div>
    <div className="ad-rotator-image">
      <img src={bannerBayer} />
    </div>
  </Carousel>
);
