import React from 'react';
import { Well, PageHeader } from 'react-bootstrap';
import {compareTwoStrings} from './ComparisonFunction';
import {atLeastOneMatch} from './AtLeastOneMatch';

/* GrapheneDB Seraph Setup */

const url = require('url').parse(process.env.REACT_APP_GRAPHENEDB_URL)
const db = require("seraph")({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

const NewsSources = ['the-washington-post','the-new-york-times','bbc-news', 'cnn', 'fox-news', 'abc-news', 'the-wall-street-journal', 'time'];

class Admin extends React.Component {

/* Gets articles from NewsAPI.org */
getArticles (){
  //console.log("===== Operation Start =====");
  for (let i = 0; i<NewsSources.length; i++){
    this.getArticlesFromSource('everything',NewsSources[i]);
    this.getArticlesFromSource('top-headlines',NewsSources[i]);
  }
}

/* Gets articles from each individual source in NewsSources */
getArticlesFromSource (queryType, querySource){
  //console.log("NewsAPI: Attempting to get " + queryType + " from " + querySource + ".");
  const fetch = require('node-fetch');
  let url ='https://newsapi.org/v2/' + queryType +
          '?sources=' + querySource +
          '&apiKey=83bab780be42486da3fe5870a46dfdba';

  fetch(url)
    .then((response) => {
      if(response.status === 200){
       return response.json();
     }})
    .then((jsonResponse) =>{
      console.log("NewsAPI: Getting " + queryType + " from " + querySource + " success.");
      this.storeArticles(jsonResponse.articles, queryType);
    })
    .catch(function(error){
      //console.log("NewsAPI: Getting " + queryType + " from " + querySource + " error.");
      console.log(error);
    })
}

/* Stores articles in the neo4j database */
storeArticles(articles, query){

//Add news source to database if doesn't already exist
var cypherQuery = "MERGE (n:NewsSource {id: {id}, name: {name}})";
db.query(
  cypherQuery,
  {id: articles[0].source.id, name:articles[0].source.name},
   function(err, results) {
  if (err) {
      console.error('Error saving new node to database:', err);
  } else {
    //var result = results[0];
    //console.log('Node saved to database with id:', result.id);
  }
});

//Add news articles to the database
for(let i =0; i<articles.length; i++) {
  //console.log("Neo4j: Attempting to store article #" + i+1 + " of " + articles.length);

  cypherQuery = "MERGE (a:Article {title: {title}, author: {author}, description: {description}, "
                  + "url: {url}, urltoimage: {urltoimage}, publishedat: {publishedat}, shortdate: {shortdate}, content: {content}, source: {source}})";
  db.query(
   cypherQuery,
   {title: articles[i].title === null ? 'N/A': articles[i].title,
        author: articles[i].author=== null ? 'N/A': articles[i].author,
        description: articles[i].description === null ? 'N/A': articles[i].description,
        url: articles[i].url === null ? 'N/A': articles[i].url,
        urltoimage: articles[i].urlToImage === null ? 'N/A': articles[i].urlToImage,
        publishedat: articles[i].publishedAt === null ? 'N/A': articles[i].publishedAt,
        shortdate: articles[i].publishedAt === null ? 'N/A': articles[i].publishedAt.substring(0, 10),
        content: articles[i].content=== null ? 'N/A': articles[i].content,
        source: articles[i].source.name || 'N/A'},
    function(err, results) {
    if (err) {
      console.log("Neo4j: Error storing article #" + i + " of " + articles.length);
      console.error('Error saving new node to database:', err);
    } else {
      //var result = results[0];
      console.log("Neo4j: Successfully stored article #" + (i+1) + " of " + articles.length);
      //console.log('Node saved to database with id:', result.id);
    }
  });

  // Relate articles to their respective source
  cypherQuery = "MATCH (n:NewsSource {name: {name}}), (a:Article {source: {name}}) MERGE (a)-[:source]-> (n)";
  db.query(
    cypherQuery,
    {name: articles[i].source.name, source: articles[i].source.name},
    function(err, results) {
    if (err) {
      console.log("Neo4j: Error matching article #" + i + " of " + articles.length + " to a source.");
      console.error('Error saving new node to database:', err);
    } else {
      //var result = results[0];
      console.log("Neo4j: Successfully matched article #" + (i+1) + " of " + articles.length + " to " + articles[i].source.name);
      //console.log('Node saved to database with id:', result.id);
    }
  });

    //Add date to database if doesn't already exist
  cypherQuery = "MERGE (d:Date {date: {date}})";
  db.query(
  cypherQuery ,
  {date: articles[i].publishedAt.substring(0, 10)},
   function(err, results) {
  if (err) {
      console.error('Error saving new node to database:', err);
  } else {
    //var result = results[0];
    //console.log('Node saved to database with id:', result.id);
  }
});

  // Relate articles to their respective date
  cypherQuery = "MATCH (d:Date {date: {date}}), (a:Article {shortdate: {shortdate}}) MERGE (a)-[:dateposted]-> (d)";
  db.query(
    cypherQuery,
    {date: articles[i].publishedAt.substring(0, 10), shortdate: articles[i].publishedAt.substring(0, 10)},
    function(err, results) {
    if (err) {
      console.log("Neo4j: Error matching article #" + i + " of " + articles.length + " to a date.");
      console.error('Error saving new node to database:', err);
    } else {
      //var result = results[0];
      console.log("Neo4j: Successfully matched article #" + (i+1) + " of " + articles.length + " to " + articles[i].publishedAt.substring(0, 10));
      //console.log('Node saved to database with id:', result.id);
    }
  });

}

}

createRelationships(){
  //const stringSimilarity = require('string-similarity');
  let similarity;
  //let dbArticles = [];

   var cypherQuery = 'MATCH (n:Article) RETURN n';
   db.query(cypherQuery, function(err, res){
     if(err){
       console.log(err);
     }
     else{
      console.log("Success retrieving all " + res.length + "articles");

      var cypherQueryII = 'MATCH (a:Article), (b:Article) WHERE a.title = $atitle and b.title = $btitle MERGE (a)-[r:related {similar: $percentage}]-(b)';

       for (let i = 0; i< res.length; i ++){
         for(let j = 1; j< res.length; j++){
           if(res[i].title  !== res[j].title){
             similarity = compareTwoStrings(res[i].description + " " + res[i].title, res[j].description + " " + res[j].title);
             if (similarity > 0.2 && atLeastOneMatch(res[i].title, res[j].title)){
               db.query(cypherQueryII,{atitle: res[i].title, btitle: res[j].title, percentage: similarity}, function(err, res){
                 if(err){
                   console.log(err);
                 }else{
                    console.log(similarity);
                 }
               })
             }
           }
         }
       }
       console.log("Done matching")
     }
   });

}

deleteAll(){
 var  cypherQuery = "MATCH (n) DETACH DELETE (n)";

  db.query(cypherQuery, function(err,res){
    if(err){
      console.log(err);
    }
    else{
      console.log("All nodes and relationships deleted from database");
    }
  })
}

CleanUp(){
  var cypherQuery = "MATCH (d:Date), (a:Article) WITH min(d) AS x  MATCH p=(a)-[r:dateposted]->(x) DETACH DELETE  a, x";
  db.query(cypherQuery, function(err,res){
    if(err){
      console.log(err);
    }
    else{
      console.log("Oldest Articles and respective Date node removed");
    }
  })
}


  render() {
    return (
      <div>
 	  	 <PageHeader>
        <font color="red">Admin Page</font>
        </PageHeader>
       <Well>
 	  	 <h2>Update Articles from NewsAPI</h2>
       <p>Clicking the following button will:</p>
       <ol>
       <li>Pull news articles from NewsAPI.org and store them in our neo4j Database</li>
       <li>Create a relation between each article and its source</li>
       <li>Create a relation between each article and its posted date in the format yyyy-mm-dd</li>
       </ol>
 	  	 <button onClick={() => {this.getArticles();}}>Update Articles</button>
       </Well>
       <Well>
       <h2>Relate Articles in Neo4j</h2>
       <p>Clicking the following button will relate articles to one another </p>
       <button onClick={()=>{this.createRelationships();}}> Relate Articles </button>
       </Well>
       <Well>
       <h2>Clean Up Articles in Neo4j</h2>
       <p>Clicking the following button will:</p>
       <ol>
       <li>Delete oldest articles in our neo4j Database</li>
       <li>Delete relationship  between  oldest articles and posted date</li>
       <li>Delete oldest date in Database </li>
       </ol>
       <button onClick={()=>{this.CleanUp();}}> Clean Up </button>
       </Well>
       <Well>
       <h2><font color = "red"> Clear Database</font></h2>
       <p><font color = "red">  THE FOLLOWING WILL DELETE ALL NODES AND RELATIONSHIPS IN DATABASE</font></p>
       <button onClick ={ () => {this.deleteAll();}}> <font color = "red"> Delete Database </font></button>
      </Well>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
      </div>
    );
  }
}

export default Admin;


/* Sample db code

var cypherQuery = "CREATE (n:Article {title: 'Article Title'}) RETURN n";
db.query(cypherQuery, function(err, results) {
  if (err) {
      console.error('Error saving new node to database:', err);
  } else {
    var result = results[0];
      console.log('Node saved to database with id:', result.id);
  }
});

*/
