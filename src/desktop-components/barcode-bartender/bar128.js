module.exports = (text) => {
  var x = text;
  var i, j, intWeight, intLength, intWtProd = 0, arrayData = [], fs;
  var arraySubst = [ "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê" ];
    
  intLength = x.length;
  arrayData[0] = 104;
  intWtProd = 104;

  for (j = 0; j < intLength; j += 1) {
    arrayData[j + 1] = x.charCodeAt(j) - 32;
    intWeight = j + 1;
    intWtProd += intWeight * arrayData[j + 1];
  }

  arrayData[j + 1] = intWtProd % 103; 
  arrayData[j + 2] = 106; 
  chr = parseInt(arrayData[j + 1], 10); 

  if (chr > 94) {
    chrString = arraySubst[chr - 95];
  } else {
    chrString = String.fromCharCode(chr + 32);
  }
      
  return 'Ì' + x + chrString + 'Î';
};