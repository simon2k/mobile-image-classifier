const webcamElement = document.getElementById('webcam');

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigatorAny.webkitGetUserMedia ||
      navigatorAny.mozGetUserMedia ||
      navigatorAny.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {video: true},
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata', () => resolve(), false);
        },
        () => reject()
      );
    } else {
      reject();
    }
  });
}

async function app() {
  const net = await mobilenet.load();

  await setupWebcam();

  while (true) {
    const result = await net.classify(webcamElement);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}
      probability: ${result[0].probability}
    `;

    await tf.nextFrame();
  }
}

app();