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

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-4204653278-style";
	style.textContent = "\n  [svelte-4204653278]#qs-modal, [svelte-4204653278] #qs-modal {\n    position: fixed;\n    left: 0;\n    top: 0;\n    height: 100%;\n    width: 100%;\n    z-index: 101;\n  }\n  [svelte-4204653278]#qs-bg, [svelte-4204653278] #qs-bg {\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    height: 100%;\n    width: 100%;\n    background-color: rgba(0,0,0,.7);\n    filter: blur(5px);\n    z-index: 100;\n  }\n  [svelte-4204653278]#qs-content-wrap, [svelte-4204653278] #qs-content-wrap {\n    z-index: 102;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 100%;\n    padding-top: 30vh;\n  }\n  [svelte-4204653278]#qs-content, [svelte-4204653278] #qs-content {\n    max-width: 600px;\n    width: 460px;\n    box-shadow: 0 1px 10px rgba(0,0,0,.5);\n    background: #FFF;\n    border-radius: 8px;\n    padding: .75rem 1rem;\n    margin: 0 auto;\n    font-family: Slack-Lato,appleLogo,sans-serif;\n  }\n  [svelte-4204653278]#qs-jumper-help, [svelte-4204653278] #qs-jumper-help {\n    color: #A0A0A2;\n    font-size: .8rem;\n    margin-bottom: 8px;\n    \n  }\n  [svelte-4204653278]#qs-inp, [svelte-4204653278] #qs-inp {\n    width: 100%;\n    font-size: 2rem;\n    font-family: Slack-Lato,appleLogo,sans-serif;\n    font-weight: 700;\n    padding: 1rem;\n    border: 1px solid #A0A0A2!important;\n    border-radius: 6px;\n    box-shadow: none!important;\n    color: #2C2D30;\n    margin-bottom: 1rem;\n  }\n  [svelte-4204653278]#qs-options, [svelte-4204653278] #qs-options {\n    margin-top: 10px;\n    padding-left: 0px;\n    padding-right: 0px;\n  }\n  [svelte-4204653278]#qs-options li, [svelte-4204653278] #qs-options li {\n    text-decoration: none;\n    outline: 0;\n    background: 0 0;\n    display: block;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    font-size: 16px;\n    line-height: 30px;\n    border-radius: 6px;\n    font-weight: 700;\n    margin: 0;\n    padding: 0 .5rem 0 .75rem;\n    position: relative;\n    border: 1px solid #fff;\n    color: #000;\n  }\n  [svelte-4204653278]#qs-options li.active, [svelte-4204653278] #qs-options li.active  {\n    border-color: steelblue;\n    background-color: steelblue;\n    color: #fff;\n  }\n  [svelte-4204653278]#qs-options li:hover, [svelte-4204653278] #qs-options li:hover  {\n    border-color: steelblue;\n  }\n  [svelte-4204653278]#qs-options li:hover, [svelte-4204653278] #qs-options li:hover {\n    cursor: pointer;\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var if_block = (state.open) && create_if_block( state, component );

	var if_block_anchor = createComment();

	return {
		mount: function ( target, anchor ) {
			if ( if_block ) if_block.mount( target, anchor );
			insertNode( if_block_anchor, target, anchor );
		},

		update: function ( changed, state ) {
			if ( state.open ) {
				if ( if_block ) {
					if_block.update( changed, state );
				} else {
					if_block = create_if_block( state, component );
					if_block.mount( if_block_anchor.parentNode, if_block_anchor );
				}
			} else if ( if_block ) {
				if_block.destroy( true );
				if_block = null;
			}
		},

		destroy: function ( detach ) {
			if ( if_block ) if_block.destroy( detach );

			if ( detach ) {
				detachNode( if_block_anchor );
			}
		}
	};
}

function create_each_block ( state, each_block_value, option, index, component ) {
	var li_class_value, text_value;

	var li = createElement( 'li' );
	li.className = li_class_value = template.helpers.optionIsActive(index, state.selected) ? 'active' : '';
	addEventListener( li, 'click', click_handler );

	li._svelte = {
		component: component,
		each_block_value: each_block_value,
		index: index
	};

	var text = createText( text_value = option.title );
	appendNode( text, li );

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},

		update: function ( changed, state, each_block_value, option, index ) {
			if ( li_class_value !== ( li_class_value = template.helpers.optionIsActive(index, state.selected) ? 'active' : '' ) ) {
				li.className = li_class_value;
			}

			li._svelte.each_block_value = each_block_value;
			li._svelte.index = index;

			if ( text_value !== ( text_value = option.title ) ) {
				text.data = text_value;
			}
		},

		destroy: function ( detach ) {
			removeEventListener( li, 'click', click_handler );

			if ( detach ) {
				detachNode( li );
			}
		}
	};
}

