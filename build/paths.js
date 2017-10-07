const srcPath = './src';
// const destPath = './dist';
const testPath = './test';

module.exports = {
  srcMocha: [ `./${testPath}`, './', `./${srcPath}` ],
  watchMocha: [`${testPath}`, `${srcPath}`]
};
