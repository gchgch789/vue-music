const singer = {
    state: {
        singer: {},
        disc: {}
    },
    mutations: {
        SET_SINGER(state, singer) {
            state.singer = singer
        },
        SET_DISC(state, disc) {
            state.disc = disc
        }

    },
    actions: {

    }
}

export default singer