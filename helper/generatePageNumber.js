const generatePageNumber = (page, pageTotal) => {
  const range = [];
  const delta = 2;
  for (let i = 1; i <= pageTotal; i++) {
    if (
      i === 1 ||
      i === pageTotal ||
      (i >= page - delta && i <= page + delta) ||
      i === pageTotal
    ) {
      range.push(i);
    }
  }

  for(let i = 0; i < range.length - 1; i++) {
    if(range[i+1] - range[i] > 1){
      range.splice(i+1, 0, '...'); 
    }
  }

  return range;
};

// console.log(generatePageNumber(3, 10)); // Example usage, can be removed later

module.exports = { generatePageNumber };
