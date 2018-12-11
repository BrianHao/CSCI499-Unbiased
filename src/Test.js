import React from 'react';
import { Well } from 'react-bootstrap';
import { Form, Button, Textarea, Panel } from 'muicss/react';
import {compareTwoStrings} from './ComparisonFunction';

class Test extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      sentence1: "",
      sentence2: "",
      s1: "",
      s2: "",
      defaultStringSimilarity: "",
      customStringSimilarity: "",

    }
  }

  s1Changed = (event) => {
    this.setState({ sentence1: event.target.value });
  }

  s2Changed = (event) => {
    this.setState({ sentence2: event.target.value });
  }

  submit = () => {
    let s1 = this.state.sentence1;
    let s2 = this.state.sentence2;

    // Default String similarity
    var stringSimilarity = require('string-similarity');
    this.setState({ defaultStringSimilarity: stringSimilarity.compareTwoStrings(s1, s2) });

    // Our Custom String similarity
    this.setState({ customStringSimilarity: compareTwoStrings(s1, s2) });
  }

  render(){
    return (
    <div>
      <Well>
        <Form>
          <Textarea label="Sentence 1" onChange={this.s1Changed} />
          <Textarea label="Sentence 2" onChange={this.s2Changed} />
          <Button type="button" variant="raised" color="primary" onClick={() => this.submit()}>
            Test Similarities
          </Button>
        </Form>
      </Well>

      <Panel>
      Results <br />

      Default string-similarity: {this.state.defaultStringSimilarity} <br />
      Custom string-similarity: {this.state.customStringSimilarity}
      </Panel>


      <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    </div>
  )}
}

export default Test;
