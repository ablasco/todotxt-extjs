/**
 * The Priorities store
 */
Ext.define('TodoTxt.store.Priorities', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['id', 'name'],

    data: [
        {'id': 'A', 'name': 'A'},
        {'id': 'B', 'name': 'B'},
        {'id': 'C', 'name': 'C'},
        {'id': 'D', 'name': 'D'}
    ]
});
