import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DateDisplay from './DateDisplay';
import PrayerTimesComponent from './PrayerTimesComponent';
import WeatherDisplay from './WeatherDisplay';
import ConnectWithUs from './ConnectWithUs';
import Posters from './Posters';

const Layout = () => {
  return (
    <Container fluid className="min-vh-100 bg-cover bg-center p-4" style={{ backgroundImage: `url('/pics/banners/background.jpg')` }}>
      <Row>
        {/* Date and prayer times */}
        <Col xs={12} md={6} lg={4} className="flex flex-col justify-between mb-4 lg:mb-0">
          <DateDisplay />
          <PrayerTimesComponent />
        </Col>
        
        {/* Poster in the middle column */}
        <Col xs={12} md={6} lg={4} className="flex flex-col items-center justify-center mb-4 lg:mb-0">
          <Posters />
        </Col>
        
        {/* Weather and connect sections */}
        <Col xs={12} lg={4} className="flex flex-col justify-between">
          <WeatherDisplay />
          <ConnectWithUs />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
