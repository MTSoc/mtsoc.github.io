// Called automatically by the player_api script tag in index.html
function onYouTubePlayerAPIReady() {
    youtube = new YT.Player('player', {
        videoId: 'KoUbSExui7g',
        playerVars: {
            controls: 0 // Hide all controls
        },
        events: {
            onReady: on_player_ready,
            onStateChange: on_player_state_change
        }
    })
}

// Called when the player is ready to start
function on_player_ready() {
    youtube.mute()
    youtube.playVideo()
}

// Called when the player state changes
function on_player_state_change(state) {
    switch (state.data) {
    case YT.PlayerState.PLAYING:
        // Show the player
        player.style.opacity = 1
        // Hide the MTSoc logo just before the singing starts in the video
        setTimeout(function() {
            mtsoc_logo.style.opacity = 0
            player_cover.style.opacity = 0
        }, 11_000)
        break
    case YT.PlayerState.ENDED:
        // Hide player
        player.style.opacity = 0
        // Show static logo
        mtsoc_logo.style.opacity = 1
        // Scroll down to the About section when the video finishes
        if (document.body.scrollTop === 0) {          
            scroll_to('about')
        }
        break
    }
}

// Toggle sound on the player
function toggle_mute() {
    if (youtube) {
        if (youtube.isMuted()) {
            youtube.unMute()
            mute_button_img.src = '/images/symbols/speaker.wave.3.fill.png'
        } else {
            youtube.mute()
            mute_button_img.src = '/images/symbols/speaker.slash.fill.png'
        }
    }
}

// Toggle showing the navigation links in compact width
function toggle_nav_links() {
    nav_links.classList.add('transition')
    nav_links.classList.toggle('selected')
    nav_menu_img.src = nav_links.classList.contains('selected') ? '/images/symbols/xmark.png' : '/images/symbols/line.3.horizontal.png'

    // Stop animating the navigation links
    setTimeout(function() {
        nav_links.classList.remove('transition')
    }, 350)
}

// Scroll to the given content section
function scroll_to(anchor) {
    let element = document.getElementById(anchor)
    element.scrollIntoView()

    // Hide the navigation links where necessary
    if (nav_links.classList.contains('selected')) {
        toggle_nav_links()
    }
}