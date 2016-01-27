$(document).ready(function(){
	
    // = Вешаем событие прокрутки к нужному месту
    //   на все ссылки якорь которых начинается на #
    $('a[href^="#top"]').bind('click.smoothscroll',function (e) {
      e.preventDefault();

      var target = this.hash,
      $target = $(target);

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
        window.location.hash = target;
      });
    });
});