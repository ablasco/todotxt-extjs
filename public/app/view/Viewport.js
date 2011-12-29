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
        xtype: 'toolbar', height: 80, padding: 7, cls: 'gradient',
        items: [{
            xtype: 'container', bodyPadding: 7,
            html: '<img src="images/todotxt.png" width="64" height="64" />'
        }, {
            xtype: 'tbtext', cls: 'app-title',
            text: 'Todo.txt task editor'
        }, '->', {
            id: 'newTask',
            scale: 'large', width: 42, height: 42,
            tooltip: 'Add new task',
            icon: 'images/_plus_big.png'
        }]
    }, {
        region: 'west',
        title: 'Filter by category',
        width: 200, collapsible: true,
        items: [{
            xtype: 'taskstree'
        }]
    }, {
        region: 'center',
        bodyPadding: 50,
        items: [{
            xtype: 'taskseditor'
        }]
    }]
});
