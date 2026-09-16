/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 *
 * @package Zakra
 */

var ZakraNavHelper = {

	// Returns first children of a node.
	getChildNodes: function( node ) {
		var children = [],
			child;

		for ( child in node.childNodes ) {
			if ( node.childNodes.hasOwnProperty( child ) && 1 === node.childNodes[child].nodeType ) {
				children.push( node.childNodes[child] );
			}
		}

		return children;
	},

	offset: function( el ) {
		var rect       = el.getBoundingClientRect(),
		    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		    scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	},


	// Calculate the dimension of an element with margin, padding and content.
	dimension: function( el ) {
		return parseInt( document.defaultView.getComputedStyle( el, '' ).getPropertyValue( 'width' ) ) + parseInt( document.defaultView.getComputedStyle( el, '' ).getPropertyValue( 'margin-left' ) ) + parseInt( document.defaultView.getComputedStyle( el, '' ).getPropertyValue( 'padding-left' ) ) + parseInt( document.defaultView.getComputedStyle( el, '' ).getPropertyValue( 'padding-right' ) ) + parseInt( document.defaultView.getComputedStyle( el, '' ).getPropertyValue( 'margin-right' ) );
	},

	getOverflowItems: function( navLi ) {


		navigation.style.flex = '0 0 ' + navUlTempWidth + 'px';

		var extraLi = [];

		for ( var liCount = 0; liCount < navLi.length; liCount++ ) {
			var initialPos, li, posTop;

			li     = navLi[liCount];
			posTop = this.offset( li ).top;

			if ( 0 === liCount ) {
				initialPos = posTop;
			}

			if ( posTop > initialPos ) {
				if ( ! li.classList.contains( 'zak-header-search' ) && ! li.classList.contains( 'zak-menu-item-cart' ) &&
					! li.classList.contains( 'zak-header-button-wrap' ) && ! li.classList.contains( 'zak-menu-extras-wrap' )
				) {
					extraLi.push( li );
				}
			}
		}

		return extraLi;
	}
};

window.zakraNavHelper = ZakraNavHelper;

(
	function() {

		// Every header nav needs the same keyboard/touch handling, not just the primary one.
		var navIds = ['zak-primary-nav', 'zak-secondary-nav', 'zak-tertiary-nav', 'zak-quaternary-nav'],
			i;

		for ( i = 0; i < navIds.length; i++ ) {
			setUpNav( document.getElementById( navIds[i] ) );
		}

		/**
		 * Wires up focus/blur toggling and the touch fallback for one nav container.
		 */
		function setUpNav( container ) {
			var menu, links, j, len;

			if ( ! container ) {
				return;
			}

			menu = container.getElementsByTagName( 'ul' )[0];

			if ( ! menu ) {
				return;
			}

			menu.setAttribute( 'aria-expanded', 'false' );

			if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
				menu.className += ' nav-menu';
			}

			// Get all the link elements within the menu.
			links = menu.getElementsByTagName( 'a' );

			// Each time a menu link is focused or blurred, toggle focus.
			for ( j = 0, len = links.length; j < len; j++ ) {
				links[j].addEventListener( 'focus', toggleFocus, true );
				links[j].addEventListener( 'blur', toggleFocus, true );
			}

			addTouchFallback( container );
		}

		/**
		 * Sets or removes .focus class on an element.
		 */
		function toggleFocus() {
			var self = this;

			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					if ( -1 !== self.className.indexOf( 'focus' ) ) {
						self.className = self.className.replace( ' focus', '' );
					} else {
						self.className += ' focus';
					}
				}

				self = self.parentElement;
			}
		}

		/**
		 * Toggles `focus` class to allow submenu access on tablets.
		 */
		function addTouchFallback( container ) {
			var touchStartFn, k,
				parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' ),
				supportsPassive = false;

			try {
				var opts = Object.defineProperty( {}, 'passive', {
					get: function() {
						supportsPassive = true;
					}
				} );
				window.addEventListener( 'testPassive', null, opts );
				window.removeEventListener( 'testPassive', null, opts );
			} catch ( e ) {}

			if ( 'ontouchstart' in window ) {
				touchStartFn = function( e ) {
					var k,
						menuItem = this.parentNode;

					if ( ! menuItem.classList.contains( 'focus' ) ) {
						e.preventDefault();

						for ( k = 0; k < menuItem.parentNode.children.length; ++k ) {
							if ( menuItem === menuItem.parentNode.children[k] ) {
								continue;
							}

							menuItem.parentNode.children[k].classList.remove( 'focus' );
						}
						menuItem.classList.add( 'focus' );
					} else {
						menuItem.classList.remove( 'focus' );
					}
				};

				for ( k = 0; k < parentLink.length; ++k ) {
					parentLink[k].addEventListener( 'touchstart', touchStartFn, supportsPassive ? { passive: true } : false );
				}
			}
		}
	}()
);


