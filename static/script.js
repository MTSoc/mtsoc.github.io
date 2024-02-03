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
            player_logo.style.opacity = 0
            player_cover.style.opacity = 0
        }, 11_000)
        break
    case YT.PlayerState.ENDED:
        // Hide player
        player.style.opacity = 0
        // Show static logo
        player_logo.style.opacity = 1
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
            mute_button_img.src = 'static/images/symbols/speaker.wave.3.fill.png'
        } else {
            youtube.mute()
            mute_button_img.src = 'static/images/symbols/speaker.slash.fill.png'
        }
    }
}

// Toggle showing the navigation links in compact width
function toggle_nav_links() {
    nav_links.classList.add('transition')
    nav_links.classList.toggle('selected')
    nav_menu_img.src = nav_links.classList.contains('selected') ? 'static/images/symbols/xmark.png' : 'static/images/symbols/line.3.horizontal.png'

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

// Load the shows from the JSON file
async function load_shows() {
    var response = await fetch('static/data/shows.json')
    var shows = await response.json()
    
    for (show of shows) {
        var show_div = document.createElement('div')
        show_div.classList.add('show')

        var image = document.createElement('img')
        image.classList.add('show_img')
        image.src = 'static/images/shows/' + show.image
        show_div.appendChild(image)

        var title = document.createElement('h4')
        title.classList.add('show_title')
        title.innerHTML = show.title
        show_div.appendChild(title)

        past_shows.appendChild(show_div)
    }
}

// Load the committee members from the JSON file
async function load_committee() {
    var response = await fetch('static/data/committee.json')
    var committee = await response.json()

    for (member of committee) {
        var member_div = document.createElement('div')
        member_div.classList.add('content_item')

        var headshot = document.createElement('img')
        headshot.classList.add('headshot')
        headshot.src = 'static/images/committee/' + member.image
        member_div.appendChild(headshot)

        var title_div = document.createElement('div')
        var name = document.createElement('h2')
        name.innerHTML = member.name
        title_div.appendChild(name)

        var pronouns = document.createElement('p')
        pronouns.classList.add('prominent')
        pronouns.innerHTML = '(' + member.pronouns + ')'
        title_div.appendChild(pronouns)

        var role = document.createElement('p')
        role.classList.add('committee_role', 'prominent')
        role.innerHTML = member.role
        title_div.appendChild(role)
        member_div.appendChild(title_div)

        var bio = document.createElement('p')
        bio.innerHTML = member.bio
        member_div.appendChild(bio)

        committee_grid.appendChild(member_div)
    }
}

load_shows().then()
load_committee().then()
