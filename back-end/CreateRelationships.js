const stringSimilarity = require('string-similarity');
let similarity;

const neo4j = require ('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','csci499'));
const session = driver.session();



session.run('MATCH (n:Article) RETURN n')
.then(function(result){
  //session.close();
  var articles = [];
  result.records.forEach(function (record){
      articles.push({
        source: record._fields[0].properties.source,
        title: record._fields[0].properties.title,
        author: record._fields[0].properties.author,
        description: record._fields[0].properties.description,
        url: record._fields[0].properties.url,
        urlToImage: record._fields[0].properties.urltoimage,
        publishedAt: record._fields[0].properties.publishedat,
        content: record._fields[0].properties.content
      })
    });
    //console.log(articles.length);
    for(let i = 0; i < articles.length; i++){
      for (let j = 1; j<articles.length; j ++){
        if(articles[i].title !==  articles[j].title){
        similarity = stringSimilarity.compareTwoStrings(articles[i].description, articles[j].description);
        if(similarity > 0.5 ){
        session.run('MATCH (a:Article), (b:Article) WHERE a.title = $atitle and b.title = $btitle MERGE (a)-[r:related {similar: $percentage}]-(b)',
        {atitle: articles[i].title,
         btitle: articles[j].title,
         percentage: similarity})
         .then(function(result){
           session.close();
         })
         .catch(function(err){
           console.log(err);
         })
      }
      }
    }
    }


})

.catch(function(err){
  console.log(err);
})
