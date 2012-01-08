/**
 * The Projects store
 *
 * @class TodoTxt.store.Projects
 * @extends Ext.data.Store
 */
Ext.define('TodoTxt.store.Projects', {
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
