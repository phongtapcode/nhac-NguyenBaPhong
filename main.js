
const $ = document.querySelector.bind(document);
const $$ =document.querySelectorAll.bind(document);
const cd = document.getElementById('cd');
const heading =  $('header h2')
      const cdThumb =$('#cd-thumb');
      const audio = $('#audio');
      const playBtn = $('.btn-toggle-play');
      const player = $('.player');
      const progress = $('#progress');
      const prevBtn = $('.btn-prev');
      const nextBtn = $('.btn-next');
      const randomBtn = $('.fa-random');
      const repeatBtn = $('.btn-repeat');
      const playlish = $('.playlist');
          
var app = {
   currentIndex: 0,
 isPlaying: false,
  isRandom: false,
   isRepeat:false,
   songs: [
      
      {
         name: 'Let Me Love You',
         singer: 'Justin Bieber',
         path: 'music/Let Me Love You ft Justin Bieber.mp3',
         img: 'picture/justin.jpg'

      },
      {
         name: 'Stay With Me',
         singer: 'CHANYEOL, PUNCH',
         path: 'music/Stay With Me.mp3',
         img: 'picture/justin1.jpg'

      },
      {
         name: 'Nặng Tình Hay Nhẹ Lòng REMIX',
         singer: 'Poping',
         path: 'music/Nặng tình hay nhẹ lòng.mp3',
         img: 'picture/justin2.jpg'

      },
      {
         name: 'On My Way',
         singer: 'Alan Walker, Sabrina Carpenter & Farruko',
         path: 'music/On My Way.mp3',
         img: 'picture/justin3.jpeg'

      },
      {
         name: 'Demons',
         singer:'Imagine Dragons',
         path: 'music/Imagine Dragons.mp3',
         img: 'picture/justin4.jfif'

      }
      ,
      {
         name: 'Something Just Like This',
         singer:'The Chainsmokers & Coldplay',
         path: 'music/Something Just Like This.mp3',
         img: 'picture/justin5.jpg'

      },
      {
         name: 'Attention',
         singer: 'Charlie Puth',
         path: 'music/attention.mp3',
         img: 'picture/justin6.jfif'

      },
      {
         name: "We Don't Talk Anymore",
         singer: 'Charlie Puth',
         path: 'music/We dont talk any more.mp3',
         img: 'picture/justin13.jpg'
      },
      {
         name: 'Thêm bao nhiêu lâu',
         singer: 'Đạt G',
         path: 'music/Thêm Bao Nhiêu Lâu Đạt G.mp3',
         img: 'picture/justin7.jpg'

      },
      {
         name: 'Worth It',
         singer: 'Fifth Harmony',
         path: 'music/Worth It -Fifth Harmony.mp3',
         img: 'picture/justin8.jpg'

      },
      {
         name: 'See You Again',
         singer: 'Wiz Khalifa ft.Charlie Puth',
         path: 'music/y2mSee You Again ft Charlie Puth.mp3',
         img: 'picture/justin9.jpg'

      },
      {
         name: 'Viva la Vida',
         singer: 'Shalom Margaret (cover)',
         path: 'music/Valida.mp3',
         img: 'picture/justin10.jpg'

      },
      {
         name: 'Khó',
         singer: 'Nam Cường',
         path: 'music/Khó  Nam Cường.mp3',
         img: 'picture/justin11.jpg'

      },
      {
         name: 'Buông đôi tay nhau ra',
         singer:'Sơn Tùng-MTP',
         path: 'music/Buông đôi tay nhau ra.mp3',
         img: 'picture/justin12.jpg'

      }
   ],

   render: function(){
           const htmls = this.songs.map(function(song,index){
                return `
                <div class="song ${ index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>`
           });
           playlish.innerHTML = htmls.join('');

   },
   defineProperties: function(){
      Object.defineProperty(this,'currentSong',{
         get: function(){
            return this.songs[this.currentIndex];
         }
      })
   },
   handleEventa: function(){

      // xử lí CD quay dừng
    const cdThumbAnimate =cdThumb.animate([
         { transform: 'rotate(360deg)' }
      ],
      {
         duration: 10000,
         iterations: Infinity
      })

      cdThumbAnimate.pause();
      
      const _this = this;
      //xử lí phóng to thu nhỏ
     const cdWidth = cd.offsetWidth;
             document.onscroll = function(){
               const scrollTop = window.scrollY || document.documentElement.scrollTop ;
               // console.log(scrollTop);
             const newcdWidth = cdWidth-scrollTop;
            cd.style.width = newcdWidth >0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth/cdWidth;
             }

             //xử lí click play
             playBtn.onclick = function(){
               if(_this.isPlaying==true){
                    audio.pause();
               }
               else{
               audio.play();
               }
             }

             audio.onplay = function(){
               _this.isPlaying = true
               player.classList.add('playing');
               
               cdThumbAnimate.play();
             }

             audio.onpause = function(){
               _this.isPlaying = false
               player.classList.remove('playing');
          
               cdThumbAnimate.pause();
             }

             //khi tiến độ bài hát thay đổi
             audio.ontimeupdate = function(){
               if(audio.duration){
                  const percent = Math.floor(audio.currentTime / audio.duration *100);
                 progress.value = percent;
               }
             }
             progress.onchange = function(e){
               const seekTime = e.target.value/100 * audio.duration;
               audio.currentTime = seekTime;
             }

             nextBtn.onclick = function(){
               if(_this.isRandom){
                  _this.randoms();
               }else{
               _this.nextSong()}

               audio.play();
               
               _this.render();
               _this.scrollToActiveSong();
             }

             prevBtn.onclick = function(){

               if(_this.isRandom){
                 _this.randoms();
               }else {_this.prevSong();}

               audio.play();
               _this.render();
               _this.scrollToActiveSong();
             }

             randomBtn.onclick = function(){
               app.isRandom = !app.isRandom
               randomBtn.classList.toggle('active', app.isRandom)
              
             }

             // xử lí tự chuyển bài sau khi kết thúc bài hát


            repeatBtn.onclick = function(){
               app.isRepeat = !app.isRepeat
               repeatBtn.classList.toggle('active', app.isRepeat)
            }

              // xử lí tự chuyển bài sau khi kết thúc bài hát ++ phát lại bài hát
            audio.onended = function(){
               if(_this.isRepeat){
                  audio.play();
                  
               }else{
                  if(_this.isRandom){
                     _this.randoms();
                     _this.loadcurrentSong();
                     _this.render();
                     audio.play();
                  }else{
                     if(_this.currentIndex===_this.songs.length){
                        _this.currentIndex=0;
                     }
                  _this.nextSong()
                  _this.loadcurrentSong();
                     _this.render();
                  audio.play();}
               }
            }

            playlish.onclick= function(e){
               const songNode = e.target.closest('.song:not(.active)');

               if(songNode || e.target.closest('.option')){
                  if(songNode){
                     _this.currentIndex = Number(songNode.dataset.index)
                     _this.loadcurrentSong();
                     _this.render();
                     audio.play();
                  }
               }
            }

   },

   loadcurrentSong: function(){
      
      
      heading.textContent = this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
      audio.src = this.currentSong.path;
    
   },

   //các nút 
   prevSong: function(){
         this.currentIndex--;
         if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1;
         }
         this.loadcurrentSong();
   }
   ,
   nextSong: function(){
      this.currentIndex++;
      if(this.currentIndex>=this.songs.length){
         this.currentIndex=0;
      }
      this.loadcurrentSong();
   }
   ,
   randoms: function(){
      let a ;
      do{
         a = Math.floor(Math.random()*this.songs.length); 
       }while(this.currentIndex === a)

       this.currentIndex=a;
      // let a = [];
      // a[0]=this.currentIndex;
      // let c=0;
      // var b=Math.floor(Math.random()*this.songs.length);
      
      // for(var i=0; i<a.length; i++){
      //    if(b !==a[i]){
      //       this.currentIndex = b;
      //       c++;
      //    }
      //    else{
      //       b=Math.floor(Math.random()*this.songs.length);
      //    }
      //    console.log(b);
      //   if(c===a.length){
      //    a.push(b);
      //   }
      // }
     
        this.loadcurrentSong();
   },

   scrollToActiveSong: function(){
      setTimeout(function(){
         $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block:'nearest'
         })
      })
   }
,

   
   start: function(){
      
      // Định nghĩa các thuộc tính  cho object
      this.defineProperties()
      //lắng nghe / xử lí  các sự kiện (dom event)
      this.handleEventa()

      this.loadcurrentSong()
      //render playlist
      this.render()
   }
}

app.start();


