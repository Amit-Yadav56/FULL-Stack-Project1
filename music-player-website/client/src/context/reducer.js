//export the action type
//whenever any action(like fetching the user) we need to set a action type

export const actionType = {
    SET_USER: 'SET_USER',
    SET_ALL_USERS: 'SET_ALL_USERS',
    SET_ALL_ARTISTS: 'SET_ALL_ARTISTS',
    SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
    SET_ALL_SONGS: 'SET_ALL_SONGS',
    SET_SONG_PLAYING: 'SET_SONG_PLAYING',
    SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_MINI_PLAYER: "SET_MINI_PLAYER",
    SET_SONG: "SET_SONG",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_FILTERED_SONG: "SET_FILTERED_SONG",
}

const reducer = (state, action) => {
    console.log(action)
    console.log(state)
    //switch statement that evaluates the action.type to determine how to update the state.
    switch (action.type) {
        //In the case where action.type is 'SET_USER', it returns a new state object with the user property updated to the value of action.user.
        case actionType.SET_USER:
            return {
                ...state,//create shallow copy of state
                user: action.user,

            }
        case actionType.SET_ALL_USERS:
            return {
                ...state,//create shallow copy of state
                allUsers: action.allUsers,

            }
        case actionType.SET_ALL_ALBUMS:
            return {
                ...state,//create shallow copy of state
                allAlbums: action.allAlbums,

            }
        case actionType.SET_ALL_ARTISTS:
            return {
                ...state,//create shallow copy of state
                allArtists: action.allArtists,

            }
        case actionType.SET_ALL_SONGS:
            return {
                ...state,//create shallow copy of state
                allSongs: action.allSongs,

            }
        case actionType.SET_SONG_PLAYING:
            return {
                ...state,//create shallow copy of state
                isSongPlaying: action.isSongPlaying,

            }
        case actionType.SET_ARTIST_FILTER:
            return {
                ...state,
                artistFilter: action.artistFilter,
            };

        case actionType.SET_LANGUAGE_FILTER:
            return {
                ...state,
                languageFilter: action.languageFilter,
            };
        case actionType.SET_ALBUM_FILTER:
            return {
                ...state,
                albumFilter: action.albumFilter,
            };

        case actionType.SET_FILTER_TERM:
            return {
                ...state,
                filterTerm: action.filterTerm,
            };
        case actionType.SET_SONG:
            return {
                ...state,
                song: action.song,
            };
        case actionType.SET_MINI_PLAYER:
            return {
                ...state,
                miniPlayer: action.miniPlayer,
            };
        case actionType.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.searchTerm,
            };
        case actionType.SET_FILTERED_SONG:
            return {
                ...state,
                filteredSongs: action.filteredSongs,
            };



        default:
            return state;
    }
};

export default reducer