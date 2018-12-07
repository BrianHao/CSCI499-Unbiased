//var test = "This is a test string";
//var test2 ="This is another test string";

//bigram implementation
function compareTwoStrings(string1, string2){


    //preliminary string checks
    if(!string1.length && !string2.length) return 1; // both are empty strings
    if(!string1.length || !string2.length) return 0; // one is an empty string;
    if(string1 === string2) return 1; // same string

    // seperate words in string
	  sentence1 = string1.toLowerCase().split(' ');
    sentence2 = string2.toLowerCase().split(' ');

    //secondary checks
    if(sentence1.length === 1 && sentence2.length === 1) return 0; // both are one word sentences
    if (sentence1.length < 2 || sentence2.length <2) return 0; // either is a one word sentence



    let intersection = 0.0;

    //bigram comparison
    let bigrams = [];
    for(let i = 0; i < sentence1.length - 1; i++)
        bigrams.push(sentence1[i] + sentence1[i+1]);


    for(let i = 0; i<sentence2.length - 1; i ++){
        if(bigrams[i] === sentence2[i] + sentence2[i+1]){
            intersection ++;
            bigrams[i] == null;
        }
    }

    return (2.0 * intersection) / (sentence1.length + sentence2.length - 2 )

}


// Trigram implementation
function compareTwoStrings( string1, string2){

    if(!string1.length && !string2.length) return 1; // both are empty strings
    if(!string1.length || !string2.length) return 0; // one is an empty string;
    if(string1 === string2) return 1; // same string

    // seperate words in string
	  sentence1 = string1.toLowerCase().split(' ');
    sentence2 = string2.toLowerCase().split(' ');

    //secondary checks
    if(sentence1.length < 3 && sentence2.length < 3) return 0; // both are one word/ two word sentences
    if(sentence1.length < 3 || sentence2.length < 3) return 0; // either is a one word/two word sentence


    let intersection = 0.0;

    //trigram comparison
    let trigrams = [];
    for(let i = 0; i< sentence1.length - 2 ; i++){
        trigrams.push(sentence1[i] + sentence1[i+1] + sentence1[i+2]);
    }

    for(let i = 0; i<sentence2.length -2; i++){
            if( trigrams[i] === sentence2[i] + sentence2[i+1] + sentence2[i+2]){
                intersection ++;
                trigrams[i] = null;
            }
    }

    return (2.0 * intersection) / (sentence1.length + sentence2.length - 4 )
}


/*var result = compareTwoStringsBi(test, test2);
var result2 = compareTwoStringsTri (test, test2);

console.log(result);
console.log(result2); */
