import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Button from 'muicss/lib/react/button';

/* GrapheneDB Seraph Setup */

const url = require('url').parse(process.env.REACT_APP_GRAPHENEDB_URL)
const db = require("seraph")({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

/* Article Component */
function Article(props) {

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">[{props.ArticleSource}] {' '}
            <a href={props.ArticleUrl}>{props.ArticleTitle}</a></h3>
          </div>
          <div className="panel-body">
            <div className="article-image col-sm-2">
            {props.ArticleImageUrl !== 'N/A' ? <img src={props.ArticleImageUrl} alt="" className="img-responsive"></img> : <center>No Image</center>  }
            </div>
            <div className="article-info col-sm-8">
              <div>{props.ArticleDatePublished}</div>
              <div>{props.ArticleDescription}</div>
             </div>
             <div className="article-related-btn col-sm-2">
                <Link to={{ pathname:"/Related", state: { originalTitle: props.ArticleTitle } }}>
                  <Button variant="raised" color="primary">View Related</Button>
                </Link>
            </div>
            </div>
        </div>
      </div>
    </div>
    );
}

class Home extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      returnedJson: [],
      displaySource: "Random",
      displayTimeRange: "This Week",
    };
    this.getArticles = this.getArticles.bind(this);
  }

  getArticles(source, type) {
    let dateQuery = "";
    let cypherQuery = "";

    if (type === "Today") {
      let tempDate = new Date();
    let yy = tempDate.getFullYear();
    let mm = ((tempDate.getMonth()+1) < 10) ? "0" + (tempDate.getMonth()+1) : (tempDate.getMonth()+1);
    let dd = (tempDate.getDate() < 10) ? "0" + tempDate.getDate() : tempDate.getDate();
    let today = yy + '-' + mm + '-' + dd;

      dateQuery = "WITH * WHERE a.shortdate = '" + today + "'";
    }

    if (source === "Random") {
      cypherQuery = "MATCH (a:Article) WITH * WHERE rand() < 0.10 " + dateQuery + " RETURN a LIMIT 25";
    } else {
      cypherQuery = "MATCH (a:Article) WITH * WHERE a.source = '" + source + "' " + dateQuery + " RETURN a LIMIT 25";
    }

    //console.log(cypherQuery);

     db.query(cypherQuery,((err, results) => {
      if (err) {
        console.error('Error querying database for articles to display:', err);
      } else {
        //console.log('Success querying database for articles to display');
        this.setState({ returnedJson: results });
      }
    }));
    }



  render() {
    let articlesToDisplay = [];

    if (this.state.returnedJson.length === 0) {
      if (!(this.state.displaySource !== "Random" && this.state.displayTimeRange === "Today")) {
        this.getArticles("Random", "Today");
      }
    } else {
      for(let i = 0; i < this.state.returnedJson.length; i++) {
        articlesToDisplay.push(
          <Article
            //key = {this.state.returnedJson[i].title}
            ArticleSource = {this.state.returnedJson[i].source}
            ArticleTitle = {this.state.returnedJson[i].title}
            ArticleAuthor = {this.state.returnedJson[i].author}
            ArticleDescription = {this.state.returnedJson[i].description}
            ArticleUrl = {this.state.returnedJson[i].url}
            ArticleImageUrl = {this.state.returnedJson[i].urltoimage}
            ArticleDatePublished = {this.state.returnedJson[i].publishedat}
            ArticleContent = {this.state.returnedJson[i].content}
          />
        );
      }
    }
    
    return (
    	<div className="Home-Content">

        <div className="navBar">
          Displaying { }
          <span>
            <Dropdown color="default" label={this.state.displaySource}>
              <DropdownItem onClick={() => { this.setState({ displaySource: "Random"}); this.getArticles("Random", this.state.displayTimeRange); }} >Random</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "The New York Times"}); this.getArticles("The New York Times", this.state.displayTimeRange); }} >The New York Times</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "BBC News"}); this.getArticles("BBC News", this.state.displayTimeRange); }} >BBC News</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "CNN"}); this.getArticles("CNN", this.state.displayTimeRange); }} >CNN</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "Fox News"}); this.getArticles("Fox News", this.state.displayTimeRange); }} >Fox News</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "ABC News"}); this.getArticles("ABC News", this.state.displayTimeRange); }} >ABC News</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "The Wall Street Journal"}); this.getArticles("The Wall Street Journal", this.state.displayTimeRange); }} >The Wall Street Journal</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "Time"}); this.getArticles("Time", this.state.displayTimeRange); }} >Time</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displaySource: "The Washington Post"}); this.getArticles("The Washington Post", this.state.displayTimeRange); }} >The Washington Post</DropdownItem>
            </Dropdown>
          </span>
          { } articles from { }
          <span>
            <Dropdown color="default" label={this.state.displayTimeRange}>
              <DropdownItem onClick={() => { this.setState({ displayTimeRange: "Today"}); this.getArticles(this.state.displaySource, "Today"); }} >Today</DropdownItem>
              <DropdownItem onClick={() => { this.setState({ displayTimeRange: "This Week"}); this.getArticles(this.state.displaySource, "This Week"); }} >This Week</DropdownItem>
            </Dropdown>
          </span>
        </div>

          	<div className="Articles-Display">
          	 {articlesToDisplay.length > 0 ? articlesToDisplay : <div>No Results</div>  }
          	</div>
          <br />
          <br />
          <br />
          <br />
          <br />
  		</div>
    );
  }
}

export default Home;