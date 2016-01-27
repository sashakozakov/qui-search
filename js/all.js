$(document).ready(function(){
  var win = $(window);

  createFullpage();

  win.on({
    'load resize orientationchange': function(){
      if($(this).width() < 768){
         $.fn.fullpage.setKeyboardScrolling(false);
         $.fn.fullpage.setMouseWheelScrolling(false);
         $.fn.fullpage.setAllowScrolling(false);
         $.fn.fullpage.setFitToSection(false);
         $('body').css('padding', 0);
      } else {
         $.fn.fullpage.setKeyboardScrolling(true);
         $.fn.fullpage.setMouseWheelScrolling(true);
         $.fn.fullpage.setAllowScrolling(true);
         $.fn.fullpage.setFitToSection(true);
      }
    }
  })
  
  function createFullpage(){
    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'right',
        resize: true,
        fitToSection: true,
        paddingTop: '94px',
        paddingBottom: '159px',
        
        fixedElements: '#headermenu',
        scrollBar:true,
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            //using index
            if(index == 4){
                $('#footer').show( "fast" );
            } else {
               $('#footer').hide( "fast" );
            }
        }
    });
  }


});