/**
 * Fixes menu out of viewport.
 *
 * Adds `zak-edge` to a sub menu that would otherwise open past the edge of the
 * viewport, so the CSS can flip it back inwards.
 */
(
	function() {
		var resizeTimer,

			// Every nav that has `zak-edge` rules in the stylesheet, not just the primary one.
			navSelectors = [
				'.zak-primary-nav',
				'.zak-secondary-nav',
				'.zak-tertiary-nav',
				'.zak-quaternary-nav'
			],

			// Breathing room kept between the sub menu and the edge of the viewport.
			edgeGap = 10,

			itemSelector = navSelectors.map( function( nav ) {
				return nav + ' li.menu-item-has-children, ' + nav + ' li.page_item_has_children';
			} ).join( ', ' ),

			// A device can be both touch and mouse, so listen for both rather than picking one.
			openEvents = ['mouseenter', 'touchstart', 'focusin'];

		function isRtl() {
			return 'rtl' === (
				document.documentElement.getAttribute( 'dir' ) || ''
			).toLowerCase();
		}

		// The sub menu belonging to this item, ignoring any deeper ones.
		function directSubMenu( li ) {
			var children = li.children,
				k;

			for ( k = 0; k < children.length; k++ ) {
				if ( children[k].classList && (
					children[k].classList.contains( 'sub-menu' ) ||
					children[k].classList.contains( 'children' )
				) ) {
					return children[k];
				}
			}

			return null;
		}

		// Second level and deeper open beside their parent, top level opens below it.
		function isNested( li ) {
			var parentUl = li.parentNode;

			return !! (
				parentUl && parentUl.classList && (
					parentUl.classList.contains( 'sub-menu' ) ||
					parentUl.classList.contains( 'children' )
				)
			);
		}

		/**
		 * Works out where the sub menu *would* land before it is shown.
		 *
		 * Measured from the parent item plus the sub menu's own width, because the
		 * sub menu itself may still be parked at `left: -999999px` at this point and
		 * its own rect would be meaningless. `clientWidth` already excludes the
		 * scrollbar, so classic vs overlay scrollbars make no difference.
		 */
		function needsFlip( li, subMenu ) {
			var liRect        = li.getBoundingClientRect(),
				subWidth      = subMenu.offsetWidth,
				viewportWidth = document.documentElement.clientWidth || window.innerWidth;

			if ( ! subWidth ) {
				return false;
			}

			if ( isRtl() ) {
				return (
					( isNested( li ) ? liRect.left : liRect.right ) - subWidth
				) < edgeGap;
			}

			return (
				( isNested( li ) ? liRect.right : liRect.left ) + subWidth
			) > ( viewportWidth - edgeGap );
		}

		function updateEdge( ev ) {
			var li = ev.currentTarget,
				subMenu;

			if ( ! li ) {
				return;
			}

			subMenu = directSubMenu( li );

			if ( ! subMenu ) {
				return;
			}

			if ( needsFlip( li, subMenu ) ) {
				subMenu.classList.add( 'zak-edge' );
			} else {
				subMenu.classList.remove( 'zak-edge' );
			}
		}

		// Clears this item and anything nested inside it.
		function clearEdge( el ) {
			var edged = el.querySelectorAll( '.zak-edge' ),
				k;

			for ( k = 0; k < edged.length; k++ ) {
				edged[k].classList.remove( 'zak-edge' );
			}
		}

		function onLeave( ev ) {
			if ( ev.currentTarget ) {
				clearEdge( ev.currentTarget );
			}
		}

		function onFocusOut( ev ) {
			var li = ev.currentTarget;

			// Keep the flip while focus is still somewhere inside this item.
			if ( li && ! li.contains( ev.relatedTarget ) ) {
				clearEdge( li );
			}
		}

		/**
		 * Binds the flip-detection listeners to every item with a sub menu
		 * currently in the document. Callable more than once, so a nav menu
		 * swapped in later - not just the one present at page load - still
		 * gets covered; old listeners on now-detached elements are simply
		 * garbage collected, never double-bound.
		 */
		function bindEdgeDetection() {
			var elWithChildren = document.querySelectorAll( itemSelector ),
				elCount        = elWithChildren.length,
				k, m;

			for ( k = 0; k < elCount; k++ ) {
				for ( m = 0; m < openEvents.length; m++ ) {
					elWithChildren[k].addEventListener(
						openEvents[m],
						updateEdge,
						'touchstart' === openEvents[m] ? { passive: true } : false
					);
				}

				elWithChildren[k].addEventListener( 'mouseleave', onLeave, false );
				elWithChildren[k].addEventListener( 'focusout', onFocusOut, false );
			}
		}

		bindEdgeDetection();

		// A resize can move a sub menu in or out of the edge, so start clean.
		window.addEventListener( 'resize', function() {
			clearTimeout( resizeTimer );

			resizeTimer = setTimeout( function() {
				clearEdge( document );
			}, 150 );
		}, false );

		// The Customizer preview replaces a nav menu's markup via selective
		// refresh whenever its location/content is edited live, and WP core
		// fires this event on the new markup afterwards - the one-time scan
		// above never saw those replacement items, so the flip silently
		// stopped working for any menu edited in the Customizer (zakra-pro#228).
		if ( window.jQuery ) {
			window.jQuery( document ).on( 'customize-preview-menu-refreshed', bindEdgeDetection );
		}

	}
	() );

