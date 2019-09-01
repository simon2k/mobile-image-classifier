const webcamElement = document.getElementById('webcam-preview');

const classifier = knnClassifier.create();

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

function addExample(net, classId) {
  const activation = net.infer(webcamElement, 'conv_preds');
  classifier.addExample(activation, classId);
}

async function app() {
  const net = await mobilenet.load();

  await setupWebcam();

  document.getElementById('class-a').addEventListener('click', () => addExample(net, 0));
  document.getElementById('class-b').addEventListener('click', () => addExample(net, 1));
  document.getElementById('class-c').addEventListener('click', () => addExample(net, 2));
  document.getElementById('class-no-action').addEventListener('click', () => addExample(net, 3));

  while (true) {
    if (classifier.getNumClasses() > 0) {
      const activation = net.infer(webcamElement, 'conv_preds');
      const result = await classifier.predictClass(activation);

      const CLASSES = ['A', 'B', 'C', 'Empty view'];
      const confidence = result.confidences[result.classIndex].toFixed(2);
      document.getElementById('result-preview').innerText =
        `Predicted class: ${CLASSES[result.classIndex]} with confidence: ${confidence}`;
    }

    await tf.nextFrame();
  }
}

app();