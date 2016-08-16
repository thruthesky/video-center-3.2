/**
 *
 *
 * @file element.js
 * @description
 *
 *  -  put functions like element state checking, dom/element manipulation.
 *
 *  - before adding a function here check if the function is
 *
 *      -- an action. if it's an action, it should be put in actions.js
 *      -- a dom navigation or dom finding. if so, it should be put in dom-navigator.
 *
 *
 *
 */


(function($){
    $.fn.isActive = function () {
        return this.css('display') != 'none';
    };
}(jQuery));

