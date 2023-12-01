// Setup
let mtsoc_logo = document.getElementById('mtsoc_logo')
let nav_links = document.getElementById('nav_links')
let nav_menu_img = document.getElementById('nav_menu_img')
let intro = document.getElementById('intro')
let player_cover = document.getElementById('player_cover')
let down_button = document.getElementById('down_button')
let mute_img = document.getElementById('mute_img')
let unmute_img = document.getElementById('unmute_img')

// YouTube Player
let player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        videoId: 'KoUbSExui7g',
        playerVars: {
            controls: 0
        },
        events: {
            onReady: on_player_ready,
            onStateChange: on_player_state_change
        }
    })
}

function on_player_ready(event) {
    player.mute()
    player.playVideo()
}

function on_player_state_change(event) {  
    let player_element = document.getElementById('player') 
    console.log(event.data)
    switch (event.data) {
    case YT.PlayerState.PLAYING:
        // Show player
        player_element.style.opacity = 1
        // Hide MTSoc logo just before the singing starts in the video
        setTimeout(function() {
            mtsoc_logo.style.opacity = 0
            player_cover.style.opacity = 0
            down_button.style.opacity = 1
        }, 11_000)
        break
    case YT.PlayerState.ENDED:
        // Hide player
        player_element.style.opacity = 0
        // Show static logo
        mtsoc_logo.style.opacity = 1
        // Scroll down to next section when video finishes
        if (document.body.scrollTop === 0) {          
            scroll_to('about')
        }
        break
    }
}

// Functions
function toggle_mute() {
    if (player) {
        if (player.isMuted()) {
            player.unMute()
            mute_button_img.src = '/images/symbols/speaker.wave.3.fill.png'
        } else {
            player.mute()
            mute_button_img.src = '/images/symbols/speaker.slash.fill.png'
        }
    }
}

function update_nav_menu_img() {
    if (nav_links.classList.contains('selected')) {
        nav_menu_img.src = '/images/symbols/xmark.png'
    } else {
        nav_menu_img.src = '/images/symbols/line.3.horizontal.png'
    }
}

function toggle_nav_links() {
    nav_links.classList.add('transition')
    nav_links.classList.toggle('selected')
    update_nav_menu_img()
    setTimeout(function() {
        nav_links.classList.remove('transition')
    }, 350)
}

function scroll_to(anchor) {
    let element = document.getElementById(anchor)
    element.scrollIntoView()

    nav_links.classList.add('transition')
    nav_links.classList.add('selected')
    toggle_nav_links()
}

// On load
update_nav_menu_img()