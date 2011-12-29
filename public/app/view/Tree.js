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
        'itemclick': function(cmp, rec) {
            var store = Ext.getStore('Tasks'),
                text = rec.data.text,
                parentId = rec.data.parentId,
                id = rec.data.id;

            store.filterByCategory(parentId, id, text);
        }
    },

    initComponent: function () {
        this.callParent(arguments);
        //this.getStore().loadContexts();
    }
});
