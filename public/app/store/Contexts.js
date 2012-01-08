/**
 * The Contexts store.
 *
 * @class TodoTxt.store.Contexts
 * @extends Ext.data.Store
 */
Ext.define('TodoTxt.store.Contexts', {
    extend: 'Ext.data.Store',

    autoLoad: true,

    /**
     * @cfg {Array} fields
     *
     * - id
     * - name
     */
    fields: ['id', 'name'],

    data: []
});
