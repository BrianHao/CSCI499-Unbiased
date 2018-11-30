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
        Souce for all news articles: <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">News API</button></a>
      </Tab>
      <Tab eventKey={2} title="Neo4j">
        Souce for all news articles: <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">News API</button></a>
      </Tab>
      <Tab eventKey={3} title="ReactJS">
        Powered by: <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">Reactjs</button></a>
      </Tab>
    </Tabs>
    </Well>
  </div>
);

export default Credit;
