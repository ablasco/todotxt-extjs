/**
 * The app Viewport. This is the default view displayed when the app is loaded.
 * It is rendered automatically when `autoCreateViewport` is set to `true` in
 * the configuration object given to `Ext.application`.
 */
Ext.define('TodoTxt.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    items: [{
        region: 'north',
        xtype: 'toolbar', height: 100, padding: 10,
        items: [{
            xtype: 'container', bodyPadding: 10,
            html: '<img src="images/todotxt.png" width="64" height="64" />'
        }, {
            xtype: 'tbtext', style: 'font-size: 14px; font-weight: bold;',
            text: 'Todo.txt sample application'
        }]
    }, {
        region: 'center',
        bodyPadding: 50,
        items: [{
            xtype: 'taskseditor'
        }]
    }]
});
