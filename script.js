// 获取页面元素
const idiomInput = document.getElementById('idiom-input');
const generateVideoBtn = document.getElementById('generate-video-btn');
const keyframeImagesDiv = document.getElementById('keyframe-images');
const generatedVideo = document.getElementById('generated-video');

// 模拟的文生视频 API 调用函数（实际需替换为真实调用外部服务的函数）
async function generateVideoFromIdiom(idiom) {
    // 这里应该按照你的文生视频服务要求构造请求，发送包含成语的请求去获取视频相关数据
    // 比如关键帧描述、视频文件等，此处假设返回的视频数据是一个 URL
    const videoUrl = await fetchVideoUrlFromApi(idiom);
    return videoUrl;
}

// 模拟的获取关键帧图片 URL 数组的函数（实际需替换为真实调用外部服务的函数）
async function getKeyframeImagesUrls(idiom) {
    // 按照文生视频服务要求构造请求获取关键帧图片的 URL 数组
    // 假设返回一个包含 4 - 6 个图片 URL 的数组
    const keyframeUrls = await fetchKeyframeUrlsFromApi(idiom);
    return keyframeUrls;
}

// 模拟的从 API 获取视频 URL 的函数（实际中要换成真正调用外部服务的代码逻辑）
function fetchVideoUrlFromApi(idiom) {
    return new Promise((resolve, reject) => {
        // 这里只是简单模拟返回一个固定视频 URL，实际要对接真实服务去生成并获取对应成语视频的 URL
        setTimeout(() => {
            resolve('https://example.com/sample_video.mp4');  // 替换为真实生成视频的 URL
        }, 2000);
    });
}

// 模拟的从 API 获取关键帧图片 URL 数组的函数（实际需替换为真实调用外部服务的函数）
function fetchKeyframeUrlsFromApi(idiom) {
    return new Promise((resolve, reject) => {
        // 简单模拟返回固定的几个图片 URL，实际要对接真实服务
        const keyframeUrls = [
            'https://example.com/keyframe1.jpg',
            'https://example.com/keyframe2.jpg',
            'https://example.com/keyframe3.jpg'
        ];
        setTimeout(() => {
            resolve(keyframeUrls);
        }, 1500);
    });
}

generateVideoBtn.addEventListener('click', async () => {
    const idiom = idiomInput.value;
    if (idiom) {
        // 清空之前的关键帧图片预览（如果有）
        keyframeImagesDiv.innerHTML = '';

        // 生成关键帧图片预览
        const keyframeUrls = await getKeyframeImagesUrls(idiom);
        if (keyframeUrls && keyframeUrls.length > 0) {
            keyframeUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                keyframeImagesDiv.appendChild(img);
            });
        }

        // 生成视频
        const videoUrl = await generateVideoFromIdiom(idiom);
        if (videoUrl) {
            generatedVideo.src = videoUrl;
            // 加载视频后添加音乐和解说（假设视频加载完成后添加）
            generatedVideo.addEventListener('loadedmetadata', () => {
                addMusicAndNarration(idiom);
            });
        } else {
            alert('视频生成失败，请检查输入或稍后重试');
        }
    } else {
        alert('请输入成语');
    }
});

// 添加音乐和解说的函数
function addMusicAndNarration(idiom) {
    // 选择合适的音乐文件路径（这里只是简单示例，实际可根据成语意境等选择）
    const musicUrl = 'assets/music/background_music.mp3';
    // 假设解说音频文件命名规则与成语相关，例如成语_解说.mp3
    const narrationUrl = `assets/narration/${idiom}_narration.mp3`;

    // 使用 HTML5 Audio API 创建音乐和解说音频对象
    const musicAudio = new Audio(musicUrl);
    const narrationAudio = new Audio(narrationUrl);

    // 将音乐和解说音频合并到视频音频轨道（这里只是简单示例，实际可能需要更复杂的音频处理库）
    const audioContext = new AudioContext();
    const musicSource = audioContext.createMediaElementSource(musicAudio);
    const narrationSource = audioContext.createMediaElementSource(narrationAudio);
    const destination = audioContext.destination;

    // 连接音频源到目标（这里简单混合，实际可能需要调整音量等）
    musicSource.connect(destination);
    narrationSource.connect(destination);

    // 播放音乐和解说音频
    musicAudio.play();
    narrationAudio.play();
}
