export class YouTubeManager {
    constructor() {
        this.player = null;
    }

    onYouTubeIframeAPIReady() {
        this.player = new YT.Player('youtubePlayer', {
            height: '0',
            width: '0',
            videoId: '',
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    onPlayerStateChange(event) {
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = '0%';
        this.player.playVideo();
    }

    recreatePlayer() {
        if (this.player) {
            this.player.destroy();
        }
    
        this.onYouTubeIframeAPIReady();
    }

    onPlayerReady(event) {
        // 곡 목록을 로드하는 부분은 SongManager에서 처리하므로 이 함수는 필요에 따라 다른 로직으로 채울 수 있습니다.
    }

    playSong(youtubeLink) {
        const videoId = youtubeLink.split("v=")[1];
        this.player.loadVideoById(videoId);
    }
}
