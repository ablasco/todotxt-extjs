/**
 * The Tasks store
 */
Ext.define('TodoTxt.store.Tasks', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,
    sorters: ['priority', 'content', 'projects', 'contexts'],
    //groupField: 'projects',
    listeners: {
        'load': function() {
            var store = Ext.getStore('TreeNodes');

            store.loadNodes('nContexts', this.getContexts(), {
                leaf: true, icon: 'images/tag.png'
            });
            store.loadNodes('nProjects', this.getProjects(), {
                leaf: true, icon: 'images/folder.png'
            });
        }
    },

    fields: [
        'text',
        'priority',
        'complete',
        'completed',
        'date',
        'contexts',
        'projects'
    ],

    proxy: {
        type: 'rest',
        url: '/task/',
        model: 'TodoTxt.model.Task',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },

    getContexts: function() {
        var contexts = [];

        this.each(function(task) {
            Ext.each(String(task.data.contexts).split(','), function(item) {
                contexts.push(item);
            });
        });

        return Ext.Array.sort(Ext.Array.unique(contexts));
    },

    getProjects: function() {
        var projects = [];

        this.each(function(task) {
            Ext.each(String(task.data.projects).split(','), function(item) {
                projects.push(item);
            });
        });

        return Ext.Array.sort(Ext.Array.unique(projects));
    }
});