function create_if_block ( state, component ) {
	var input_placeholder_value, input_updating = false;

	var div = createElement( 'div' );
	setAttribute( div, 'svelte-4204653278', '' );
	div.id = "qs-modal";
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.id = "qs-bg";
	appendNode( createText( "\n    " ), div );
	var div_2 = createElement( 'div' );
	appendNode( div_2, div );
	div_2.id = "qs-content-wrap";

	function click_handler ( event ) {
		component.close();
	}

	addEventListener( div_2, 'click', click_handler );
	var div_3 = createElement( 'div' );
	appendNode( div_3, div_2 );
	div_3.id = "qs-content";
	var div_4 = createElement( 'div' );
	appendNode( div_4, div_3 );
	div_4.id = "qs-jumper-help";
	setAttribute( div_4, 'aria-hidden', "true" );
	var strong = createElement( 'strong' );
	appendNode( strong, div_4 );
	appendNode( createText( "up" ), strong );
	appendNode( createText( "/" ), div_4 );
	var strong_1 = createElement( 'strong' );
	appendNode( strong_1, div_4 );
	appendNode( createText( "down" ), strong_1 );
	appendNode( createText( " to navigate; " ), div_4 );
	var strong_2 = createElement( 'strong' );
	appendNode( strong_2, div_4 );
	appendNode( createText( "enter" ), strong_2 );
	appendNode( createText( " to select; " ), div_4 );
	var strong_3 = createElement( 'strong' );
	appendNode( strong_3, div_4 );
	appendNode( createText( "esc" ), strong_3 );
	appendNode( createText( " to dismiss" ), div_4 );
	appendNode( createText( "\n      " ), div_3 );
	var input = createElement( 'input' );
	appendNode( input, div_3 );
	input.type = "text";
	input.autofocus = '';
	input.id = "qs-inp";
	input.placeholder = input_placeholder_value = state.placeholder;

	function input_input_handler () {
		input_updating = true;
		component._set({ value: input.value });
		input_updating = false;
	}

	addEventListener( input, 'input', input_input_handler );

	function keypress_handler ( event ) {
		component.switchCurrentActive(event);
	}

	addEventListener( input, 'keypress', keypress_handler );

	function keydown_handler ( event ) {
		component.changeSelected(event);
	}

	addEventListener( input, 'keydown', keydown_handler );

	input.value = state.value ;

	appendNode( createText( "\n      " ), div_3 );
	var ul = createElement( 'ul' );
	appendNode( ul, div_3 );
	ul.id = "qs-options";
	var each_block_value = state.sortedOptions;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
		each_block_iterations[i].mount( ul, null );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		update: function ( changed, state ) {
			if ( input_placeholder_value !== ( input_placeholder_value = state.placeholder ) ) {
				input.placeholder = input_placeholder_value;
			}

			if ( !input_updating ) {
				input.value = state.value ;
			}

			var each_block_value = state.sortedOptions;

			if ( 'selected' in changed || 'sortedOptions' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].mount( ul, null );
					}
				}

				destroyEach( each_block_iterations, true, each_block_value.length );
				each_block_iterations.length = each_block_value.length;
			}
		},

		destroy: function ( detach ) {
			removeEventListener( div_2, 'click', click_handler );
			removeEventListener( input, 'input', input_input_handler );
			removeEventListener( input, 'keypress', keypress_handler );
			removeEventListener( input, 'keydown', keydown_handler );

			destroyEach( each_block_iterations, false, 0 );

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function click_handler ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, index = this._svelte.index, option = each_block_value[index];
	component.run(option);
}

function QuickSwitcher ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( "svelte-4204653278-style" ) ) add_css();

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );

	if ( options._root ) {
		options._root._renderHooks.push( template.oncreate.bind( this ) );
	} else {
		template.oncreate.call( this );
	}
}

assign( QuickSwitcher.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

QuickSwitcher.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false )
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

QuickSwitcher.prototype.teardown = QuickSwitcher.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.destroy( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement ( name ) {
	return document.createElement( name );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute( attribute, value );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function addEventListener ( node, event, handler ) {
	node.addEventListener( event, handler, false );
}

function removeEventListener ( node, event, handler ) {
	node.removeEventListener( event, handler, false );
}

function destroyEach ( iterations, detach, start ) {
	for ( var i = start; i < iterations.length; i += 1 ) {
		if ( iterations[i] ) iterations[i].destroy( detach );
	}
}

function createComment () {
	return document.createComment( '' );
}

function differs ( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

function assign ( target ) {
	for ( var i = 1; i < arguments.length; i += 1 ) {
		var source = arguments[i];
		for ( var k in source ) target[k] = source[k];
	}

	return target;
}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( differs( newValue, oldValue ) ) {
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
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.post : this._observers.pre;

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

function on ( eventName, handler ) {
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

function set ( newState ) {
	this._set( assign( {}, newState ) );
	this._root._flush();
}

function _flush () {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		this._renderHooks.pop()();
	}
}

module.exports = QuickSwitcher;