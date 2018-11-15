/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let arr = []
  if ((s.length > 20100) || (p.length > 20100) ) throw new Error('Too long!')
  let pArr = p.split('').sort().join('')
  let pLen = pArr.length
  for(let i = 0;i<s.length;i++){
    let substr = s.substr(i, pLen).split('').sort().join('')
    if (substr === pArr) arr.push(i)
  }
  return arr
};
var result = findAnagrams('abab','ab')
console.log(result)