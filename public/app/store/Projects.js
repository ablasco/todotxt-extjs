/**
 * The Priorities store
 */
Ext.define('TodoTxt.store.Projects', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['id', 'name'],

    data: []
});
