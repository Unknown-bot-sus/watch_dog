const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
let mediaRecorder = null;
let recordedChunks = [];
const headers = {'Authorization': `Bearer ${token}`};
const params = new URLSearchParams(window.location.search);
const cameraId = params.get('cameraId');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
}
  
// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Enable the live webcam view and start classification.
async function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      return;
    }
    
    // Hide the button once clicked.
    event.target.classList.add('hidden');  
    
    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);

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
}

function startRecording() {
    recordedChunks = [];
    startTime = Date.now();
    endTime = null;

    mediaRecorder.start();
}

function stopRecording() {
    endTime = Date.now();
    startTime = null;
    mediaRecorder.stop()
}

async function submit(blob) {
    // Send the video blob to the backend server
    const formData = new FormData();
    formData.append('video', blob, 'clip.webm');
    formData.append("deviceId", cameraId);
    formData.append("description", "helloworld");

    const res = await fetch('/api/v1/detections', {
        method: 'POST',
        body: formData,
        headers,
    })
    
    console.log(await res.json());
}

let model = undefined;

cocoSsd.load().then(function (loadedModel) {
  console.log("Model loaded.");
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('opacity-20');
});


let children = [];
const relevantClasses = ['person', 'cat', 'dog'];
let startTime = null;
let endTime = null;

function predictWebcam() {
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    const validPred = [];
    
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.66 && relevantClasses.includes(predictions[n].class)) {
        validPred.push(predictions[n]);
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with '
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
        p.classList.add('absolute', 'p-1', 'bg-orange-500', 'text-white', 'border', 'border-dashed', 'border-white', 'text-xs', 'z-20');

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';
        highlighter.classList.add('absolute', 'bg-green-500', 'bg-opacity-25', 'border', 'border-dashed', 'border-white', 'z-10');

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }

    if (startTime === null && validPred.length > 0) {
        console.log('start recording');
        startRecording();
    }

    if (startTime !== null && (Date.now() - startTime) > 19000) {
        console.log('end recording');
        stopRecording();
    }
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}