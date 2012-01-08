/**
 * Simple store of tree nodes for task categories.
 * @class TodoTxt.store.TreeNodes
 * @extends Ext.data.TreeStore
 */
Ext.define('TodoTxt.store.TreeNodes', {
    extend: 'Ext.data.TreeStore',

    //autoLoad: true,
    root: {
        expanded: true,
        children: [
            { text: 'All tasks', leaf: true, icon: 'images/_list.png' },
            { id: 'pending', text: 'Pending', leaf: true, icon: 'images/_clock.png' },
            { id: 'nContexts', text: 'Contexts', expanded: true, icon: 'images/_at.png', children: []},
            { id: 'nProjects', text: 'Projects', expanded: true, icon: 'images/_plus.png', children: []},
            { id: 'complete', text: 'Complete', leaf: true, icon: 'images/_check.png' }
        ]
    },

    /**
     * Basic initialization duties.
     */
    initComponent: function () {
        this.callParent(arguments);
    },

    /**
     * Reloads all children nodes for a given tree node.
     * @param {String} parentId Id for parent node.
     * @param {Array} data Nodes to be loaded.
     * @param cfg
     */
    loadNodes: function(parentId, data, cfg) {
        var node = this.getNodeById(parentId);

        node.removeAll();
        Ext.each(data, function(d) {
            if (d !== 'null') {
                cfg.text = d;
                node.appendChild(cfg);
            }
        });
    }
});
