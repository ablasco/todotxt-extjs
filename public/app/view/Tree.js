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

        // Reload tree when data changed in grid's store.
        var sTasks = Ext.getStore('Tasks'),
            sNodes = Ext.getStore('TreeNodes');

        sTasks.addListener('datachanged', function() {
            var contexts = this.getContexts(),
                projects = this.getProjects(),
                lc = [],
                lp = [];

            // Reloading tree nodes.
            sNodes.loadNodes('nContexts', contexts, {
                leaf: true, icon: 'images/_at.png'
            });
            sNodes.loadNodes('nProjects', projects, {
                leaf: true, icon: 'images/_plus.png'
            });

            // Reloading comboboxes options.
            Ext.each(contexts, function(c) {lc.push({id: c, name: c})});
            Ext.getStore('Contexts').loadData(lc);
            Ext.each(projects, function(p) {lp.push({id: p, name: p})});
            Ext.getStore('Projects').loadData(lp);
        });
    }
});
