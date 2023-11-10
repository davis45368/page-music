let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/MW4P7452RFI2DLP7MUQFLIEI6Y.jpg",
        name : "I don't Want To Miss A Thing",
        artist : "Aerosmith - Nico Borie ",
        music : "./music/Aerosmith - I don't Want To Miss A Thing En Español [Letra]   Interpretado Por Nico Borie.mp3"
    },
    {
        img : "https://i1.sndcdn.com/artworks-000201170675-qe8yrv-t500x500.jpg",
        name : "Another Love",
        artist : "Tom Odell",
        music : "./music/Tom Odell - Another Love.mp3"
    },
    {
        img : "https://storage.googleapis.com/stateless-elclubdelrock-com/2013/06/03-Led-Zeppelin-y-su-escalera-al-cielo-xx-436x500.jpg",
        name : "Stairway to Heaven",
        artist : "Led Zeppelin - Nico Borie",
        music : "./music/Stairway to Heaven - Led Zeppelin (cover en español por Nico Borie).mp3"
    },
    {
        img : "https://audiophileparadise.files.wordpress.com/2012/08/boneym.jpg",
        name : "Rasputin",
        artist : "Boney M",
        music : "./music/Boney M. - Rasputin (Sopot Festival 1979) (VOD)(MP3_160K).mp3"
    },
    {
        img : "https://c8.alamy.com/compes/2c0c8xp/lo-siento-escrito-a-mano-sobre-un-fondo-blanco-2c0c8xp.jpg",
        name : "I’m So Sorry",
        artist : "Imagine Dragons",
        music : "./music/I’m So Sorry.mp3"
    },
    {
        img : "https://upload.wikimedia.org/wikipedia/en/c/c6/Gangsta%27s_paradise.jpg",
        name : "Gangsta's Paradise",
        artist : "Coolio",
        music : "./music/Coolio - Gangsta's Paradise (Official Music Video) [HD] ft. L.V..mp3"
    },{
        img : "https://www.dafont.com/img/illustration/c/a/calm_down.png",
        name : "Calm Down",
        artist : "Rema",
        music : "./music/clamp down (lyrics).mp3"
    },
    {
        img : "https://ourbside.com/wp-content/uploads/2019/04/PUK.jpg",
        name : "Pumped Up Kicks",
        artist : "Foster The People",
        music : "./music/Pumped Up Kicks.mp3"
    },
    {
        img : "https://i.pinimg.com/564x/22/b3/10/22b3107d78306935700e8a046f91a00b.jpg",
        name : "LONG AS I CAN SEE THE LIGHT",
        artist : "CREEDENCE CLEAWATER REVIVAL",
        music : "./music/CREEDENCE CLEAWATER REVIVAL - LONG AS I CAN SEE THE LIGHT - Subtitulos Español _ Inglés(MP3_160K)_1.mp3"
    },
    {
        img : "https://upload.wikimedia.org/wikipedia/commons/6/6e/Starman_serie_TV.jpg",
        name : "Starman",
        artist : "David Bowie",
        music : "./music/David Bowie - Starman - Subtitulada (Español   Inglés).mp3"
    },
    {
        img : "https://images.cdn2.buscalibre.com/fit-in/360x360/03/fa/03fa16f9d04cf5308dcfec4f5c0fc609.jpg",
        name : "Sweet Child O' Mine",
        artist : "Guns N' Roses - Nico borie",
        music : "./music/Guns N' Roses - Sweet Child O' Mine En Español [Letra]   Interpretado Por Nico Borie.mp3"
    },
    {
        img : "https://media.vandal.net/m/10-2021/202110299354923_1.jpg",
        name : "Enemy",
        artist : "Imagine Dragons",
        music : "./music/Imagine Dragons - Enemy (Subtitulada al español) [solo version](MP3_160K).mp3"
    },
    {
        img : "https://i1.sndcdn.com/artworks-000283363568-5i4r2l-t500x500.jpg",
        name : "Mil Horas",
        artist : "Andres Calamaro",
        music : "./music/Mil Horas.mp3"
    },
    {
        img : "https://i.scdn.co/image/ab67616d0000b273703ca633d587153a9b614eb5",
        name : "Más Que Amigos",
        artist : "Matisse",
        music : "./music/Más Que Amigos - Matisse   Letra. ♡.mp3"
    },
    {
        img : "https://cdn3.vectorstock.com/i/1000x1000/97/87/dont-cry-hand-drawn-quotes-black-on-grunge-vector-5699787.jpg",
        name : "Don't Cry",
        artist : "Guns N' Roses - Nico borie",
        music : "./music/NICO BORIE - Don't Cry (Versión En Español) HQ.mp3"
    },
    {
        img : "https://i.ytimg.com/vi/42oK5vjD2UU/maxresdefault.jpg",
        name : "I Ain’t Worried",
        artist : "OneRepublic",
        music : "./music/OneRepublic - I Ain’t Worried (From “Top Gun Maverick”) [Official Music Video].mp3"
    },
    {
        img : "https://i.ytimg.com/vi/kINqJX6ChfA/maxresdefault.jpg",
        name : "Oye Mi Amor",
        artist : "Mana",
        music : "./music/Oye Mi Amor.mp3"
    },
    {
        img : "https://m.media-amazon.com/images/M/MV5BMjY2MDNmYWEtNGMzNC00YjdlLTkxYTItNTk3Njk1YTBiNzk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        name : "Another Day In Paradise",
        artist : "Phil Collins",
        music : "./music/Phil Collins - Another Day In Paradise (Official Music Video).mp3"
    },
    {
        img : "https://upload.wikimedia.org/wikipedia/en/d/dc/Stlove.jpg",
        name : "Somebody To Love",
        artist : "Queen",
        music : "./music/Queen - Somebody To Love (Traducida al español).mp3"
    },
    {
        img : "https://i.scdn.co/image/ab67616d0000b273e17498b2a89c000a29bbd209",
        name : "Past Lives",
        artist : "Sapientdream",
        music : "./music/sapientdream - past lives (lyrics).mp3"
    },
    {
        img : "https://i1.sndcdn.com/artworks-000145713910-2tm8te-t500x500.jpg",
        name : "Send Me An Angel",
        artist : "Scorpions",
        music : "./music/Scorpions - Send Me An Angel (Sub. Español).mp3"
    },
    {
        img : "https://http2.mlstatic.com/D_Q_NP_968753-MLM52540977765_112022-O.webp",
        name : "So Fine",
        artist : "Guns N' Rose",
        music : "./music/So Fine(MP3_160K).mp3"
    },
    {
        img : "https://i1.sndcdn.com/artworks-5VCxiNQdKysNTV2y-Qu5QwQ-t500x500.jpg",
        name : "Someone You Loved",
        artist : "Lewis Capaldi",
        music : "./music/Someone You Loved - Lewis Capaldi   Subtitulada   Lyrics.mp3"
    },
    {
        img : "https://upload.wikimedia.org/wikipedia/en/8/83/Scorpions-stilllovingyou1.jpg",
        name : "Still loving you",
        artist : "Scorpions",
        music : "./music/Still loving you- Scorpions Lyrics [English- Spanish][Español- Ingles].mp3"
    },
    {
        img : "https://i1.sndcdn.com/artworks-000028045050-fl26i2-t500x500.jpg",
        name : "Sweater Seather",
        artist : "The Neighbourhood",
        music : "./music/sweater weather - the neighbourhood   español (2).mp3"
    },
    {
        img : "https://i.ytimg.com/vi/HboHK7cr55A/maxresdefault.jpg",
        name : "Te Quiero",
        artist : "Hombres G",
        music : "./music/Te quiero.mp3"
    },
    {
        img : "https://ih1.redbubble.net/image.392173785.6769/pp,840x830-pad,1000x1000,f8f8f8.u3.jpg",
        name : "We Are The Champions",
        artist : "Quuen",
        music : "./music/We Are The Champions (Live).mp3"
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Música " + (track_index + 1) + " de " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() *14);
            let y = hex[x];
            a += y;
        }
        return a;
    }

    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}