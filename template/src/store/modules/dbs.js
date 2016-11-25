import * as types from '../mutation-types'
import * as status from '../status-types'
import storage from 'utils/configStorage'
import dbApi from 'api/dbApi'
import Vue from 'vue'

const state = {
  status: null, // To display the status to the user (Loading component).
  storage // Main object containing, data and file urls by lang.
}

const getters = {

  // Return a set of files in the desired locale, if there isn't, throw an error.
  filesLocalized: (state, getters) => {
    return Object.entries(state.storage).map( property => {
      let localized = {}
      localized.property = property[0]
      if (property[1][getters.currentLocale])
        localized.filename = property[1][getters.currentLocale]
      else
        throw new Error(`No ${property[0]} config found for locale \`${getters.currentLocale}\``)
      return localized
    })
  },

  dbs: state => state.storage
}

const actions = {

  // Fetch an array of localized files.
  fetchDbs (store, localized) {
    store.commit(types.LOAD_DB)

    Promise.all(localized.map( file => dbApi.fetchDB(file)))
    .then( response => {
      response.map( result => {
        store.commit({
          type     : types.UPDATE_DB,
          property : result.property,
          data     : result.data
        })
      })

      store.commit(types.DB_LOADED)
    })
    .catch( error => {
      store.commit(types.LOAD_DB_ERROR, error)
    })
  }
}

const mutations = {

  [types.LOAD_DB] (state, files) {
    state.status = status.LOADING
  },

  // When a db is loaded, replace the data entry in the storage object.
  [types.UPDATE_DB] (state, dbObject) {
    state.storage[dbObject.property].data = dbObject.data
  },

  [types.DB_LOADED] (state) {
    state.status = status.LOADED
  },

  [types.LOAD_DB_ERROR] (state, error) {
    state.status = status.LOAD_ERROR
    console.warn(error)
  }
}

// Add dynamic getters with the config file.
// A single file will be wrapped following this scheme
// {
//   name: first_data_file,
//   data: Array[]
// }
Object.entries(storage).map( entry => {
  Vue.set(getters, entry[0], () => ({name: entry[0], data: entry[1].data}))
})

// Export the module
export default {
  state,
  getters,
  actions,
  mutations
}
