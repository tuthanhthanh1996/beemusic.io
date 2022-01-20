//==============================================
//                  DARK THEME
//==============================================
const mainScreen = document.querySelector('.main');
const radioBtnTheme = document.querySelector('.js-radioButtonTheme');
radioBtnTheme.addEventListener('click', (e) => {
  if (mainScreen.classList.contains('dark-theme')) {
    mainScreen.classList.remove('dark-theme');
    e.target.children[0].style.left = '2px';
  } else {
    mainScreen.classList.add('dark-theme');
    e.target.children[0].style.left = '37px';
  }
});

//==============================================
//                  Mobile
//==============================================

const navBarMobile = document.querySelector('.js-navbar');
const sidebarMobile = document.querySelector('.js-sidebar');
const barsLeft = document.querySelector('.js-barsLeft');
const hideNavbar = document.querySelector('.js-hide-navbar');
const barsRight = document.querySelector('.js-barsRight');
const hideSidebar = document.querySelector('.js-hide-sidebar');

hideNavbar.addEventListener('click', (e) => {
  if (navBarMobile.classList.contains('active')) {
    navBarMobile.classList.remove('active');
  }
});

hideSidebar.addEventListener('click', (e) => {
  if (sidebarMobile.classList.contains('active')) {
    sidebarMobile.classList.remove('active');
  }
});

barsLeft.addEventListener('click', (e) => {
  navBarMobile.classList.add('active');
  if (sidebarMobile.classList.contains('active')) {
    sidebarMobile.classList.remove('active');
  }
});

barsRight.addEventListener('click', (e) => {
  sidebarMobile.classList.add('active');
  if (navBarMobile.classList.contains('active')) {
    navBarMobile.classList.remove('active');
  }
});

//==============================================
//                  Play Music
//==============================================Music
const song = document.querySelector('.song');
const timerLeft = document.querySelector('.js-timerLeft');
const timerRight = document.querySelector('.js-timerRight');
const playAndPause = document.querySelector('.js-playAndPause');
const range = document.querySelector('.js-range');
const playList = document.querySelector('.js-playList');
const changeVolume = document.querySelector('.js-changeVolume');

// Danh sách bài hát
const musics =[
  {
      id: 0,
      number: '01',
      file:'ntt.mp3',
      title: 'Ngày tận thế',
      artist: 'Tóc Tiên',
      time: '3:52',
      active: true,
  },
  {
      id: 1,
      number: '02',
      file: 'catena.mp3',
      title: 'Có ai thương em như anh',
      artist: 'Tóc Tiên',
      time: '3:51',
      active: false,
  },
  {
      id: 2,
      number: '03',
      file: 'edcnm.mp3',
      title: 'Em đã có người mới',
      artist: 'Tóc Tiên',
      time: '3:20',
      active: false,
  },
  {
      id: 3,
      number: '04',
      file: 'vdcc.mp3',
      title: 'Vũ điệu cồng chiêng',
      artist: 'Tóc Tiên',
      time: '3:24',
      active: false,
  },
  {
      id: 4,
      number: '05',
      file: 'ttbdty.mp3',
      title: 'Trên tình bạn dưới tình yêu',
      artist: 'Min',
      time: '3:19',
      active: false,
  },
];

// Set default audio
song.setAttribute('src', `./assests/mp3/${musics[1].file}`);

for (let i = 0 ; i < musics.length; i++) {
  playList.insertAdjacentHTML('beforeend', 
  `<tr class="js-chooseSong ${musics[i].active ? 'active' : ''}" data-index=${musics[i].id}>
    <td>${musics[i].id}</td>
    <td>${musics[i].title}</td>
    <td>${musics[i].artist}</td>
    <td>${musics[i].time}</td>
  </tr>`)
}

// Change volume
changeVolume.addEventListener('change' , () => {
  song.volume = changeVolume.value / 10;
});

// Change timer run music
range.addEventListener('change', () => {
  song.currentTime = range.value;
});

// Choose Song
playList.addEventListener('click', (e) => {
  const listSong = document.querySelectorAll('.js-chooseSong');
  const chooseSong = e.target.closest('.js-chooseSong');
  const currentIndex = chooseSong.getAttribute('data-index');
  const indexRecordActive = musics.findIndex(item => item.active);
  listSong[indexRecordActive].classList.remove('active');
  listSong[currentIndex].classList.add('active');
  musics[indexRecordActive].active = false;
  musics[currentIndex].active = true;
  song.setAttribute('src', `./assests/mp3/${musics[currentIndex].file}`);
});

// Phát và dừng nhac 
let checkPlay = false;
playAndPause.addEventListener('click', (e) => {
  checkPlay = !checkPlay;
  if (checkPlay) {
    e.target.classList.add('fa-pause-circle');
    e.target.classList.remove('fa-play-circle');
    song.play();
  } else {
    e.target.classList.remove('fa-pause-circle');
    e.target.classList.add('fa-play-circle');
    song.pause();
  }
});

// Get time chạy nhạc
const displayTimerMusic = () => {

  const { duration, currentTime } = song;
  timerRight.textContent = formatTimer(duration);
  timerLeft.textContent = formatTimer(currentTime);
  range.value = currentTime;
  range.max = duration;
}

const formatTimer = (time) => {
  const mins = Math.floor(time / 60);
  let secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return mins + ':' + secs;
};


displayTimerMusic();

range.value = 0;
setInterval(() => {
  displayTimerMusic();
}, 1000); 






