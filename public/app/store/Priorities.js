/**
 * The Priorities store.
 *
 * @class TodoTxt.store.Priorities
 * @extends Ext.data.Store
 */
Ext.define('TodoTxt.store.Priorities', {
    extend: 'Ext.data.Store',

    autoLoad: true,

    /**
     * @cfg {Array} fields
     *
     * - id
     * - name
     */
    fields: ['id', 'name'],

    /**
     * @cfg {Array} data Mocked data.
     */
    data: [
        {'id': 'A', 'name': 'A'},
        {'id': 'B', 'name': 'B'},
        {'id': 'C', 'name': 'C'},
        {'id': 'D', 'name': 'D'}
    ]
});
