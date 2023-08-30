// Setup
let logo = document.getElementById('logo')
let nav_links = document.getElementById('nav_links')
let player_cover = document.getElementById('player_cover')
let down_button = document.getElementById('down_button')
let mute_img = document.getElementById('mute_img')
let unmute_img = document.getElementById('unmute_img')

// On load
mute_img.style.display = 'none'

// Functions
let player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        videoId: 'KoUbSExui7g',
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'controls': 0,
            'playlist': 'KoUbSExui7g'
        },
        events: {
            'onReady': start_player
        }
    })
}

function start_player() {
    player.mute()
    player.playVideo()

    // Hide MTSoc logo when singing starts
    setTimeout(function() {
        logo.style.opacity = 0
        player_cover.style.opacity = 0
    }, 11_000)
}

function toggle_mute() {
    if (player) {
        if (player.isMuted()) {
            player.unMute()
            mute_img.style.display = 'block'
            unmute_img.style.display = 'none'
        } else {
            player.mute()
            mute_img.style.display = 'none'
            unmute_img.style.display = 'block'
        }
    }
}

function toggle_nav_links() {
    if (nav_links.classList.contains('hidden')) {
        nav_links.classList.remove('hidden')
    } else {
        nav_links.classList.add('hidden')
    }
}

function scroll_to(anchor) {
    let element = document.getElementById(anchor)
    element.scrollIntoView()
    nav_links.classList.add('hidden')
}