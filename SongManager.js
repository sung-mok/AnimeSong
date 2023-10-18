export class SongManager {
    constructor() {
        this.songs = [];
        this.playOrder = [];
        this.currentIndex = 0;
    }

    loadSongs() {
        fetch('./Song.json')
            .then(response => response.json())
            .then(data => {
                this.songs = Object.entries(data.Sheet1).map(([id, song]) => {
                    song.id = Number(id);
                    return song;
                });
                this.updateSongCount();
            });
    }

    playNextSong() {
        if (this.playOrder.length === 0) {
            alert("모든 노래를 재생하였습니다.");
            return;
        }

        const songId = this.playOrder[0];
        const song = this.songs.find(s => s.id === songId);
        if (!song) {
            alert("노래를 찾을 수 없습니다.");
            return;
        }

        playSong(song.youtube_link);
        showSongInfo(song);
        this.playOrder.splice(0, 1);
        this.updateSongCount();
    }

    showSongInfo(song) {
        const songInfoElement = document.getElementById('songInfo');
        songInfoElement.textContent = `제목: ${song.title}, 작품: ${song.related_work}`;
        songInfoElement.style.display = 'block';
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    updateSongCount() {
        const songCountElement = document.getElementById('songCount');
        songCountElement.textContent = `곡 수: ${this.playOrder.length}`;
    }

    setOptions(correctTitle) {
        const options = [correctTitle];
        while (options.length < 3) {
            const randomIndex = Math.floor(Math.random() * this.songs.length);
            const title = this.songs[randomIndex].title;
            if (options.indexOf(title) === -1) {
                options.push(title);
            }
        }
        
        options.sort(() => Math.random() - 0.5);
        
        document.getElementById('option1').textContent = options[0];
        document.getElementById('option2').textContent = options[1];
        document.getElementById('option3').textContent = options[2];
    }

    checkAnswer(selectedOption) {
        const correctTitle = document.getElementById('songInfo').textContent.split(":")[1].trim().split(",")[0];
        if (selectedOption.textContent === correctTitle) {
            alert("정답입니다!");
        } else {
            alert("틀렸습니다. 정답은 " + correctTitle + " 입니다.");
        }
        this.playNextSong();
    }
}
