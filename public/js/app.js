let mediaRecorder;
let recordedChunks = [];

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {   
    init('video');
} else {
    alert('getUserMedia() is not supported by your browser');
}


async function init(videoId) {
    const video = document.getElementById(videoId);
    const constraint = { video: true };
    try {
        // Access the webcam
        const stream = await navigator.mediaDevices.getUserMedia(constraint);
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam(video));

        // Initialize MediaRecorder
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            recordedChunks = [];
            submit(blob);
        };

    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}


function startRecording() {
    recordedChunks = [];
    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop()
}

function getBlob() {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    return blob;
}

function submit(blob) {
    // Send the video blob to the backend server
    const formData = new FormData();
    formData.append('video', blob, 'clip.webm');
    formData.append("deviceId", 2);
    formData.append("description", "helloworld");

    fetch('http://localhost:3000/api/v1/detections', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}