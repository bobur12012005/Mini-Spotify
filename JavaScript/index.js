import { songs } from "./db.js"

let audio = document.getElementById('audio')
let container = document.querySelector('.elements')
let liked = []
let nameSong = document.querySelector('.playerData span')
let imagesong = document.querySelector('.playerData .imagesong')

function reload(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let song = document.createElement('div')
        let more = document.createElement('div')
        let number = document.createElement('span')
        let song_img = document.createElement('img')
        let TS = document.createElement('div')
        let song_title = document.createElement('span')
        let song_singer = document.createElement('span')
        let album = document.createElement('div')
        let album_txt = document.createElement('span')
        let release = document.createElement('div')
        let release_txt = document.createElement('span')
        let actions = document.createElement('div')
        let like_btn = document.createElement('button')
        let like_img = document.createElement('img')
        let duration = document.createElement('span')
        let play_btn = document.createElement('button')
        let play_icon = document.createElement('img')

        song.classList.add('song')
        more.classList.add('more')
        number.classList.add('number')
        song_img.classList.add('song_img')
        TS.classList.add('TS')
        song_title.classList.add('song_title')
        song_singer.classList.add('song_singer')
        album.classList.add('album')
        release.classList.add('release')
        actions.classList.add('actions')
        like_btn.classList.add('like_btn')
        play_btn.classList.add('play_btn')

        number.innerHTML = item.id
        song_title.innerHTML = item.title
        song_singer.innerHTML = item.singer.name
        album_txt.innerHTML = item.album
        release_txt.innerHTML = item.release
        duration.innerHTML = item.duration

        song_img.src = item.image
        like_img.src = './Icons/heart.png'

        container.append(song)
        song.append(more, album, release, actions)
        more.append(number, song_img, TS)
        TS.append(song_title, song_singer)
        album.append(album_txt)
        release.append(release_txt)
        actions.append(duration, like_btn)
        like_btn.append(like_img)
        play_btn.append(play_icon)

        song.onmouseenter = () => {
            number.remove()
            more.append(play_btn, song_img, TS)
            play_icon.src = './Icons/play.png'

            play_btn.onclick = () => {
                document.querySelectorAll('.song').forEach((song) => {
                    song.querySelector('.TS').style.color = ''
                    song.querySelector('.album').style.color = ''
                    song.querySelector('.release').style.color = ''
                    song.querySelector('.actions').style.color = ''
                })

                audio.src = item.url
                play_icon.src = './Icons/pause.png'
                audio.play()
                nameSong.innerHTML = item.title
                imagesong.src = item.image
                
                TS.style.color = '#00FF00'
                album.style.color = '#00FF00'
                release.style.color = '#00FF00'
                actions.style.color = '#00FF00'
                
                if (document.querySelector('.TS').style.color === 'white') {
                    play_icon.src = './Icons/play.png'
                } else if (document.querySelector('.TS').style.color === '#00FF00') {
                    play_icon.src = './Icons/pause.png'
                }
            }
        }

        song.onmouseleave = () => {
            play_btn.remove()
            more.append(number, song_img, TS)
        }

        like_btn.onclick = () => {
            let index = liked.findIndex((likedItem) => likedItem.id === item.id)

            if (!like_btn.classList.contains('like_active')) {
                like_img.src = './Icons/heartFull.png'
                like_btn.classList.add('like_active')
                liked.push(item)
            } else {
                like_img.src = './Icons/heart.png'
                like_btn.classList.remove('like_active')
                if (index !== -1) {
                    liked.splice(index, 1)
                }
            }
            console.log(liked)
        }
    }
}

reload(songs, container)