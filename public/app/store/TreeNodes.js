/**
 * The Tasks store
 */
Ext.define('TodoTxt.store.TreeNodes', {
    extend: 'Ext.data.TreeStore',

    //autoLoad: true,
    root: {
        expanded: true,
        children: [
            { text: 'All tasks', leaf: true, icon: 'images/text_list_numbers.png' },
            { id: 'pending', text: 'Pending', leaf: true, icon: 'images/time.png' },
            { id: 'nContexts', text: 'Contexts', expanded: true, icon: 'images/tag.png', children: []},
            { id: 'nProjects', text: 'Projects', expanded: true, icon: 'images/folder.png', children: []},
            { id: 'complete', text: 'Complete', leaf: true, icon: 'images/tick.png' }
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
