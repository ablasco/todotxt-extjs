/**
 * The Tasks store
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

    initComponent: function () {
        this.callParent(arguments);
    },

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
