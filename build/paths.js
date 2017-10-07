const srcPath = './src';
const destPath = './dist';
const testPath = './test';

module.exports = {
  minifiedOutput: 'prettyLetters',
  destPath,
  srcPath: `${srcPath}/prettyLetters.js`,
  srcMocha: [ `./${testPath}`, './', `./${srcPath}` ],
  watchMocha: [`${testPath}/**`, `${srcPath}/**`]
};
