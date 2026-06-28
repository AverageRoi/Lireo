const musicProjects = [
    {
        title: "Forever Destined",
        type: "EP",
        cover: "https://i1.sndcdn.com/artworks-uxf8XxYTgoOFGBh1-YzyYjQ-t500x500.jpg",
        description:
            "A collection of instrumental tracks for a videogame I worked on. 'Can you outrun the weight of your sin? Or does your past claw deep within? In shadows thick, a flicker of flame, A fleeting hope to undo your name' Forever Destined is a story of guilt and forgiveness from your own past.",
        soundcloudUrl: "https://soundcloud.com/lireomusic/sets/forever-destined",
        embedUrl:
            "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1968417444&color=%23ff8000&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
        tracks: [
            {
                title: "Tracks:"
            },
            {
                title: "Forever Destined"
            },
            {
                title: "But It Was Not Just A Dream"
            },
            {
                title: "Kace Village"
            },
            {
                title: "Aisha's House (day)"
            },
            {
                title: "Aisha's House (night)"
            }
        ]
    },

    {
        title: "Within Reach",
        type: "Album",
        cover: "https://i1.sndcdn.com/artworks-aOZv1wnoO5qBxvbD-IeASAQ-t1080x1080.jpg",
        description:
            "This album represents a lot. Sometimes we have something or someone that makes such a huge impact on our lives, we don’t even have time to react. Within Reach represents the time to say goodbye to that something or someone. Life takes and gives, and we are forced to move on.",
        soundcloudUrl: "https://soundcloud.com/lireomusic/sets/within-reach",
        embedUrl:
            "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2074686393&color=%23ff8000&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
        tracks: [
            {
                title: "Tracks:"
            },
            {
                title: "Within Reach"
            },
            {
                title: "Snowfell"
            },
            {
                title: "Memories"
            },
            {
                title: "Make a decision"
            },
            {
                title: "Not right"
            },
            {
                title: "Middle of Nowhere"
            },
            {
                title: "Drowning"
            }
        ]
    }
];

const musicGrid = document.querySelector("#music-grid");

function getInitials(title) {
    return title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function createMusicMedia(project) {
    const media = document.createElement("div");
    media.className = "music-media";

    if (project.cover) {
        const image = document.createElement("img");
        image.className = "music-image";
        image.src = project.cover;
        image.alt = `${project.title} cover artwork`;
        image.loading = "lazy";
        media.append(image);
        return media;
    }

    const initials = document.createElement("span");
    initials.className = "music-initials";
    initials.textContent = getInitials(project.title);
    media.append(initials);

    return media;
}

function createTrackList(tracks) {
    const list = document.createElement("ol");
    list.className = "track-list";

    tracks.forEach((track) => {
        const item = document.createElement("li");
        item.className = "track-item";

        const title = document.createElement("span");
        title.className = "track-title";
        title.textContent = track.title;

        const duration = document.createElement("span");
        duration.className = "track-duration";
        duration.textContent = track.duration || "";

        item.append(title, duration);
        list.append(item);
    });

    return list;
}

function createTags(tags) {
    const tagList = document.createElement("div");
    tagList.className = "tag-list";

    tags.forEach((tag) => {
        const tagItem = document.createElement("span");
        tagItem.className = "tag";
        tagItem.textContent = tag;
        tagList.append(tagItem);
    });

    return tagList;
}

function createListenArea(project) {
    const listenArea = document.createElement("div");
    listenArea.className = "listen-area";

    if (project.soundcloudUrl) {
        const link = document.createElement("a");
        link.className = "listen-link";
        link.href = project.soundcloudUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Listen on SoundCloud";
        listenArea.append(link);
    }

    if (project.embedUrl) {
        const iframe = document.createElement("iframe");
        iframe.className = "music-embed";
        iframe.title = `${project.title} player`;
        iframe.allow = "autoplay; encrypted-media";
        iframe.src = project.embedUrl;
        listenArea.append(iframe);
    }

    const playableTracks = project.tracks?.filter((track) => track.src) || [];

    playableTracks.forEach((track) => {
        const audio = document.createElement("audio");
        audio.className = "music-player";
        audio.controls = true;
        audio.preload = "metadata";
        audio.src = track.src;
        listenArea.append(audio);
    });

    return listenArea;
}

function createMusicCard(project) {
    const card = document.createElement("article");
    card.className = "music-card";

    const content = document.createElement("div");
    content.className = "music-content";

    const type = document.createElement("p");
    type.className = "music-type";
    type.textContent = `${project.type}`;

    const title = document.createElement("h2");
    title.className = "music-title";
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "music-description";
    description.textContent = project.description;

    content.append(type, title, description);

    if (project.tracks?.length) {
        content.append(createTrackList(project.tracks));
    }

    if (project.tags?.length) {
        content.append(createTags(project.tags));
    }

    content.append(createListenArea(project));
    card.append(createMusicMedia(project), content);

    return card;
}

musicProjects.forEach((project) => {
    musicGrid.append(createMusicCard(project));
});
