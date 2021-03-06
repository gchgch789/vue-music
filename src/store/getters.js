const getters = {
    singer: state => state.singer.singer,
    disc: state => state.disc.disc,
    topList: state => state.TopList.topList,

    searchHistory: state => state.searchHistory.searchHistory,
    playHistory: state => state.searchHistory.playHistory,
    favoriteList: state => state.searchHistory.favoriteList,

    playing: state => state.play.playing,
    fullScreen: state => state.play.fullScreen,
    playlist: state => state.play.playlist,
    sequenceList: state => state.play.sequenceList,
    mode: state => state.play.mode,
    currentIndex: state => state.play.currentIndex,
    currentSong: state => state.play.playlist[state.play.currentIndex] || {}
}


export default getters