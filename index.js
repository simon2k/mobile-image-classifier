async function app() {
  const net = await mobilenet.load();

  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);

  console.log('result: ', result);
}

app();