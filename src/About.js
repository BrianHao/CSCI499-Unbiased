import React from 'react';
import { Well, PageHeader } from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>
          About Unbiased <br /> <small>CUNY Hunter College CSCI-499 Capstone Project</small>
        </PageHeader>
      <Well>
        <h4>Our Team (Alphabetical Order):</h4>
        <ul>
        <li>Brian Hao</li>
        <li>Erica Hendricks-Elliston</li>
        <li>Phillip Foo</li>
        <li>Ricky Chan</li>
        </ul>
        <p>
          We created Unbiased to be a simple, minimalistic, and easy to use one-stop news aggregation web-app that displays articles from various top news sources. The goal is to allow users to view coverage of an event from multiple sources to provide to them a well-rounded and unbiased outlook that is not possible by just visiting any one singular source.
        </p>
      </Well>
      </div>
    );
  }
}

export default About;
