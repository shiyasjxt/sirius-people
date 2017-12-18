!(function($) {
    // regular js
    function formatDate(myDate) {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
        var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
        var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

        return myDay + "<br>" + myMonth;
    }

    // jquery
    $(function() {

        var currentURL =  window.location.href;
        if(currentURL.indexOf('newsid=29893&preview=1#Developing')>-1){
        var new_script = $(`<script src="//static.leadpages.net/leadboxes/current/embed.js" async defer></script> <script>window.addEventListener('LPLeadboxesReady',function(){LPLeadboxes.setExitIntent('fuPVUwDXjedg47ojTHyWi8',{dontShowFor:'1d',domain:'eloquentsocial.lpages.co'});});</script> `);
        $('#ctl00_Head1').append(new_script);
        }

        $('link[href="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();

        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        var currentPage = window.location.pathname.toLowerCase();

        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();

        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }

        /* Adding Bootstrap Classes */
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        $('#dynamic-side-right-container, #job-side-column, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        if (!$.trim($('#dynamic-side-left-container, #side-left').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
        } else {
            $('#dynamic-side-left-container, #side-left').addClass('col-sm-3 hidden-xs');
            $('#dynamic-content, #content-container #content').addClass('col-sm-9 col-xs-12');
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');

        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');

        // Repsonsive image
        $('.dynamic-content-holder img').addClass('img-responsive');

        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');

        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");

        // add last-child class to navigation 
        $("#prefix_navigation > ul > li:last").addClass("last-child");

        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".job-navbtns a").addClass("btn btn-default");

        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/register.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }

        // Contact - Google map
        $("#footer").prepend($("#contact-map"));
              
        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });

        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });

        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
        }
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }

        if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $(".uniForm").addClass("border-container");
        }

    if( $('.static-team-page').length ){
        $('.tab-pane:not(#all)').each( function(){
            $('#all.tab-pane').append('<h2 class="pane-heading">'+ $(this).attr('id') +'</h2>');
            $(this).find('.col-md-3').clone().appendTo( $('#all.tab-pane'));
        });
    }

    });

    // Resize action
    /*$(window).on('resize', function() {

    	var wi = $(this).width();

    	// Mobile & Tablet
    	if ( wi <= 992 ) {
    		//$('#dynamic-side-left-container').before($('#dynamic-content'));
    		//$('#side-left').before($('#content'));    		
    		$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
    	}
    	//  Desktop
    	else {
    		//$('#dynamic-side-left-container').after($('#dynamic-content'));
    		//$('#side-left').after($('#content'));
    		$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
    	} 

    });*/

    $(document).ready(function() {

        /*// Resize action
        var $window = $(window);
        	// Function to handle changes to style classes based on window width
        	function checkWidth() {
        	if ($window.width() < 992) {
        		$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');	
        		}
        }
        	// Execute on load
        	checkWidth();			
        	// Bind event listener
        	$(window).resize(checkWidth);*/



        // Home services - carousel
        $('.t-gallery').Gallerycarousel({ autoRotate: 4000, visible: 4, speed: 1200, easing: 'easeOutExpo', itemMinWidth: 250, itemMargin: 30 })


        // Latest Jobs widget
        $("#myJobsList ul").includeFeed({
            baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1", limit:15 },
            elements: { pubDate: formatDate, title: 1, description: 1 },
            complete: function() {
                if( $(this).children().length ) {
                    $(this).children().each( function(){
                        $(this).find('.rss-item-pubDate-month').text( $(this).find('.rss-item-pubDate-month').text().substr(0,3) );
                    }); 
                }
                if ($(this).children().length > 2) {
                    $(this).simplyScroll({ frameRate: 60 });
                }
            }
        });
        
        // Equal Height	
        $.fn.eqHeights = function(options) {

            var defaults = { child: false };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }

            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {

                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });

            $(elements).height(max_height);
        };
        
        $("#teamList").includeFeed({
            baseSettings: {rssURL: ["/consultantsrss.aspx?featured=1&category"], limit: 200, addNBSP: false, repeatTag: "consultant"},
            templates: {
                itemTemplate:
                   '<div class="item">\n\
                    <a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}" class="team-img">\n\
                       <img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}" />\n\
                       <div class="team-overlay">{{FirstName}} {{LastName}}</div>\n\
                    </a>\n\
                </div>'
            },
            complete: function () {
                // Callback
                $('.owl-carousel').owlCarousel({
                loop:false,
                nav:false,
                items:7,
                autoplay:true,
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:3
                    },
                     767:{
                        items:4
                    },
                    1023:{
                        items:7
                    }
                }
            });
            }
        });
