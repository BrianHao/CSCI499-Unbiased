//const default = 'N/A';

function getArticles (queryType, querySource){

const fetch = require('node-fetch');

let url ='https://newsapi.org/v2/' + queryType +
          '?sources=' + querySource +
          '&apiKey=e98ef28c9b8b44f4b45618759567ad8d';

fetch(url)
.then(function(response){
    if(response.ok){
      return response.json();
    }
}).then(function(jsonResponse){
//  let i =0;
  //console.log(jsonResponse.articles[i]);
  storeArticles(jsonResponse.articles, queryType);
})
.catch(function(error){
  console.log(error);
})
}




function storeArticles(articles, query){

  const neo4j = require ('neo4j-driver').v1;
  const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','csci499'));
  const session = driver.session();


  //Add news source to database if doesn't already exist
  session.run('MERGE (n:NewsSource {id: $id, name: $name})', {id: articles[0].source.id, name:articles[0].source.name})
  .then(function(result){
    session.close();
  })
  .catch(function(err){
    console.log(err);
    session.close();
  });

  //Add news articles ot the database
  for(let i =0; i<articles.length; i++)
  {

    Promise.all([
      session.run(
      'MERGE (a:Article {title:$title, author: $author, description: $description, url: $url, urltoimage: $urltoimage, publishedat: $publishedat, content: $content, source: $source})',
      {title: articles[i].title === null ? 'N/A': articles[i].title,
      author: articles[i].author=== null ? 'N/A': articles[i].author,
      description: articles[i].description === null ? 'N/A': articles[i].description,
      url: articles[i].url === null ? 'N/A': articles[i].url,
      urltoimage: articles[i].urlToImage === null ? 'N/A': articles[i].urlToImage,
      publishedat: articles[i].publishedAt === null ? 'N/A': articles[i].publishedAt,
      content: articles[i].content=== null ? 'N/A': articles[i].content,
      source: articles[i].source.name || 'N/A'}),

      // create a relationship between the  article and the source
      session.run('MATCH (n:NewsSource {name: $name}), (a:Article {source: $name}) MERGE (a)-[:source]-> (n)', {name: articles[i].source.name, source: articles[i].source.name}),

    ])
      .then(function(result){
        session.close();
      })
      .catch(function(err){
      console.log(err);
      session.close();
      });




  }

}

const  NewsSources = ['the-washington-post','the-new-york-times','bbc-news', 'cnn', 'fox-news', 'abc-news', 'the-wall-street-journal', 'time'] ;

for (let i = 0; i<NewsSources.length; i++){

getArticles('top-headlines',NewsSources[i]);

}
