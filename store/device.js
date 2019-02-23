export const state = () => ({
  map: [],
  list: []
})

export const getters = {
}

export const mutations = {
  SET_MAP: (state, map) => {
    state.map = map
  },
  SET_LIST: (state, list) => {
    state.list = list
  }
}
