(function(){
  var navs = $('ul.classic-nav li'),
      len = navs.length,
      items = $('ul.classic').css('width', len + '00%'),
      i = 1,
      classic = function(){
        navs.removeClass('active').eq(i).addClass('active');
        items.css('transform', 'translateX(' + (-i) * 100/len + '%)');
        i = i < len-1? ++i: 0;
      },
      timer = setInterval(classic, 3000);
    navs.on('click', function(){
      clearInterval(timer);
      i = $(this).index();
      classic();
      timer = setInterval(classic, 3000);
    });
})();

(function(){
  var navs = $('ul.a3d-nav li'),
      len = navs.length,
      items = $('ul.a3d li'),
      i = 1,
      a3d = function(){
        navs.removeClass('active').eq(i).addClass('active');
        items.removeClass('a3d-active a3d-pre a3d-next').eq(i).addClass('a3d-active');
        items.eq( i === 0? len-1: i-1).addClass('a3d-pre');
        items.eq( i+1 === len? 0: i+1).addClass('a3d-next');
        i = i < len-1? ++i: 0;
      },
      timer = setInterval(a3d, 3000);
  navs.on('click', function(){
    clearInterval(timer);
    i = $(this).index();
    a3d();
    timer = setInterval(a3d, 3000);
  });
  items.on('click', function(){
    if($(this).hasClass('a3d-active')) return false;
    clearInterval(timer);
    i = $(this).index();
    a3d();
    timer = setInterval(a3d, 3000);
  });
})();

(function(){
  var navs = $('ul.tiles-a-nav li'),
      items = $('ul.tiles-a'),
      li = items.children('li'),
      img = li.children(),
      images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
      i = 1, clock = true,
      len = images.length,
      tiles = function(){
        if(!clock) return false;
        clock = false;
        var j = 12, x, y;
        items.addClass('tiles-trans');
        img.attr('src', '../image/'+ images[i]);
        navs.removeClass('active').eq(i).addClass('active');
        while (j--) {
          x = li[j].getAttribute('x');
          y = li[j].getAttribute('y');
          (function(a, b, c){
            setTimeout(function(){
              $(li[a]).css({'left': b, 'top': c});
              if(a === 0){
                setTimeout(function(){
                  clock = true;
                  $('#tiles-a-bg').attr('src', '../image/'+ images[i-1 === -1? len-1: i-1]);
                  items.removeClass('tiles-trans');
                  li.css({'left': '100%', 'top': '100%'});
                }, 1500);
              }
            }, a * 120);
          })(j, x, y);
        }
        i = i < len-1? ++i: 0;
      },
      timer = setInterval(tiles, 3000);
  navs.on('click', function(){
    if($(this).hasClass('active')) return false;
    clearInterval(timer);
    i = $(this).index();
    tiles();
    timer = setInterval(tiles, 3000);
  });
})();


(function(){
  var items = $('ul.tiles-b'),
      images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
      len = images.length,
      img = $('ul.tiles-b li img'),
      navs = $('ul.tiles-b-nav li'),
      i = 1, clock = true,
      tiles = function(){
        if(!clock) return false;
        clock = false;
        var j = 12;
        items.addClass('tiles-trans');
        navs.removeClass('active').eq(i).addClass('active');
        while(j--){
          (function(a){
            var x = img[a].getAttribute('x');
            img.attr('src', '../image/'+ images[i]);
            setTimeout(function(){
              $('img[x="'+ x +'"]').css('opacity', 1);
              if(a === 0){
                setTimeout(function(){
                  $('#tiles-b-bg').attr('src', '../image/'+ images[i-1 === -1? len-1: i-1]);
                  items.removeClass('tiles-trans');
                  img.css('opacity', 0);
                  clock = true;
                }, 1500);
              }
            }, x * 360);
          })(j);
        }
        i = i < len-1? ++i: 0;
      },
      timer = setInterval(tiles, 3000);
    navs.on('click', function(){
      if($(this).hasClass('active')) return false;
      clearInterval(timer);
      i = $(this).index();
      tiles();
      timer = setInterval(tiles, 3000);
    });
})();
