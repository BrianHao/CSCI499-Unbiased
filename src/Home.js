import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

/* GrapheneDB Seraph Setup */

const url = require('url').parse(process.env.REACT_APP_GRAPHENEDB_URL)
const db = require("seraph")({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

/* Article Component */
function Article(props) {
  let logosource = "img/" + props.ArticleSource + ".png";
  return (
    <div className="row" id="article-cards">
      <div className="col-xs-12">
        <div className="panel panel-info" id="shadow">
          <div className="panel-heading">
            <h3 className="panel-title"><b>
            <div className=" col-md-2"><center>
            <img src={logosource} alt={props.ArticleSource} id="source-img"></img></center></div> {' '}
            <a id="article-heading" href={props.ArticleUrl}>{props.ArticleTitle}</a>
            </b></h3>
          </div>
          <div className="panel-body">
            <div className="article-image col-md-2">
            {props.ArticleImageUrl !== 'N/A' ? <center><img id="article-image" src={props.ArticleImageUrl} alt="" className="img-responsive"></img></center> : <center>No Image Available</center>  }
            </div>
            <div className="article-info col-md-8">
              <div><b>Date: </b> {props.ArticleDatePublished}</div>
              <div><b>Description: </b>{props.ArticleDescription}</div>
             </div>
             <div className="article-related-btn col-md-2">
                <Link to={{ pathname:"/Related", state: { originalTitle: props.ArticleTitle } }}>
                  <center><Button variant="raised" color="primary" size="large" >View Related</Button></center>
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
      cypherQuery = "MATCH (a:Article) WITH * WHERE rand() < 0.10 " + dateQuery + " RETURN a ORDER BY  a.publishedat DESC LIMIT 25";
    } else {
      cypherQuery = "MATCH (a:Article) WITH * WHERE a.source = '" + source + "' " + dateQuery + " RETURN a ORDER BY  a.publishedat DESC LIMIT 25";
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
        <Navbar>
          <Navbar.Brand>
            Displaying
          </Navbar.Brand>
          <Nav>
            <NavDropdown title={this.state.displaySource} id="nav-news-source">
              <MenuItem onClick={() => { this.setState({ displaySource: "Random"}); this.getArticles("Random", this.state.displayTimeRange); }} >Random</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "The New York Times"}); this.getArticles("The New York Times", this.state.displayTimeRange); }} >The New York Times</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "BBC News"}); this.getArticles("BBC News", this.state.displayTimeRange); }} >BBC News</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "CNN"}); this.getArticles("CNN", this.state.displayTimeRange); }} >CNN</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "Fox News"}); this.getArticles("Fox News", this.state.displayTimeRange); }} >Fox News</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "ABC News"}); this.getArticles("ABC News", this.state.displayTimeRange); }} >ABC News</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "The Wall Street Journal"}); this.getArticles("The Wall Street Journal", this.state.displayTimeRange); }} >The Wall Street Journal</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "Time"}); this.getArticles("Time", this.state.displayTimeRange); }} >Time</MenuItem>
              <MenuItem onClick={() => { this.setState({ displaySource: "The Washington Post"}); this.getArticles("The Washington Post", this.state.displayTimeRange); }} >The Washington Post</MenuItem>
            </NavDropdown>
          </Nav>

          <Navbar.Brand>
            articles from
          </Navbar.Brand>
          <Nav>
            <NavDropdown title={this.state.displayTimeRange} id="nav-news-source">
              <MenuItem onClick={() => { this.setState({ displayTimeRange: "Today"}); this.getArticles(this.state.displaySource, "Today"); }} >Today</MenuItem>
              <MenuItem onClick={() => { this.setState({ displayTimeRange: "This Week"}); this.getArticles(this.state.displaySource, "This Week"); }} >This Week</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>

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
