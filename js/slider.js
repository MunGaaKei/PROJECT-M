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
})();
