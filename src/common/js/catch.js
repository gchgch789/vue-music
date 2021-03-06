import storage from 'good-storage'


const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 20


const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200


const FAVORITE_KEY = '__favorite'
const FAVORITE_LENGTH = 200






function insertArray(arr, val, compare, maxLen) {
    //查找是否有当前数据
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}


export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {

        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)
    return searches
}

//从本地读取searchList
export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

function deleteFromArray(arr, compare) {

    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }

}

export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}


//储存最近播放
export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {

        return item.id === song.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}


//储存最爱的歌曲
export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])

    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_LENGTH)
    storage.set(FAVORITE_KEY, songs)
    return songs
}

//删除最爱的歌曲
export function deleteFavorite() {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return songs.id === item.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}