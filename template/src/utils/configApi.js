const options = {
  BASE_URL: 'https://graphics.afpforum.com/data/TEST_DATA_VUEJS_TRANSLATE/',
  FILE_EXTENSION: '.json',
  globals: 'globals',

  // Helper to build clean url.
  _url: filename => options.BASE_URL + filename + options.FILE_EXTENSION
}

export default options
