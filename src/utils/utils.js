
// generate a random seed
export const generateRandomSeed = () => {
    var characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    var randomSeed = "";
    for (var i = 0; i < 44; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      randomSeed += characters.charAt(randomIndex);
    }
    return randomSeed;
  };
  
  // truncate a string (useful for wallet addresses and long seed values) 
 export const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr;
    const separator = "...";
    let separatorLength = separator.length;
    const charsToShow = strLen - separatorLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
    );
  };
  