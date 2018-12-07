//takes a sentence as a parameter and returns a sentence with all special characters removed
//Ex:       var test = 'The dog; ran to the other side of the field.';
//          removeSpecialChar(test)
//Output:   The dog ran to the other side of the field
//special characters include, but are not limited to: paren, semicolons, colons, brackets, ampersand
export function removeSpecialChar(sentence){
	sentence = sentence.replace(/[&\/\\#,+()$~%.'":;*?<>{}]/g, '');
 	return sentence;
}
