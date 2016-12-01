const options = {
  BASE_URL: 'https://graphics.afpforum.com/data/TEST_DATA_VUEJS_TRANSLATE/',
  PREPROD: 'preprod/',
  FILE_EXTENSION: '.json',
  globals: 'globals',

  // Helper to build clean url.
  _url: filename => {
    let url = options.BASE_URL
    if (process.env.NODE_ENV === 'development') url += options.PREPROD
    url += filename + options.FILE_EXTENSION
    return options.BASE_URL + filename + options.FILE_EXTENSION
  }
}

export default options
