/**
 * Sets up components
 */

module.exports = function (carbo, config) {
    carbo.set('components', {});
    carbo.set('components.body', document.querySelector('#body'));
    carbo.set('components.canvas', document.querySelector('#canvas'));
    carbo.set('components.componentsPalette', document.querySelector('#components-palette'));
};