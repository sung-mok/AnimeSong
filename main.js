import { YouTubeManager } from './YouTubeManager.js';
import { SongManager } from './SongManager.js';
import { UIManager } from './UIManager.js';

const youTubeManager = new YouTubeManager();
const songManager = new SongManager();
const uiManager = new UIManager();

// 이벤트 리스너 추가
document.getElementById('signpost').addEventListener('click', () => uiManager.moveToNextPhase());
document.getElementById('frameImage').addEventListener('click', () => uiManager.togglePlaybackMode());
document.getElementById('controlButton').addEventListener('click', () => uiManager.togglePlaybackMode());

document.getElementById('option1').addEventListener('click', function() {
    songManager.checkAnswer(this);
});
document.getElementById('option2').addEventListener('click', function() {
    songManager.checkAnswer(this);
});
document.getElementById('option3').addEventListener('click', function() {
    songManager.checkAnswer(this);
});

window.onload = function() {
    uiManager.updateModeIndicator();
    uiManager.preloadAssets();
    songManager.loadSongs();
};