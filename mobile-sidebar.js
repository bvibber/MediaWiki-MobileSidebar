/*
 * Mobile sidebar preview gadget
 *
 * Quick hack to show how pages look on mobile
 * while browsing the desktop site.
 *
 * Brion Vibber <bvibber@wikimedia.org>
 * 2014-10-10
 * Cleaned up and enhanced by prtksxna
 * Further cleaned up by Brion :D
 */
$(function () {

	// Old iPhone size, the minimum we usually see
	var width = 320, height = 480;

	// @todo possibly make size selectable from some options...
	// Note that pixel sizes are deceiving on mobile, as there's often a
	// density factor. For instance 480x800 screens at 1.5x would cover
	// only 320x533 or so. And let's not even get into the iPhone 6 Plus!

	function showSidebar() {
		localStorage['mw-mobile-sidebar-state'] = 'show';

		var $content = $('#content');

		var top = $content.position().top,
			page = mw.config.get('wgPageName'),
			src = '/wiki/' + encodeURIComponent(page) + '?useformat=mobile',
			lang = mw.config.get('wgContentLanguage');

		var $container = $('<div>').attr('id', 'mobile-sidebar');

		var $mobileLink = $('<a>')
			.text( 'Mobile' )
			.addClass ( 'mobile_link' )
			.attr( 'href', src )
			.attr( 'target', '_blank')
			.appendTo( $container );

		var $egg = $( '<div>' )
			.addClass( 'egg' )
			.append(
				$( '<img>' ).attr( 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Wikimedia-logo.svg/240px-Wikimedia-logo.svg.png' ),
				$( '<p>' ).html( 'If lost please return to <a href="https://meta.wikimedia.org/wiki/User:Brion_VIBBER">Brion Vibber</a>' )
			)
			.appendTo( $container )
			.hide();

		// @todo detect scrollbars and compensate width
		var $frame = $('<iframe>')
			.attr('src', src)
			.css('width', width + 'px')
			.css('height', height + 'px')
			.appendTo($container);

		var $close = $('<a>')
			.html(' &times;')
			.addClass('close')
			.click( hideSidebar )
			.appendTo( $container );

		$container.on( 'dblclick', function () {
			$egg.toggle();
			$mobileLink.toggle();
			$close.toggle();
			$frame.toggle();
		} );

		var frame = $frame[0];
		$frame.load(function () {
			// Compensate for scrollbars on browsers that add them
			var scrollBarWidth = width - frame.contentDocument.querySelector('body').clientWidth;
			if ( scrollBarWidth > 0 ) {
				$frame.css( 'width', ( width + scrollBarWidth ) + 'px' );
			}
			// Handle link navigation within the mobile preview doc
			$(frame.contentDocument).on('click', 'a', function (e) {
				e.preventDefault();
				if ($(this).attr('href').indexOf('#') !== 0) {
					window.location = this.href;
				}
			});
		});

		$('#content').css('margin-right', '360px');
		$('#content').after($container);
	}

	function hideSidebar() {
		localStorage['mw-mobile-sidebar-state'] = 'hidden';
		$('#mobile-sidebar').remove();
		$('#content').css('margin-right', '0');
	}

	function toggleState() {
		if (localStorage['mw-mobile-sidebar-state'] !== 'hidden') {
			hideSidebar();
		} else {
			showSidebar();
		}
	}

	if (mw.config.get('wgAction') == 'view') {
		$toggle = $( '<li><span><a></a></span></li>' )
			.attr( 'id', 'ca-mobile' )
			.attr( 'class', 'icon' );
		$toggle.find( 'a' )
			.attr( 'title', 'Toggle mobile view sidebar' )
			.text( 'Mobile' )
			.click( toggleState );
		$( '#p-views ul' ).append( $toggle );

		if (localStorage['mw-mobile-sidebar-state'] == 'hidden') {
			hideSidebar();
		} else {
			showSidebar();
		}
	}
});
