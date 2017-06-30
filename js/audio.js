// MUSIC INIT
(function(){
  var d = document,
      acts = d.querySelectorAll('.e-col a'),
      audio = d.getElementById('audio'),
      song = d.querySelector('.e-info b'),
      singer = d.querySelector('.e-info span'),
      progress = d.getElementById('progress'),
      volume = d.getElementById('volume'),
      songs = [
        {file: '0.mp3',song: '他夏了夏天',singer: '苏打绿'},
        {file: '1.mp3',song: '如烟',singer: '五月天'},
        {file: '2.mp3',song: '最后的战役',singer: '周杰伦'},
        {file: '3.mp3',song: '想念你',singer: '冒险岛'}
      ],
      i = 1;

  acts[0].addEventListener('click', function(){
    progress.style.width = audio.currentTime = 0;
    play();
  });
  acts[2].addEventListener('click', function(){ i = cut(i); })
  acts[3].addEventListener('click', initSong);
  acts[3].addEventListener('click', play);
  audio.volume = .3;
  printMenus();

  progress.parentNode.addEventListener('click', function(e){
    progress.style.width = e.offsetX/2 + '%';
    audio.currentTime = audio.duration * e.offsetX/200;
  });
  volume.parentNode.addEventListener('click', function(e){
    volume.style.width = e.offsetX + '%';
    audio.volume = e.offsetX/100;
  });
  audio.addEventListener('timeupdate',function(){ progress.style.width = audio.currentTime/audio.duration * 100 + '%'; });
  audio.addEventListener('play',function(){ acts[3].innerHTML = '<i class="iconfont icon-stop"></i>'; });
  audio.addEventListener('pause',function(){ acts[3].innerHTML = '<i class="iconfont icon-playfill"></i>'; });
  audio.addEventListener('ended', function(){ i = cut(i); });
  d.querySelector('ul.e-menu').addEventListener('click', function(e){
    if(e.target.tagName !== 'A') return false;
    i = cut(e.target.dataset.i);
  });
  d.querySelector('.e-list').addEventListener('click', function(){ d.querySelector('ul.e-menu').classList.toggle('menu-show'); });
  function play(){ audio.paused?audio.play():audio.pause(); }
  function cut(n){
    song.innerHTML = songs[n].song;
    singer.innerHTML = songs[n].singer;
    audio.src = 'music/' + songs[n].file;
    audio.play();
    return n < (songs.length-1)? ++n: 0;
  }
  function formatMenu(n, o){ return '<li><a href="javascript:;" data-i="'+ n +'">'+ o.song +'</a> / '+ o.singer +'</li>'; }
  function printMenus(){
    var k = 0,
        html = '',
        l = songs.length;
    for(k; k< l; k++){ html += formatMenu(k, songs[k]); }
    d.querySelector('ul.e-menu').innerHTML = html;
  }
  function initSong(){
    song.innerHTML = songs[0].song;
    singer.innerHTML = songs[0].singer;
    audio.src = 'music/' + songs[0].file;
    acts[3].removeEventListener('click', initSong);
  }

})();
