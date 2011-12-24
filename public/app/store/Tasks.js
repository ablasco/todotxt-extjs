/**
 * The Tasks store
 */
Ext.define('TodoTxt.store.Tasks', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,

    //fields: ['id', 'priority', 'content', 'context', 'project'],
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