// var dataURLteam = $(".team-job-sec ul").attr("data-url");
//     $(".team-job-sec ul").includeFeed({
//         baseSettings: { rssURL: [dataURLteam || "/job/rss.aspx?search=1"] }, 
//         elements: { pubDate: formatDate, title: 1, description: 1 }, 
//         complete: function(){
//             if ($(this).children().length > 3){ 
//                 $(".p_jobs-list ul").jcarousel({
//                     auto: 5, 
//                     scroll: 1, 
//                     wrap: "circular", 
//                     vertical: false
//                 });
//             }else if($(this).children().length <1){
//                 $(this).addClass('no-data').append('<p>I am currently working on Search/Head Hunt assignments. Please contact me with any queries you have.</p>');
//               }
//         }
//     });

        
        //Consultant Jobs listing on consultant page
	$(".consultant-jobs ul").each(function(){
		// var dataURLteam = $(".consultant-jobs ul").attr("data-url");
			var dataURL = $(this).attr("data-url");
			$(this).includeFeed({
				baseSettings: { rssURL: [dataURL || "/job/rss.aspx"],limit:5 }, 
				templates: { 
					itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><div class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></div><p class='rss-item-pubDate'>{{pubDate}}</p><div class='rss-item-description'>{{description}}</div></div></li>"
				},
				// predicates: {
				// 	pubDate: function(pubDate){ 
				// 		var dateObj = new Date(Date.parse(pubDate));
				// 		var myDay = "<span class='rss-item-pubDate-date'>" + dateObj.getUTCDate()  + "</span>";
				// 		var month = new Array(12);
				// 			month[0] = "Jan";
				// 			month[1] = "Feb";
				// 			month[2] = "Mar";
				// 			month[3] = "Apr";
				// 			month[4] = "May";
				// 			month[5] = "Jun";
				// 			month[6] = "Jul";
				// 			month[7] = "Aug";
				// 			month[8] = "Sep";
				// 			month[9] = "Oct";
				// 			month[10] = "Nov";
				// 			month[11] = "Dec";

							
				// 		var myMonth = "<span class='rss-item-pubDate-month'>" + ( month[dateObj.getUTCMonth()] )+ "</span>";
				// 		var myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj.getUTCFullYear() + "</span>";
				// 		return myDay+' '+myMonth+', '+myYear;
				// 	}
					 
				// },
				complete: function() {
                    if ($(this).children().length) {
                        $(this).children().each( function(){
                            $(this).find('.rss-item-pubDate-month').text( $(this).find('.rss-item-pubDate-month').text().substr(0,3) + ',' );
                        });
                    }
                    if ($(this).children().length > 1) {
                        $(this).simplyScroll({ frameRate: 60 });
                    }else if($(this).children().length <1){
                        $(this).addClass('no-data').append('<p>Please contact me with any queries you have.</p>');
                    }
                }

        //          complete: function(){
        //     if ($(this).children().length > 3){ 
        //         $(".p_jobs-list ul").jcarousel({
        //             auto: 5, 
        //             scroll: 1, 
        //             wrap: "circular", 
        //             vertical: false
        //         });
        //     }else if($(this).children().length <1){
        //         $(this).addClass('no-data').append('<p>I am currently working on Search/Head Hunt assignments. Please contact me with any queries you have.</p>');
        //       }
        // }
			});
		});

        // Equal Height - Usage
        $('.service-holder').eqHeights();

        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            $("html, body").animate({
                scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
            }, 100);
        }

		// contact page stop scrolling until clicked.
		$(".r27_map-overlay").click(function(){
			$(this).hide();
		});
    });

})(jQuery);