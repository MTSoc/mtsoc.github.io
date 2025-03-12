// Load the YouTube Iframe API
var player_script = document.createElement('script');
player_script.src = "https://www.youtube.com/iframe_api";
var first_script = document.getElementsByTagName('script')[0];
first_script.parentNode.insertBefore(player_script, first_script);

// Called automatically by the player_api script tag in index.html
function onYouTubeIframeAPIReady() {
    console.log('YouTube Iframe API ready')
    youtube = new YT.Player('player', {
        videoId: 'rxtisCN5f4s',
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
    console.log('YouTube player ready')
    youtube.mute()
    youtube.playVideo()
}

// Called when the player state changes
function on_player_state_change(state) {
    console.log('Player state changed to', state.data)
    switch (state.data) {
    case YT.PlayerState.PLAYING:
        // Show the player
        player.style.opacity = 1
        // Hide the MTSoc logo just before the singing starts in the video
        setTimeout(function() {
            player_logo.style.opacity = 0
            player_cover.style.opacity = 0
        }, 2_000)
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
    
    for (var show of shows.slice(0, 12)) {
        if (show.url) {
            show_element = document.createElement('a')
            show_element.href = show.url
            show_element.target = '_blank'
        } else {
            show_element = document.createElement('div')
        }
        show_element.classList.add('show')
        shows_grid.appendChild(show_element)

        var image = document.createElement('img')
        image.classList.add('show_img')
        image.src = 'static/images/shows/' + show.image
        show_element.appendChild(image)

        var row = document.createElement('div')
        row.classList.add('content_row', 'show_title')
        show_element.appendChild(row)

        if (show.url) {
            var image = document.createElement('img')
            image.src = 'static/images/symbols/youtube.png'
            image.classList.add('icon', 'primary_icon')
            row.appendChild(image)
        }

        var title = document.createElement('h4')
        title.innerHTML = show.title
        row.appendChild(title)
    }
}

// Load the committee members from the JSON file
async function load_committee() {
    var response = await fetch('static/data/committee.json')
    var committee = await response.json()

    for (member of committee) {
        var member_div = document.createElement('div')
        member_div.classList.add('content_item')
        committee_grid.appendChild(member_div)

        var headshot = document.createElement('img')
        headshot.classList.add('headshot')
        headshot.src = 'static/images/committee/24/' + member.image
        member_div.appendChild(headshot)

        var title_div = document.createElement('div')
        member_div.appendChild(title_div)

        var name = document.createElement('h2')
        name.innerHTML = member.name
        title_div.appendChild(name)

        var pronouns = document.createElement('p')
        pronouns.classList.add('prominent')
        pronouns.innerHTML = '(' + member.pronouns + ')'
        title_div.appendChild(pronouns)

        var role = document.createElement('p')
        role.classList.add('secondary', 'prominent')
        role.innerHTML = member.role
        title_div.appendChild(role)

        var bio = document.createElement('p')
        bio.innerHTML = member.bio
        member_div.appendChild(bio)
    }
}

load_shows().then()
load_committee().then()
