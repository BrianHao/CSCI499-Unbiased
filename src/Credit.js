import React from 'react';
import { Well, PageHeader, Tabs, Tab } from 'react-bootstrap';
import 'react-light-accordion/demo/css/index.css';

const Credit = () => (
  <div>
    <PageHeader>
      Credit <br /><small>Here are the resources and technologies we utilized to create this project.</small>
    </PageHeader>
    
    <div className="container-fluid">
      <Well className="col-xs-8 col-md-6 col-lg-3"  id="credits-box">
        <h3>Frontend:</h3>
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" alt="ReactJS logo"/></a>
      </Well>
      <Well className="col-xs-8 col-md-6 col-lg-3" id="credits-box">
      <h3>Backend:</h3>
        <a href="https://neo4j.com" target="_blank" rel="noopener noreferrer"><img src="https://neo4j.com/wp-content/themes/neo4jweb/assets/images/neo4j-logo-2015.png" alt="Neo4j logo" /></a>
      </Well>
      <Well className="col-xs-8 col-md-6 col-lg-3" id="credits-box">
      <h3>News Articles:</h3>
        <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"><img src="img/newsapi.jpg" alt="NewsAPI logo"/></a>
      </Well>
      <Well className="col-xs-8 col-md-6 col-lg-3" id="credits-box">
            <h3>String Comparison (Base):</h3>
        <a href="https://www.npmjs.com/package/string-similarity" target="_blank" rel="noopener noreferrer"><img src="http://outof.me/wp-content/uploads/2013/10/npm-onupdate-logo.png" alt="String Similarity logo"/></a>
      </Well>
      </div>
  </div>
);

export default Credit;
