/**
 * The Grid of Movies
 */
Ext.define('TodoTxt.view.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.taskstree',

    width: 200,
    height: 500,
    store: 'TreeNodes',
    rootVisible: false,
    listeners: {
        'itemclick': function(cmp, rec, item, idx) {
            //console.log(cmp, rec, item, idx);
        }
    },

    initComponent: function () {
        this.callParent(arguments);
        //this.getStore().loadContexts();
    }
});
