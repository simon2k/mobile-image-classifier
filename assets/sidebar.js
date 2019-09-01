const mySidebar = document.getElementById('mySidebar');
const overlayBg = document.getElementById('myOverlay');

function openSidebar() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = 'block';
  }
}

function closeSidebar() {
  mySidebar.style.display = 'none';
  overlayBg.style.display = 'none';
}

document.getElementById('open-sidebar').addEventListener('click', openSidebar);
document.querySelectorAll('.close-sidebar').forEach(element =>
  element.addEventListener('click', closeSidebar)
);