/**
 * Keep menu items on one line.
 */
(
	function() {

		// Get required elements.
		var more, search, cart, button, button2, searchWidth, cartWidth, buttonWidth, moreWidth, navUl, navLi,
			navLiWidth, extraWrap, navWrapWidth, overflowItems;

		navigation = document.getElementById( 'zak-primary-nav' );

		// Return if no navigation markup.

		if ( null === navigation ) {
			return;
		}

		// Return if `Keep Menu Items on One Line` customizer option is not enabled

		if ( ! navigation.classList.contains( 'zak-extra-menus' ) ) {
			return;
		}

		// Extra ellipsis icon added via PHP.
		more      = navigation.getElementsByClassName( 'zak-menu-extras-wrap' )[0];

		// Ul to append extra menu items.
		extraWrap = document.getElementById( 'zak-menu-extras' );

		// No primary menu assigned.
		if ( null === extraWrap ) {
			return;
		}

		navUl = navigation.getElementsByClassName( 'nav-menu' )[0];

		navLi = ZakraNavHelper.getChildNodes( navUl );

		navWrapWidth = navigation.offsetWidth;

		search      = navigation.getElementsByClassName( 'zak-header-search' )[0];
		cart        = navigation.getElementsByClassName( 'zak-menu-item-cart' )[0];
		button      = navigation.getElementsByClassName( 'zak-header-button-wrap' )[0];
		button2     = navigation.getElementsByClassName( 'zak-header-button-wrap' )[1];

		searchWidth = search ? ZakraNavHelper.dimension( search ) : 0;
		cartWidth   = cart ? ZakraNavHelper.dimension( cart ) : 0;
		buttonWidth = button ? ZakraNavHelper.dimension( button ) : 0;
		buttonWidth += button2 ? ZakraNavHelper.dimension( button2 ) : 0;
		moreWidth   = more ? ZakraNavHelper.dimension( more ) : 0;

		navUlTempWidth = navWrapWidth - ( searchWidth + cartWidth + buttonWidth + moreWidth );

		navLiWidth = 0;


		navLi.forEach( function( menuItem, index  ) {
			navLiWidth += ZakraNavHelper.dimension( menuItem );
		} );

		navWrapWidth = ( navLi.length - 1 ) * 24;

		// If overflow.
		if ( navLiWidth > navWrapWidth ) {

			overflowItems = ZakraNavHelper.getOverflowItems( navLi );

			overflowItems.forEach( function( item ) {
				extraWrap.appendChild( item );
			} );

		} else {

			// Remove ellipsis icon for more.
			more.parentNode.removeChild( more );
		}

		navigation.style.flex = '';
	}()
);

/**
 * Close mobile menu on clicking menu items.
 */
(
	function() {
		var mobMenuItems      = document.querySelectorAll( '#zak-mobile-nav li a' ),
			toggleButton      = document.querySelector( '.zak-toggle-menu' ),
			mobMenuItemsCount = mobMenuItems.length,
			item;

		for ( var i = 0; i < mobMenuItemsCount; i++ ) {
			item = mobMenuItems[i];

			item.addEventListener(
				'click',
				function() {
					toggleButton.click();
				}
			);
		}
	}()
);

