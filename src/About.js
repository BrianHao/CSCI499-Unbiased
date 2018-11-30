import React from 'react';
import { Well, PageHeader } from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>
          About
        </PageHeader>
      <Well>
        <h2>CUNY Hunter College CSCI-499 Capstone Project</h2>
        <h3>Unbiased Web App</h3>
        <p>All news outlets have their own take on worldwide events, their own biases tawords these events."UNBIASED" attemps to lessen the biases by compiling all major news post of a certain event/topic.

            Users themselves upon seeing all the renditions of the event will determine what is right and what is wrong. Giving users a more in depth and more accurate view of the world.

            So if you see an article that interests you click 'View Related' to get your UNBIASED view.
        </p>
      </Well>
      </div>
    );
  }
}

export default About;
