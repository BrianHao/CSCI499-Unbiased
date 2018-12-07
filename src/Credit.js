import React from 'react';
import { Well, PageHeader, Tabs, Tab } from 'react-bootstrap';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

const Credit = () => (
  <div>
    <PageHeader>
      Credit
    </PageHeader>
    <Well>
    <h2>Here are the resources utilized to create this project</h2>

    <Tabs defaultActiveKey={1} id="credits">
      <Tab eventKey={1} title="NewsAPI.org">
        Source for all news articles: {" "}
        <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"><img src="img/newsapi.jpg" alt="NewsAPI logo"/></a>

      </Tab>
      <Tab eventKey={2} title="Neo4j">
         Powered by: {" "}
         <a href="https://neo4j.com" target="_blank" rel="noopener noreferrer"><img src="img/neo4j.png" alt="Neo4j logo" /></a>
      </Tab>
      <Tab eventKey={3} title="ReactJS">
        Powered by: {" "}
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><img src="img/reactjs.png" alt="ReactJS logo"/></a>
      </Tab>
    </Tabs>
    </Well>
  </div>
);

export default Credit;
