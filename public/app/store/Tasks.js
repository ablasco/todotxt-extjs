/**
 * The Tasks store.
 * @class TodoTxt.store.Tasks
 * @extends Ext.data.Store
 */
Ext.define('TodoTxt.store.Tasks', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,
    //groupField: 'projects',

    /**
     * @cfg {Array} sorters Custom function to order tasks by priority.
     */
    sorters: [{
        sorterFn: function(o1, o2) {
            var getRank = function(o) {
                var p = o.get('priority');
                if      (p === 'A') return 1;
                else if (p === 'B') return 2;
                else if (p === 'C') return 3;
                else if (p === 'D') return 4;
                else return 5;
            },
            p1 = getRank(o1),
            p2 = getRank(o2);

            if (p1 === p2) {
                return 0;
            }

            return p1 < p2 ? -1 : 1;
        }
    }],

    /**
     * @cfg {Array} fields
     */
    fields: [
        'text',
        'priority',
        'complete',
        'completed',
        'date',
        'contexts',
        'projects'
    ],

    /**
     * @cfg {Object} proxy REST proxy for API communications.
     */
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
    },

    filterByCategory: function(parentId, id, text) {
        this.clearFilter();

        if (parentId === 'root') {
            if (id === 'pending') {
                this.filter('complete', false);
            } else if (id === 'complete') {
                this.filter('complete', true);
            }
        } else if (parentId === 'nContexts') {
            this.filter('contexts', text);
        } else if (parentId === 'nProjects') {
            this.filter('projects', text);
        }
    }
});
