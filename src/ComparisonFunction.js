//Phillip F's comparison implementation
//Modification of Compare.js' code
//Uses Dice algorithm as the main comparison tool
//Scalable nGram function

import {removeCommonWords} from './RemoveCommonWords';
import {removeSpecialChar} from './RemoveSpecialChar';
import {stemSentence} from './Stemmer';
import {ngrams} from './nGrams';

export function compareTwoStrings(string1, string2){

    //preliminary string checks
    if(!string1.length && !string2.length) return 0; // both are empty strings
    if(!string1.length || !string2.length) return 0; // one is an empty string;
    if(string1.toUpperCase() === string2.toUpperCase()) return 1; // same string

    //create standardization for the two sentences
    let sentence1 = removeSpecialChar(string1);
    sentence1 = removeCommonWords(sentence1);
    sentence1 = stemSentence(sentence1);
    //sentence1 = ngrams(sentence1, 1);
    let sentence2 = removeSpecialChar(string2);
    sentence2 = removeCommonWords(sentence2);
    sentence2 = stemSentence(sentence2);
    //sentence2 = ngrams(sentence2, 1);

    //comparison functionality begins here
    const sample1 = sentence1.toUpperCase().split(' '); //each element in array will be compared against all elements in sample2
    const sample2 = sentence2.toUpperCase().split(' '); //each element in array will be compared against all elements in sample1
    const union = sample1.length + sample2.length;
    let intersection = 0;

    //take one element in sample1 and compare it to all elements in sample2; interate through all elements in sample1
    sample1.forEach(sampleWord1 => {
      for(let i = 0, sampleWord2; sampleWord2 = sample2[i]; i++){
        if(sampleWord1 !== sampleWord2) continue;
        intersection++;
        sample2.splice(i, 1);
        break;
      }
    });
    return intersection * 2 / union;
}

//module.exports = { compareTwoStrings};
