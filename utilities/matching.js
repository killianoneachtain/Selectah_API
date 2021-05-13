module.exports = function (tracks, matchcount ) {
    var songs = []
    var artists = []
    var albums = []
    var mixes = []
    
    var songsMatch = false
    var artistsMatch=false
    var albumsMatch=false
    var mixesMatch=false

    this.matchCount = matchcount   

    tracks.forEach(function(song) {
      var songName = song.trackName 
      songs.push(songName)})
     
    tracks.forEach(function(arts) {
       var artistName = arts.artist 
        artists.push(artistName)})
       
    tracks.forEach(function(alb) {
        var albumName = alb.album 
        albums.push(albumName)})
        
    tracks.forEach(function(mixer) {
        var mixName = mixer.mix 
        mixes.push(mixName)})

    if(artists[0] === artists[1] || artists[0].toLowerCase() === artists[1].toLowerCase()
        || artists[0].replace(" ","").toLowerCase() === artists[1].toLowerCase() 
        || artists[0].toLowerCase() === artists[1].replace(" ","").toLowerCase() )
        {
            this.matchCount = this.matchCount + 1 
            artistsMatch = true
        }
    console.log("Artists : ", artistsMatch)

    if(albums[0] === albums[1])
    { 
        this.matchCount = this.matchCount + 1 
        albumsMatch = true
    }
    console.log("albums : ", albumsMatch)

    if(songs[0] === songs[1])
    { 
        this.matchCount = this.matchCount + 1 
        songsMatch = true
    }
    console.log("Songs : ", songsMatch)

    if(mixes[0] === mixes[1])
    { 
        this.matchCount = this.matchCount + 1 
        mixesMatch = true
    }
    console.log("mixes : ", mixesMatch)

    if(this.matchCount == 4)
    { 
        console.log("matchCount: ", this.matchCount)
        return this.matchCount
    }
    else {  
            return this.matchCount 
        }
  }

  
