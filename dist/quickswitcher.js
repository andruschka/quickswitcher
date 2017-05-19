'use strict';

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'options' in newState && differs( state.options, oldState.options ) ) || ( 'value' in newState && differs( state.value, oldState.value ) ) ) {
		state.sortedOptions = newState.sortedOptions = template.computed.sortedOptions( state.options, state.value );
	}
}

var template = (function () {
  // ### TODO : 
  // - last used
  var defaultRun = function (str) {
    return window.location.assign(window.location.href.replace(window.location.pathname, str))
  }

  return {
    data: function () {
      return {
        open: false,
        value: '',
        options: [],
        run: defaultRun,
        placeholder: '',
        active: null,
        selected: 0,
      }
    },

    oncreate: function () {
      var _this = this
      window.onkeyup = function (e) {
        // open
        if (e.ctrlKey && e.keyCode === 75) {
          if (!_this.get(open)) {
            _this.set({ open: true })
            document.getElementById('qs-inp').focus()
          }

          // close
        } else if (e.keyCode === 27) {
          _this.close()
        }
      }
    },

    helpers: {
      optionIsActive: function (index, selected) {
        if (index === selected) {
          return true
        } else return false
      },
    },

    computed: {
      sortedOptions: function (options, value) {
        var rgx = new RegExp(value, 'ig')
        return options.filter(function (opt) {
          return (rgx.test(opt.value) || rgx.test(opt.title))
        })
      },
    },

    methods: {
      close: function () {
        this.set({ open: false, value: '', selected: 0 })
      },
      run: function (opt) {
        this.get('run').call(null, opt.value)
        this.close()
      },
      switchCurrentActive: function (evt) {
        var selected = this.get('selected')
        var opts = this.get('sortedOptions')
        if (evt.key === 'Enter') {
          if (opts && opts[0]) this.run(opts[selected])
          else this.close()
        } else {
          this.set({ selected: 0 })
        }
      },
      changeSelected: function (evt) {
        var selected = this.get('selected')
        var opts = this.get('sortedOptions')
        if (evt.key === 'ArrowDown') {
          if (selected < opts.length - 1) this.set({ selected: selected + 1 })
        } else if (evt.key === 'ArrowUp') {
          if (selected > 0) this.set({ selected: selected - 1 })
        } else if (evt.key === 'Backspace') {
          this.set({ selected: 0 })
        }
      },
    },
  }

}());

var addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n  [svelte-4204653278]#qs-modal, [svelte-4204653278] #qs-modal {\n    position: fixed;\n    left: 0;\n    top: 0;\n    height: 100%;\n    width: 100%;\n    z-index: 101;\n  }\n  [svelte-4204653278]#qs-bg, [svelte-4204653278] #qs-bg {\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    height: 100%;\n    width: 100%;\n    background-color: rgba(0,0,0,.7);\n    filter: blur(5px);\n    z-index: 100;\n  }\n  [svelte-4204653278]#qs-content-wrap, [svelte-4204653278] #qs-content-wrap {\n    z-index: 102;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 100%;\n    padding-top: 30vh;\n  }\n  [svelte-4204653278]#qs-content, [svelte-4204653278] #qs-content {\n    max-width: 600px;\n    width: 460px;\n    box-shadow: 0 1px 10px rgba(0,0,0,.5);\n    background: #FFF;\n    border-radius: 8px;\n    padding: .75rem 1rem;\n    margin: 0 auto;\n    font-family: Slack-Lato,appleLogo,sans-serif;\n  }\n  [svelte-4204653278]#qs-jumper-help, [svelte-4204653278] #qs-jumper-help {\n    color: #A0A0A2;\n    font-size: .8rem;\n    margin-bottom: 8px;\n    \n  }\n  [svelte-4204653278]#qs-inp, [svelte-4204653278] #qs-inp {\n    width: 100%;\n    font-size: 2rem;\n    font-family: Slack-Lato,appleLogo,sans-serif;\n    font-weight: 700;\n    padding: 1rem;\n    border: 1px solid #A0A0A2!important;\n    border-radius: 6px;\n    box-shadow: none!important;\n    color: #2C2D30;\n    margin-bottom: 1rem;\n  }\n  [svelte-4204653278]#qs-options, [svelte-4204653278] #qs-options {\n    margin-top: 10px;\n    padding-left: 0px;\n    padding-right: 0px;\n  }\n  [svelte-4204653278]#qs-options li, [svelte-4204653278] #qs-options li {\n    text-decoration: none;\n    outline: 0;\n    background: 0 0;\n    display: block;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    font-size: 16px;\n    line-height: 30px;\n    border-radius: 6px;\n    font-weight: 700;\n    margin: 0;\n    padding: 0 .5rem 0 .75rem;\n    position: relative;\n    border: 1px solid #fff;\n    color: #000;\n  }\n  [svelte-4204653278]#qs-options li.active, [svelte-4204653278] #qs-options li.active  {\n    border-color: steelblue;\n    background-color: steelblue;\n    color: #fff;\n  }\n  [svelte-4204653278]#qs-options li:hover, [svelte-4204653278] #qs-options li:hover  {\n    border-color: steelblue;\n  }\n  [svelte-4204653278]#qs-options li:hover, [svelte-4204653278] #qs-options li:hover {\n    cursor: pointer;\n  }\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.open ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( ifBlock_anchor );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-4204653278', '' );
	div.id = "qs-modal";
	
	var div$1 = createElement( 'div' );
	setAttribute( div$1, 'svelte-4204653278', '' );
	div$1.id = "qs-bg";
	
	appendNode( div$1, div );
	appendNode( createText( "\n    " ), div );
	
	var div$2 = createElement( 'div' );
	setAttribute( div$2, 'svelte-4204653278', '' );
	div$2.id = "qs-content-wrap";
	
	function clickHandler ( event ) {
		component.close();
	}
	
	addEventListener( div$2, 'click', clickHandler );
	
	appendNode( div$2, div );
	
	var div$3 = createElement( 'div' );
	setAttribute( div$3, 'svelte-4204653278', '' );
	div$3.id = "qs-content";
	
	appendNode( div$3, div$2 );
	
	var div$4 = createElement( 'div' );
	setAttribute( div$4, 'svelte-4204653278', '' );
	div$4.id = "qs-jumper-help";
	setAttribute( div$4, 'aria-hidden', "true" );
	
	appendNode( div$4, div$3 );
	
	var strong = createElement( 'strong' );
	setAttribute( strong, 'svelte-4204653278', '' );
	
	appendNode( strong, div$4 );
	appendNode( createText( "up" ), strong );
	appendNode( createText( "/" ), div$4 );
	
	var strong$1 = createElement( 'strong' );
	setAttribute( strong$1, 'svelte-4204653278', '' );
	
	appendNode( strong$1, div$4 );
	appendNode( createText( "down" ), strong$1 );
	appendNode( createText( " to navigate; " ), div$4 );
	
	var strong$2 = createElement( 'strong' );
	setAttribute( strong$2, 'svelte-4204653278', '' );
	
	appendNode( strong$2, div$4 );
	appendNode( createText( "enter" ), strong$2 );
	appendNode( createText( " to select; " ), div$4 );
	
	var strong$3 = createElement( 'strong' );
	setAttribute( strong$3, 'svelte-4204653278', '' );
	
	appendNode( strong$3, div$4 );
	appendNode( createText( "esc" ), strong$3 );
	appendNode( createText( " to dismiss" ), div$4 );
	appendNode( createText( "\n      " ), div$3 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-4204653278', '' );
	input.type = "text";
	input.autofocus = '';
	input.id = "qs-inp";
	
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component._set({ value: input.value });
		input_updating = false;
	}
	
	addEventListener( input, 'input', inputChangeHandler );
	
	function keypressHandler ( event ) {
		component.switchCurrentActive(event);
	}
	
	addEventListener( input, 'keypress', keypressHandler );
	
	var last_input_placeholder = root.placeholder;
	input.placeholder = last_input_placeholder;
	
	function keydownHandler ( event ) {
		component.changeSelected(event);
	}
	
	addEventListener( input, 'keydown', keydownHandler );
	
	input.__svelte = {
		root: root
	};
	
	appendNode( input, div$3 );
	
	input.value = root.value ;
	
	appendNode( createText( "\n      " ), div$3 );
	
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-4204653278', '' );
	ul.id = "qs-options";
	
	appendNode( ul, div$3 );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.sortedOptions;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( !input_updating ) {
				input.value = root.value ;
			}
			
			if ( ( __tmp = root.placeholder ) !== last_input_placeholder ) {
				last_input_placeholder = __tmp;
				input.placeholder = last_input_placeholder;
			}
			
			input.__svelte.root = root;
			
			var eachBlock_value = root.sortedOptions;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			removeEventListener( div$2, 'click', clickHandler );
			removeEventListener( input, 'input', inputChangeHandler );
			removeEventListener( input, 'keypress', keypressHandler );
			removeEventListener( input, 'keydown', keydownHandler );
			
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, option, index, component ) {
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-4204653278', '' );
	
	function clickHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, option = eachBlock_value[index]
		
		component.run(option);
	}
	
	addEventListener( li, 'click', clickHandler );
	
	var last_li_class = template.helpers.optionIsActive(index, root.selected) ? 'active' : '';
	li.className = last_li_class;
	
	li.__svelte = {
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	var last_text = option.title;
	var text = createText( last_text );
	appendNode( text, li );

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, option, index ) {
			var __tmp;
		
			if ( ( __tmp = template.helpers.optionIsActive(index, root.selected) ? 'active' : '' ) !== last_li_class ) {
				last_li_class = __tmp;
				li.className = last_li_class;
			}
			
			li.__svelte.eachBlock_value = eachBlock_value;
			li.__svelte.index = index;
			
			if ( ( __tmp = option.title ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( li, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( li );
			}
		}
	};
}

function QuickSwitcher ( options ) {
	options = options || {};
	this._state = Object.assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.oncreate, context: this });
	} else {
		template.oncreate.call( this );
	}
}

QuickSwitcher.prototype = template.methods;

QuickSwitcher.prototype.get = get;
QuickSwitcher.prototype.fire = fire;
QuickSwitcher.prototype.observe = observe;
QuickSwitcher.prototype.on = on;
QuickSwitcher.prototype.set = set;
QuickSwitcher.prototype._flush = _flush;

QuickSwitcher.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

QuickSwitcher.prototype.teardown = QuickSwitcher.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function differs( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function get( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set( newState ) {
	this._set( newState );
	( this._root || this )._flush();
}

function _flush() {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

module.exports = QuickSwitcher;