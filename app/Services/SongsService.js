import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  drawAudio(id) {
    let music = ProxyState.playlist.find(p => p.trackid == id)
    document.getElementById("audio").innerHTML = music.AudioTag
  }
  drawActiveSong(id) {
    let active = ProxyState.songs.find(s => s.trackid == id)
    ProxyState.activeSong = active
  }
  drawActivePlaylist(id) {
    let active = ProxyState.playlist.find(s => s.trackid == id)
    ProxyState.activeSong = active
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    ProxyState.songs = []
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    let res = await sandBoxApi.get("")
    ProxyState.playlist = res.data.map(p => new Song(p))
    console.log(ProxyState.playlist)
    console.log(res.data)
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?

    let song = ProxyState.songs.find(s => s.trackid == id)
    let res = await sandBoxApi.post("", song)
    ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    await sandBoxApi.delete(id)
    ProxyState.playlist = ProxyState.playlist.filter(p => p.trackid != id)
  }
}

const service = new SongsService();
export default service;
