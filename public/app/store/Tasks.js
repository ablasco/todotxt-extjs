/**
 * The Tasks store
 */
Ext.define('TodoTxt.store.Tasks', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,
    sorters: ['priority', 'content', 'projects', 'contexts'],
    //groupField: 'projects',

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
    }
});
