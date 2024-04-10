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
        <Col md={4} className="">
          <DateDisplay />
          <PrayerTimesComponent />
        </Col>
        
        {/* Poster in the middle column */}
        <Col md={4} className="">
          <Posters />
        </Col>
        
        {/* Weather and connect sections */}
        <Col md={4} className="">
          <WeatherDisplay />
          <ConnectWithUs />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
