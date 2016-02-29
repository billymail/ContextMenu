/**
 * @brief JS Context Menu
 *
 * Based on Simple Context Menu
 * [url=http://www.webtoolkit.info] http://www.webtoolkit.info[/url]
 * By Pieter-Jan Piro - [url=http://www.piro.ws]http://www.piro.ws[/url]
 * 
 * Update with simple touch events, and for new MooTools without Compatibility
 *
 **/
var Context = new Class({
    getOptions: function() {
        return {
            menus: [],
            offsets: {'x': 5, 'y': 5},
            onShow: function(menu, el){
                menu.setStyle('display', 'block');
            },
            onHide: function(menu, el){
                menu.setStyle('display', 'none');
            }
        }
    },
/**
 * @brief Initialize
 */
    initialize: function(options){
    // load the context menu css
        if (!$('CONTEXT_CSS')) {
            new Asset.css('/js/widgets/Context/css/Context.css', {id: 'CONTEXT_CSS'});
        }
        this.setOptions(this.getOptions(), options);
        // if (Browser.Engine.trident || Browser.Engine.gecko){
            var self = this;
            document.addEvent('mousedown', function(e) {
                self.showContext(e, this);
            });
            document.addEvent('contextmenu', function(e) {
                self.hideContext(e, this);
            });
        // }
    },
/**
 * @brief Show Context Menu
 */
    showContext: function(e){
        if (this.currentMenu){
            //check if childnode from menu is clicked...Older IE Doesn't Support
            var tipPos = {'x': this.currentMenu.getStyle('left').toInt(), 'y': this.currentMenu.getStyle('top').toInt()};
            var tip = {'x': this.currentMenu.offsetWidth, 'y': this.currentMenu.offsetHeight};
            if (!(tipPos.x < e.page.x && e.page.x < tipPos.x+tip.x && tipPos.y < e.page.y && e.page.y < tipPos.y+tip.y )){
              this.hide();
            }
        }
        if (e.rightClick || ('ontouchstart' in document.documentElement)){
            //show contextmenu...
            var el = e.target;

            if (typeOf(el.getProperty('Context')) != 'false' && this.options.menus[el.getProperty('Context')]){
                this.currentMenu = this.options.menus[el.getProperty('Context')];
                this.currentEl = el;
                this.locate(e);
                this.options.onShow(this.currentMenu, el);
                e.stop();
                return false;
            }
        }
        if ('ontouchstart' in document.documentElement) {
            return false;
        }

        return true;
    },
/**
 * @brief Hide Context Options
 */
    hide: function(){
        this.options.onHide(this.currentMenu, this.currentEl);
    },
/**
 * @brief Hide Context Menu
 */
    hideContext: function(e){
        var el = e.target;
        if (typeOf(el.getProperty('Context')) != 'false'
            && this.options.menus[el.getProperty('Context')] || el == this.currentMenu){
            e.stop();
            return false;
        }
    },
    locate: function(event){
        var prop = {'x': 'left', 'y': 'top'};
        for (var z in prop){
            var pos = event.page[z] + this.options.offsets[z];
            this.currentMenu.setStyle(prop[z], pos + 'px');
        }
    },
    attachMenu: function(el, menu){
        if (typeOf(menu) == 'element'){
            var menuId = this.options.menus.push(menu)-1;
        } else if ($type(menu) == 'number'){
            var menuId = menu;
        } else {
            return false;
        }
        el.setProperty('Context', menuId);
        return menuId;
    }
});
Context.implement(new Options);
