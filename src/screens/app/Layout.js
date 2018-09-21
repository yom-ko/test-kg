import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = ({ children }) => (
  <Container>
    <Row>
      <Col>
        <div className="mx-auto" style={{ width: '70%', marginTop: '2rem' }}>
          {children}
        </div>
      </Col>
    </Row>
  </Container>
);

export default Layout;
