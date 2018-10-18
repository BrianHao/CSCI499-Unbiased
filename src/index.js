import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* GrapheneDB Setup */
var neo4j = require('neo4j-driver').v1;
var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
var session = driver.session();

var session = driver.session();
session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });

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
            <img src={props.ArticleImageUrl} alt="" className="img-responsive"></img>
            </div>
            <div className="article-info col-sm-10">
              <div>{props.ArticleDatePublished}</div>
              <div>{props.ArticleDescription}</div>
             </div>
            </div>
        </div>
      </div>
    </div>
    );
}


// Content of website
class SiteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedJsonArticles: [],
      apiKey: "83bab780be42486da3fe5870a46dfdba",
      queryType: "everything",
      querySource: "the-new-york-times",
    };
  }

    getArticles() {
      let url = "https://newsapi.org/v2/" + this.state.queryType + "?sources="
                  + this.state.querySource + "&apiKey=" + this.state.apiKey;

      console.log("response.status");
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw "Not Found";
          }
        })
        .then((jsonData) => {
          this.setState({returnedJsonArticles: jsonData.articles});

        })
        .catch((error) => {
          console.log(error);
          this.setState({returnedJsonArticles: []});
        });
    }

  render() {
    let articlesToDisplay = [];

    for(let i = 0; i < this.state.returnedJsonArticles.length; i++) {
      articlesToDisplay.push(
          <Article
            ArticleSource = {this.state.returnedJsonArticles[i].source.name}
            ArticleTitle = {this.state.returnedJsonArticles[i].title}
            ArticleAuthor = {this.state.returnedJsonArticles[i].author}
            ArticleDescription = {this.state.returnedJsonArticles[i].description}
            ArticleUrl = {this.state.returnedJsonArticles[i].url}
            ArticleImageUrl = {this.state.returnedJsonArticles[i].urlToImage}
            ArticleDatePublished = {this.state.returnedJsonArticles[i].publishedAt}
            ArticleContent = {this.state.returnedJsonArticles[i].content}
          />
        );
    }

    return (
      <div className="site-content">
        <div className="nav-bar">
          <div className="version">
          Version: 0.01
          </div>
          <div className="navDisplayType">
            Show:{' '}
            <button onClick={() => {this.setState({queryType: "everything"}); this.getArticles();}}>All News</button>
            <button onClick={() => {this.setState({queryType: "top-headlines"}); this.getArticles();}}>Top Headlines</button>
          </div>
          <div className="navDisplaySource">
            From:{' '}
            <button onClick={() => {this.setState({querySource: "the-new-york-times"}); this.getArticles();}}>The New York Times</button>
            <button onClick={() => {this.setState({querySource: "bbc-news"}); this.getArticles();}}>BBC News</button>
            <button onClick={() => {this.setState({querySource: "cnn"}); this.getArticles();}}>CNN</button>
            <button onClick={() => {this.setState({querySource: "fox-news"}); this.getArticles();}}>Fox News</button>
            <button onClick={() => {this.setState({querySource: "abc-news"}); this.getArticles();}}>ABC News</button>
            <button onClick={() => {this.setState({querySource: "the-wall-street-journal"}); this.getArticles();}}>The Wall Street Journal</button>
            <button onClick={() => {this.setState({querySource: "time"}); this.getArticles();}}>Time</button>
            <button onClick={() => {this.setState({querySource: "the-washington-post"}); this.getArticles();}}>The Washington Post</button>
          </div>
        </div>
        <div className="articles-content" >
          {articlesToDisplay.length > 0 ? articlesToDisplay : <div>No Results</div>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <SiteContent onLoad={() => this.getArticles()} />,
  document.getElementById('content')
);