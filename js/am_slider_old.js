


$(document).ready(function() {    
    
    // $am_sl_outer.each(function(i, obj) {   
    //     var className = $(this).attr('class');
    //     var classList = className.split(/\s+/);
    //     for (var i = 0; i < classList.length; i++) {
    //         if (classList[i] === 'am_slider_outer') {
    //             //do something  
    //             classList.splice(i, 1); 
    //         }            
    //     } 
    //     console.log(classList);
    // });

    

}); 








(function($){

    $.fn.Am_slider = function(options) {
        
        var settings = {
            autoplay: true, 
            speed: 2500,  
            pag: true,  
            controls: true,  
        };

        return this.each(function() {

            $(window).on('resize', function() {
                $('.am_slider_outer').each(function()  {
                    slider_size($(this), $(this).find('.am_slider_item')); 
                });
            });


            // var slider = {
            //     currslider : 0,
            //     $paginatior : null,

            //     slider_size = function () {
            //         // wefwefwef
            //         this.$paginatior
            //     } 

            //     init = function () {
            //         // wefwefwef
            //         this.$paginatior = djhgfjwhgeU#gkje kef
            //     } 

            //     run = funcittjj () {
            //         this.init();
            //         // sashjdagsjfgjgsaf
            //     }
            //}

            function slider_size($am_sl_outer,$am_sl_items) {   

                function updatePositions($am_sl_items) {
                    var img_count = $am_sl_items.length;
                    var translate = '';
                    for (var i=0; i<=img_count-1; i++) {
                        if ($am_sl_items.eq(i).hasClass('active')) {  
                            if (i>0) translate = 'translateX(-' + step_size*i + 'px)';
                            $am_sl_items.css('transform', translate);
                        }
                    }
                }

                function ChangePosition($am_sl_items, direction) {
                    var img_count = $am_sl_items.length;
                    $am_sl_items.css('transition','.3s');
                    if (direction == "left") {            
                        var counter_prev = curr_num - 1;
                        curr_num = counter_prev;
                        curr_num_2 = curr_num;
                        if (counter_prev < 1 ) {
                            counter_prev = img_count;
                            curr_num = img_count;
                        }
                        $am_sl_items.eq(curr_num-img_count).removeClass('active');
                        $am_sl_items.eq(curr_num-(img_count+1)).addClass('active');         
                        
                        updatePositions($am_sl_items);        
                     
                        $am_sl_outer.find('.am_slider_pag_item').removeClass('active');
                        $am_sl_outer.find('.am_slider_pag_item').eq(curr_num-1).addClass('active');     
                    }

                    if (direction == "right") {    
                        var counter_next = curr_num + 1;
                        curr_num = counter_next;
                        curr_num_2 = curr_num;
                        if (counter_next > img_count ) {
                            counter_next = 1;
                            curr_num = 1;
                        }        
                        $am_sl_items.eq(curr_num-2).removeClass('active');
                        $am_sl_items.eq(curr_num-1).addClass('active'); 
                        
                        updatePositions($am_sl_items);        

                        $am_sl_outer.find('.am_slider_pag_item').removeClass('active');
                        $am_sl_outer.find('.am_slider_pag_item').eq(curr_num-1).addClass('active');
                    }
                }

                var curr_num =  $am_sl_outer.find('.am_slider_item.active').index() + 1;
                var curr_num_2 = curr_num;
                var am_slider_width = $am_sl_outer.css('width'); 
                $am_sl_items.outerWidth(am_slider_width);   
                var step_size = $am_sl_items.outerWidth();
                var step_size_curr = 0;   

                updatePositions($am_sl_items);

                $am_sl_items.css('transition','0s'); 

                $am_sl_next = $am_sl_outer.find('.next');
                $am_sl_prev = $am_sl_outer.find('.prev');

                $am_sl_prev.click(function(){
                   ChangePosition($am_sl_items, "left");
                });
                $am_sl_next.click(function(){
                   ChangePosition($am_sl_items, "right");   
                });

                // if ($(window).width() < 768) {   
                //     $am_sl_items.on( "swiperight", function( event ) {         
                //         $am_sl_next.click();
                //     });

                //     $am_sl_items.on( "swipeleft", function( event ) {
                //         $am_sl_prev.click();
                //     });
                // }
             
                // pag
                
                $am_sl_outer.find('.am_slider_pag_item').click(function() {     
                    $am_sl_items.css('transition','.3s');
                    $am_sl_outer.find('.am_slider_pag_item.active').removeClass('active');
                    $am_sl_outer.find('.am_slider_item.active').removeClass('active');
                    $(this).addClass('active');
                   
                    var active_pag_index = $(this).index();
                    $am_sl_items.eq(active_pag_index).addClass('active');

                    curr_num_prev = curr_num; 
                    curr_num = active_pag_index+1;        

                    updatePositions($am_sl_items); 
                });


                // drag EVENT

                function sliderDragging() {
                    var dragging = false;
                    var x;
                    var draggable = $am_sl_outer.find('.am_slider');
                    var posX_start  = 0;
                    var bool_change_left = true;
                    var bool_change_right = true; 

                    draggable.mousedown(function(event){
console.log('dragged');
                        $am_sl_outer.css('cursor','-webkit-grabbing');
                        dragging = true;
                        x = event.clientX;
                        event.preventDefault();
                        posX_start = event.pageX;    
                        bool_change_left = false;
                        bool_change_right = false;
                    });
                      
                    draggable.mousemove(function(event){
                        var posX = 0; 
                        var posY = 0;
                        var step_size_3;
                        if (dragging) {
                            //draggable[0].scrollLeft += x - event.clientX;
                            x = event.clientX;
                            posX = event.pageX; 
    
                            if (posX>posX_start) {
                                var diff_pos_right = posX - posX_start; 
                                bool_change_right = true;           
                                step_size_2 =  step_size*(curr_num_2-1);         
                                step_size_3 = (step_size_2 - diff_pos_right)*-1; 
                                if (bool_change_right) {
                                    $am_sl_items.css('transform', 'translateX(' + step_size_3 + 'px)');                                                    
                                }
                                $(window).mouseup(function(event){
                                    
                                    if ((bool_change_right) && (diff_pos_right>1) && (posX>posX_start)) {  

                                        //console.log('swiped_right');   

                                        $am_sl_outer.find('.prev').click();                           
                                        diff_pos_right = 0;                         
                                        bool_change_right = false;                        
                                    }  
                                    
                                });

                            } else { 
                                var diff_pos_left = posX_start - posX; 
                       
                                bool_change_left = true;       
                                step_size_2 =  step_size*(curr_num_2-1);      
                                step_size_3 = (step_size_2 + diff_pos_left)*-1;
                                var diff_pos_left_2 = step_size_2 - diff_pos_left;
                                var diff_pos_left_3 = step_size_2 - diff_pos_left_2; 
                                if (bool_change_left) {
                                    $am_sl_items.css('transform', 'translateX(' + step_size_3 + 'px)'); 
                             
                                }   
                              
                                $(window).mouseup(function(event){
                                
                                    if ((bool_change_left) && (diff_pos_left>1) && (posX<posX_start)) {                                        
                                         
                                        //console.log('swiped_left');
                                        $am_sl_outer.find('.next').click();                         
                                        diff_pos_left = 0;  
                                        bool_change_left = false;
                                    }                                     
                                     
                                });                 
                            }
                        }
                    }); 
                     
                    $(window).mouseup(function(event){
                        dragging = false;    
                        $am_sl_outer.css('cursor','auto');
                        //console.log('mouseup');
                    });


                    // End drag Event 
                }

                sliderDragging();  
                
            };

            function initSlider($am_sl_outer) {     
                $am_sl_outer.find('ul').wrap("<div class='am_slider'></div>" );
                $am_sl_outer.find('ul').addClass('am_slider_inner');
                $am_sl_outer.find('li').addClass('am_slider_item');
                $am_sl_outer.find('li:first-child').addClass('active');
                $am_sl_outer.append("<span class='prev'>prev</span><span class='next'>next</span>");
                $am_sl_outer.append("<ul class='am_slider_pag'></ul>");

                // selectors 
                $am_sl_items = $am_sl_outer.find('.am_slider_item');
                $am_sl_pag = $am_sl_outer.find('.am_slider_pag');

                var img_count = $am_sl_items.length;
                for (var i=1; i<=img_count; i++) {
                    $am_sl_pag.append("<li class='am_slider_pag_item'></li>");  
                }

                $am_sl_pag.children().first().addClass('active');
            }

            if (options) {
               $.extend(settings, options);
            } 
 
            // classes 

            var $am_sl_outer = $(this);

            initSlider($am_sl_outer);  
            //sliderDragging($am_sl_outer);

            var $am_sl_pag = $am_sl_outer.find('.am_slider_pag');
            //var $am_sl_next = $am_sl_outer.find('.next');

            // RUNNING SLIDER             

            if (settings.autoplay) {
                function run_am_slider(){
                  //$am_sl_next.click(); 
                  $am_sl_outer.find('.next').click(); 
                } 

                var interval = setInterval(run_am_slider, settings.speed);   

                $am_sl_outer.find('.am_slider, .next, .prev').mouseover(function() { 
                    clearInterval(interval);
                }); 

                $am_sl_pag.find('.am_slider_pag_item').click(function() { 
                    clearInterval(interval);
                    interval = setInterval(run_am_slider, settings.speed);
                });

                $am_sl_outer.find('.am_slider').mouseout(function() {  
                    interval = setInterval(run_am_slider, settings.speed);  
                });    
            }       

            // ran     

            if (settings.pag == false) {
                $am_sl_pag.css('display','none');            
            }
      
            if (settings.controls == false) {
                $am_sl_outer.find('.next, .prev').css('display','none');  
            }

            // initialize and resize current slide dimentions
            $('.am_slider_outer').each(function()  {
                slider_size($(this), $(this).find('.am_slider_item')); 
            }); 




        });        

    };        
})(jQuery);


/*
usage

1.add class="" to outer container
2.call Am_slider

$('.slider_1').Am_slider({
    autoplay: true,
    speed: "2500",  
    pag: true,   
    controls: true,                     
}); 

*/