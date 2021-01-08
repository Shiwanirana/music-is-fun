export default class Song {
    constructor(data) {
      this.title = data.trackName || data.title;
      this.albumArt =
        data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
      this.artist = data.artistName || data.artist;
      this.album = data.collectionName || data.album;
      this.price = data.trackPrice || data.price;
      this.preview = data.previewUrl || data.preview;
      this.trackid = data.trackId || data._id;
    }
  
    get Template() {
      return/*html*/`
      <div class=" col-sm-12 h-25 shadow-lg box-shadow">
      <div class="card mb-3" onclick="app.songsController.drawActiveSong(${this.trackid})" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img class="img-fluid" src="${this.albumArt}" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${this.artist}</h5>
          <p class="card-text">${this.title}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
          `
    }
  
    get playlistTemplate() {
      return /*html*/`
      <div class="card  mx-5 my-2 box-shadow" onclick="app.songsController.drawActivePlaylist('${this.trackid}')">
    <div class="card-body p-0 d-flex flex-column align-items-center">
    <i class="fa fa-trash text-danger align-self-end" aria-hidden="true" onclick="app.songsController.removeSong('${this.trackid}')"></i>
      <p>${this.artist}</p>
      <p onclick="app.songsController.drawAudio(${this.trackid})">${this.title}</p>
      </div>
    </div>
          `
    }
  
    get AudioTag() {
      return /*html*/`
  <audio autoplay>
  <source src="${this.preview}" type="audio/ogg">
  </audio>
  `
  
    }
  
    get ActiveTemplate() {
      return /*html*/ `
      <div class="card max-height">
      <div class="card-body text-center">
      <div class="text-right">
      <button class="btn btn-success text-end" onclick="app.songsController.addSong(${this.trackid})"><i class="fa fa-plus-square" aria-hidden="true"></i></button>
      </div>
      <img class="card-img-top img-fluid" src="${this.albumArt}" alt="">
          <h2>${this.artist} - ${this.title}</h2>
          <p>Album: ${this.album} | Buy Now $${this.price}</p>
          <audio class="" controls>
          <source src="${this.preview}" class="bg-secondary" type="audio/ogg"></audio>
        </div>
        </div>
      
      `
    }
  }
