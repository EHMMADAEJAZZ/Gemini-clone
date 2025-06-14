export  function checkHeading(str){
    const headingRegex = /\*\*|\*(?!\*)/g; 
    return headingRegex.test(str);
  }