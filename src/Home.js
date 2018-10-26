import React from 'react';

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

class Home extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      returnedJson: [],
      apiKey: "83bab780be42486da3fe5870a46dfdba",
    };
  }

  getArticles(querySource) {
    var queryType = 'top-headlines';
      let url = "https://newsapi.org/v2/" + queryType + "?sources="
                  + querySource + "&apiKey=" + this.state.apiKey;

      fetch(url)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            return response.json();
          } else {
            throw "Not Found";
          }
        })
        .then((jsonData) => {
          console.log(jsonData.articles);
          this.setState({returnedJson: jsonData.articles});
        })  
        .catch((error) => {
          console.log(error);
        });
    }



  render() {
    var articlesToDisplay = [];

    if (this.state.returnedJson.length === 0) {
      this.getArticles("the-new-york-times");
    } else {
      for(let i = 0; i < this.state.returnedJson.length; i++) {
        articlesToDisplay.push(
          <Article
            ArticleSource = {this.state.returnedJson[i].source.name}
            ArticleTitle = {this.state.returnedJson[i].title}
            ArticleAuthor = {this.state.returnedJson[i].author}
            ArticleDescription = {this.state.returnedJson[i].description}
            ArticleUrl = {this.state.returnedJson[i].url}
            ArticleImageUrl = {this.state.returnedJson[i].urlToImage}
            ArticleDatePublished = {this.state.returnedJson[i].publishedAt}
            ArticleContent = {this.state.returnedJson[i].content}
          />
        );
      }
    }
    
    return (
    	<div className="Home-Content">
          	<div className="navDisplaySource">
            	<button onClick={() => {this.getArticles("the-new-york-times");}}>The New York Times</button>
          	 	<button onClick={() => {this.getArticles("bbc-news");}}>BBC News</button>
            	<button onClick={() => {this.getArticles("cnn");}}>CNN</button>
            	<button onClick={() => {this.getArticles("fox-news");}}>Fox News</button>
            	<button onClick={() => {this.getArticles("abc-news");}}>ABC News</button>
            	<button onClick={() => {this.getArticles("the-wall-street-journal");}}>The Wall Street Journal</button>
            	<button onClick={() => {this.getArticles("time");}}>Time</button>
            	<button onClick={() => {this.getArticles("the-washington-post");}}>The Washington Post</button>
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