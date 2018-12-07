//Based off of stackoverflow user geog's nGram function
//parameters: a sentence and an integer value n where n=desired n-gram
//returns array with each element an n-gram of the original argument sentence
export function ngrams(sentence, n) {
    //split sentence into array w each element a word from the sentence
    var arrayOfWords = sentence.split(' ');

    //create buffer to hold n elements
    let buf = [];
    //create array where each element in the array is an n-gram
		let nGramArray = [];

    var i, word;
    for(i=0; i < arrayOfWords.length; i++){
      word = arrayOfWords[i];
      buf.push(word);
      //if size of buffer is n, push ALL items from buffer into one element of nGramArray
      if (buf.length === n) {
        nGramArray.push(buf.join("")) // toggle param in join funct
        buf.shift();
    }
   }
   //return array
   //return nGramArray;

   //return sentence
    var finalSentence = nGramArray.join(" ");
    return finalSentence;
}


//var test = "The quick brown fox jumps over the lazy dog";
//document.write(ngrams(test, 5));
