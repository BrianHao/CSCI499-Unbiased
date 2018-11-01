import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

const Credit = () => (
  <div>
    <h1>Credit</h1>
    <h2>Here are the resources utilized to create this project</h2>
    <Accordion atomic={true}>

      <AccordionItem title="Source 1">
        <p style={{ padding: '18px' }}>
          Souce for all news articles: <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">News API</button></a>
        </p>
      </AccordionItem>
      <AccordionItem title="Source 2">
        <p style={{ padding: '18px' }}>
          Backend database powered by: <a href="https://neo4j.com/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">Neo4j</button></a>
        </p>
      </AccordionItem>

      <AccordionItem title="Source 3">
        <p style={{ padding: '18px' }}>
          Powered by: <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><button type="button" name="button">Reactjs</button></a>
        </p>
      </AccordionItem>
      <AccordionItem title="Source 4">
        <p style={{ padding: '18px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </AccordionItem>

    </Accordion>
  </div>
);

export default Credit;
