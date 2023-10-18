export class UIManager {
    constructor() {
        this.currentPhase = 'phase0';
        this.currentMode = '일시정지';
        this.progressBarInterval = null;
    }

    updateModeIndicator() {
        const indicator = document.getElementById('modeIndicator');
        indicator.textContent = `모드: ${this.currentMode}`;
    }

    moveToNextPhase() {
        const currentElement = document.querySelector(`.${this.currentPhase}`);
        currentElement.classList.add('slide-out');
        this.currentPhase = `phase${parseInt(this.currentPhase.replace('phase', '')) + 1}`;
        const nextElement = document.querySelector(`.${this.currentPhase}`);
        nextElement.style.transform = 'translateX(0%)';
        
        if (this.currentPhase !== 'phase2') {
            this.currentMode = '일시정지';
            if (player) {
                player.pauseVideo();
            }
            document.getElementById('frameImage').src = 'frame_0.png';
            document.getElementById('controlButton').src = '재생버튼.png';
            this.updateModeIndicator();
        } else {
            if (player) {
                player.stopVideo();
            }
        }
    }

    preloadAssets() {
        const imagesToLoad = ["signpost.png", "재생버튼.png", "일시정지버튼.png", "tape.gif", "frame_0.png"];
        let loadedCount = 0;
        const totalToLoad = imagesToLoad.length + 1;
        
        imagesToLoad.forEach(src => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    this.moveToNextPhase();
                }
            };
            img.src = src;
        });
    }

    updateProgressBar() {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progressPercentage = (currentTime / duration) * 100;
    
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progressPercentage}%`;
    }

       togglePlaybackMode() {
        if (this.currentMode === '일시정지') {
            this.currentMode = '재생';
            
            if (!player.getVideoData().video_id) {
                playNextSong();
            } else {
                player.playVideo();
            }

            document.getElementById('frameImage').src = 'tape.gif';
            document.getElementById('controlButton').src = '일시정지버튼.png';
            this.progressBarInterval = setInterval(this.updateProgressBar, 1000);
        } else {
            this.currentMode = '일시정지';
            player.pauseVideo();
            document.getElementById('frameImage').src = 'frame_0.png';
            document.getElementById('controlButton').src = '재생버튼.png';
            clearInterval(this.progressBarInterval);
        }

        this.updateModeIndicator();
    }
}
