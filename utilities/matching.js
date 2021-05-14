module.exports = function (tracks, matchcount ) {
    var songs = []
    var artists = []
    var albums = []
    var mixes = []

    const versions = ['clean', 'street', 'dirty', 'radio', 'instrumental', 'extended',
                    '7\"', 'album', 'acapella', 'lp', '12\"', 'long', 'short', 'mini' ,'vocal'
                    ]
    
    var songsMatch = false
    var artistsMatch=false
    var albumsMatch=false
    var mixesMatch=false

    this.matchCount = matchcount   

    tracks.forEach(function(song) {
      var songName = song.trackName 
      songs.push(songName)
    })
     
    tracks.forEach(function(arts) {
       var artistName = arts.artist 
        artists.push(artistName)
    })
       
    tracks.forEach(function(alb) {
        var albumName = alb.album 
        albums.push(albumName)
    })
        
    tracks.forEach(function(mixer) {
        var mixName = mixer.mix.toLowerCase()
        var source = mixer.source 
        mixes.push( `${source} :  ${mixName}`)
    })

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

    switch(this.matchCount)
    { 
        case 1: 
            console.log("Only ONE Matched")
            break;

        case 2: 
            console.log("Only TWO Matched")
            if((artistsMatch === true) && (songsMatch === true))
            {
                console.log("Mixes are : ", mixes)

                
            }
            break;

        case 3: 
            console.log("Only THREE Matched")

            if((artistsMatch === true) && (songsMatch === true) && (mixesMatch === true))
            { 
                this.matchCount = 4
            }
            
            if((artistsMatch === true) && (songsMatch === true))
            {
                console.log("Mixes are : ", mixes)

                mixes.forEach(function(mix) {
                    let mixName = mix
                    if (mixName.includes("Discogs"))
                    {
                        let variation = mixName.split(":")[1].trim()
                        console.log("variation is ", variation)

                        if(variation.includes(" "))
                        {
                            let variations = variation.split(" ")
                            let matches = 0                           

                            variations.forEach(function(variety) {
                                if(versions.indexOf(variety) > -1) {
                                    matches++
                                }
                            })

                            if(matches == variations.length)
                            { 
                                this.matchCount = 4  
                            }
                        } else {                            
                                let variations = [variation]
                                let matches = 0                           
    
                                variations.forEach(function(variety) {
                                    if(versions.indexOf(variety) > -1) {
                                        matches++
                                    }
                                })    
                                if(matches == variations.length)
                                { 
                                    this.matchCount = 4  
                                }                            
                        }
                    }})
            }

        break;

        default: 
        console.log("DEFAULT : Nothing Matched")
        break;
    }

    if(this.matchCount == 4)
    { 
        console.log("matchCount: ", this.matchCount)
        return this.matchCount
    }
    else {  
            return this.matchCount 
        }
  }

  
