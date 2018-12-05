import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button';
import { PageHeader } from 'react-bootstrap';

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
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title"><b>
            <div className=" col-md-2"><center>
            <img src={logosource} alt={props.ArticleSource} id="source-img"></img></center></div> {' '}
            <a id="article-heading" href={props.ArticleUrl}>{props.ArticleTitle}</a> 
            
            </b></h3>
          </div>
          <div className="panel-body">
            <div className="article-image col-md-2">
            {props.ArticleImageUrl !== 'N/A' ? <center><img src={props.ArticleImageUrl} alt="" className="img-responsive"></img></center> : <center>No Image</center>  }
            </div>
            <div className="article-info col-md-10">
              <div><b>Date: </b> {props.ArticleDatePublished}</div>
              <div><b>Description: </b>{props.ArticleDescription}</div>
              <div><b>Content: </b>{props.ArticleContent}</div>
             </div>
            </div>
        </div>
      </div>
    </div>
    );
}

function ArticleRelated(props) {
  let logosource = "img/" + props.ArticleSource + ".png";
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><b>
            <div className=" col-md-2"><center>
            <img src={logosource} alt={props.ArticleSource} id="source-img"></img></center></div> {' '}
            <a id="article-heading" href={props.ArticleUrl}>{props.ArticleTitle}</a> 
            
            </b></h3>
          </div>  
          <div className="panel-body">
            <div className="article-image col-sm-2">
            {props.ArticleImageUrl !== 'N/A' ? <center><img src={props.ArticleImageUrl} alt="" className="img-responsive"></img></center> : <center>No Image</center>  }
            </div>
            <div className="article-info col-md-10">
              <div><b>Date: </b> {props.ArticleDatePublished}</div>
              <div><b>Description: </b>{props.ArticleDescription}</div>
              <div><b>Content: </b>{props.ArticleContent}</div>
             </div>
            </div>
        </div>
      </div>
    </div>
    );
}



class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisArticleJson: null,
      relatedArticlesJson: null,
    };
    this.getMainArticle = this.getMainArticle.bind(this);
    this.getRelatedArticles = this.getRelatedArticles.bind(this);
  }

  getMainArticle(title) {
    let cypherQuery = "MATCH (a:Article {title: \"" + title + "\"}) RETURN a";

     db.query(cypherQuery,((err, results) => {
      if (err) {
        //console.error('Error querying database for articles to display:', err);
      } else {
        //console.log('Success querying database for articles to display');
        this.setState({ thisArticleJson: results[0] });
      }
    }));
    }

    getRelatedArticles(title) {
    let cypherQuery = "MATCH (a:Article {title: \"" + title + "\"})-[rel:related]->(b:Article) RETURN b LIMIT 5";

     db.query(cypherQuery,((err, results) => {
      if (err) {
        console.error('Error querying database for articles to display:', err);
      } else {
        //console.log(results);
        //console.log('Success querying database for articles to display');
        this.setState({ relatedArticlesJson: results });
      }
    }));
    }


  render() {
    const {originalTitle} = this.props.location.state;
    let thisArticle = [];
    let relatedArticles = [];

    if (this.state.thisArticleJson === null) {
      this.getMainArticle(originalTitle);
    } else {
      thisArticle.push(
        <Article
            //key = {this.state.returnedJson[i].title}
            ArticleSource = {this.state.thisArticleJson.source}
            ArticleTitle = {this.state.thisArticleJson.title}
            ArticleAuthor = {this.state.thisArticleJson.author}
            ArticleDescription = {this.state.thisArticleJson.description}
            ArticleUrl = {this.state.thisArticleJson.url}
            ArticleImageUrl = {this.state.thisArticleJson.urltoimage}
            ArticleDatePublished = {this.state.thisArticleJson.publishedat}
            ArticleContent = {this.state.thisArticleJson.content}
          />
        )
    }

    if (this.state.relatedArticlesJson === null) {
      this.getRelatedArticles(originalTitle);
    } else {
      for(let i = 0; i < this.state.relatedArticlesJson.length; i++) {
        relatedArticles.push(
          <ArticleRelated
            //key = {this.state.returnedJson[i].title}
            ArticleSource = {this.state.relatedArticlesJson[i].source}
            ArticleTitle = {this.state.relatedArticlesJson[i].title}
            ArticleAuthor = {this.state.relatedArticlesJson[i].author}
            ArticleDescription = {this.state.relatedArticlesJson[i].description}
            ArticleUrl = {this.state.relatedArticlesJson[i].url}
            ArticleImageUrl = {this.state.relatedArticlesJson[i].urltoimage}
            ArticleDatePublished = {this.state.relatedArticlesJson[i].publishedat}
            ArticleContent = {this.state.relatedArticlesJson[i].content}
          />
        );
      }
    }
    

    return (
      <div>
      <PageHeader>
        <small>Selected Article:</small>
      </PageHeader>
        <div className="selected-article">
          {thisArticle.length > 0 ? thisArticle : <div>Error displaying selected article</div>  }
        </div>

        <div id="heading1">
        <PageHeader>
          <small>Related Articles:</small>
      </PageHeader>
        </div>

        <div className="related-articles">
          {relatedArticles.length > 0 ? relatedArticles : <div>No Related Articles</div>  }
        </div>

        <br />
        <div className="go-back-button">
                <Link to="/">
                  <Button variant="raised" color="primary" size="large">Back</Button>
                </Link>
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

export default Related;
