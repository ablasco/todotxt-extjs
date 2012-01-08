/**
 * Category tree for task grid filtering.
 * @class TodoTxt.view.Tree
 * @extends Ext.tree.Panel
 */
Ext.define('TodoTxt.view.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.taskstree',

    width: 200,
    height: 500,
    store: 'TreeNodes',
    rootVisible: false,
    listeners: {
        /**
         * @event
         * Filters grid contents by selected category.
         * @param {Object} cmp Own component
         * @param {Object} rec Task model selected
         */
        'itemclick': function(cmp, rec) {
            var store = Ext.getStore('Tasks'),
                text = rec.data.text,
                parentId = rec.data.parentId,
                id = rec.data.id;

            store.filterByCategory(parentId, id, text);
        }
    },

    /**
     * Basic initialization duties.
     */
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
            Ext.each(contexts, function(c) { lc.push({id: c, name: c}); });
            Ext.getStore('Contexts').loadData(lc);
            Ext.each(projects, function(p) { lp.push({id: p, name: p}); });
            Ext.getStore('Projects').loadData(lp);
        });
    }
});
