import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiUsers, FiAward, FiClock, FiMapPin } from 'react-icons/fi';
import './about.css';

const AboutUs = () => {
  return (
    <div className="about-page">
    
      <section className="about-hero-section">
        <div className="about-container">
          <h1 className="about-hero-title">About Our College Library</h1>
          <p className="about-hero-subtitle">Discover the heart of academic excellence at our institution</p>
        </div>
      </section>

      
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-content">
            <div className="about-mission-text">
              <h2 className="about-section-title">Our Mission</h2>
              <p className="about-mission-paragraph">
                The College Library is dedicated to supporting the academic and research needs of our students and faculty. 
                We strive to provide equitable access to information resources, foster information literacy, and create 
                an environment conducive to learning and intellectual growth.
              </p>
              <p className="about-mission-paragraph">
                Our mission aligns with the college's commitment to academic excellence by providing comprehensive 
                resources and services that enhance teaching, learning, and research activities.
              </p>
            </div>
            <div className="about-mission-image">
              <img src="/assets/libraryinterior.jpg" alt="Library interior" className="about-mission-img" />
            </div>
          </div>
        </div>
      </section>

    
      <section className="about-history-section">
        <div className="about-container">
          <h2 className="about-section-title about-history-title">Our History</h2>
          <div className="about-timeline">
            <div className="about-timeline-item">
              <div className="about-timeline-year">1965</div>
              <div className="about-timeline-content">
                <h3 className="about-timeline-event">Foundation</h3>
                <p className="about-timeline-description">The college library was established with a modest collection of 2,000 books to serve the newly founded institution.</p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">1992</div>
              <div className="about-timeline-content">
                <h3 className="about-timeline-event">Expansion</h3>
                <p className="about-timeline-description">The library moved to its current location with expanded space and resources to accommodate growing student population.</p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2010</div>
              <div className="about-timeline-content">
                <h3 className="about-timeline-event">Digital Transformation</h3>
                <p className="about-timeline-description">Implemented our first digital catalog system and began offering e-resources to patrons.</p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2022</div>
              <div className="about-timeline-content">
                <h3 className="about-timeline-event">Modernization</h3>
                <p className="about-timeline-description">Completed comprehensive renovation with state-of-the-art study spaces and technology integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="about-stats-section">
        <div className="about-container">
          <h2 className="about-stats-title">By The Numbers</h2>
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <FiBook size={40} className="about-stat-icon" />
              <h3 className="about-stat-number">85,000+</h3>
              <p className="about-stat-label">Print Volumes</p>
            </div>
            <div className="about-stat-card">
              <FiUsers size={40} className="about-stat-icon" />
              <h3 className="about-stat-number">15,000+</h3>
              <p className="about-stat-label">Active Users</p>
            </div>
            <div className="about-stat-card">
              <FiAward size={40} className="about-stat-icon" />
              <h3 className="about-stat-number">50+</h3>
              <p className="about-stat-label">Academic Journals</p>
            </div>
            <div className="about-stat-card">
              <FiClock size={40} className="about-stat-icon" />
              <h3 className="about-stat-number">100+</h3>
              <p className="about-stat-label">Weekly Hours Open</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="about-facilities-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Facilities</h2>
          <div className="about-facilities-grid">
            <div className="about-facility-card">
              <img src="/assets/readingroom.webp" alt="Reading Room" className="about-facility-img" />
              <h3 className="about-facility-name">Main Reading Room</h3>
              <p className="about-facility-description">Quiet study space with natural lighting and comfortable seating for 200 students.</p>
            </div>
            <div className="about-facility-card">
              <img src="/assets/computerlab.jpeg" alt="Computer Lab" className="about-facility-img" />
              <h3 className="about-facility-name">Computer Lab</h3>
              <p className="about-facility-description">40 workstations with academic software and high-speed internet access.</p>
            </div>
            <div className="about-facility-card">
              <img src="/assets/groupstudyroom.jpeg" alt="Group Study" className="about-facility-img" />
              <h3 className="about-facility-name">Group Study Rooms</h3>
              <p className="about-facility-description">12 bookable rooms equipped with whiteboards and presentation displays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <h2 className="about-cta-title">Experience Our Library</h2>
          <p className="about-cta-subtitle">Visit us today and discover all the resources we have to offer</p>
          <div className="about-cta-buttons">
            <Link to="/visit" className="about-btn about-btn-primary">
              <FiMapPin className="about-icon" /> Visit Us
            </Link>
            <Link to="/services" className="about-btn about-btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;