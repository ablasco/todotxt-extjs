/**
 * The Task model definition.
 *
 * @class TodoTxt.model.Task
 * @extends Ext.data.Model
 */
Ext.define('TodoTxt.model.Task', {
    extend: 'Ext.data.Model',

    idProperty: 'id',
    fields: [
        /** @property {String} id Task identifier. */
        {name: 'id',         type: 'string'},

        /** @property {String} text The core text of the item. */
        {name: 'text',       type: 'string'},

        /** @property {String} priority The priority level of the item as string [A-Z]. */
        {name: 'priority',   type: 'string'},

        /** @property {Boolean} complete Marked as completed. */
        {name: 'complete',   type: 'boolean'},

        /** @property {String} completed Date completed. */
        {name: 'completed',  type: 'string'},

        /** @property {String} date Date attached to object, typically with a complete item. */
        {name: 'date',       type: 'string'},

        /** @property {Array} contexts Contexts for the object, e.g. @Home == "Home". */
        {name: 'contexts',   type: 'array'},

        /** @property {Array} projects Projects fot the object, e.g. +Chores == "Chores". */
        {name: 'projects',   type: 'array'}
    ],

    proxy: {
        type: 'rest',
        url: '/task/',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
