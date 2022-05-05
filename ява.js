const player = document.querySelector('.player'),
		play = document.querySelector('.playBtn'),
		prev = document.querySelector('.prevBtn'),
		next = document.querySelector('.nextBtn'),
		audio = document.querySelector('.audio'),
		progBar = document.querySelector('.progBar'),
		prog = document.querySelector('.prog'),
		songImg = document.querySelector('.songImg'),
		songName = document.querySelector('.songName'),
		cover = document.querySelector('.cover')


const songs = ['Выдыхай - Noize MC','Вояджер-1 - Noize MC','Столетняя война - Noize MC','26.04 - Noize MC','Noize MC — Иордан (Feat. Atlantida Project)','KERRIGAN - Pyrokinesis','В небо коза ёмоё - Pyrokinesis','Цветами радуги - Pyrokinesis','Pyrokinesis – 31006 (feat. DAKOOKA)','Агент - Oxxxymiron','Переплетено - Oxxxymiron','Пантеллерия - Oxxxymiron','Jungle joyride - Sonic Unleashed (Day)','Cool edge - Sonic Unleashed (Night)','Werehog battle theme - Sonic Unleashed','Rules of nature - Metal Gear Rising','The Stains of Time - Metal Gear Rising','The Only Thing I Know For Real - Metal Gear Rising','String Theocracy - Mili','The Only Thing They Fear Is You - Mick Gordon & Chad Mossholder']

let songIndex = 0

function loadSong(song){
	songName.innerHTML = song
	audio.src = 'музыка/'+song+'.mp3'
	songImg.src = 'songImg/'+song+'.jpg'
}


loadSong(songs[songIndex])

function playSong() {
	player.classList.add('play')
	audio.play()
	cover.src = 'playerImg/pause.png'
}

function pauseSong() {
	player.classList.remove('play')
	audio.pause()
	cover.src = 'playerImg/play.png'
}

play.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying){
		pauseSong()
	}
	else{
		playSong()
	}
})

function nextSong() {
	songIndex++

	if (songIndex > songs.length - 1) {
		songIndex = 0
	}
	
	loadSong(songs[songIndex])
	playSong()
}

next.addEventListener('click', nextSong)

function prevSong(){
	if(songIndex==0){
		songIndex=songs.length 
	}
	songIndex--
	loadSong(songs[songIndex])
	playSong()
}

prev.addEventListener('click', prevSong)

function updateProgress(e){
	const {duration, currentTime} = e.srcElement
	const progressPercent = (currentTime/duration)*100
	prog.style.width = progressPercent+'%'
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e){
	const width = this.clientWidth
	const clickX = e.offsetX
	const duration = audio.duration

	audio.currentTime = (clickX/width)*duration
}

progBar.addEventListener('click', setProgress)

audio.addEventListener('ended',nextSong)