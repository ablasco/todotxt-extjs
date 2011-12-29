/**
 * The Task model definition
 *
 *  text      // The core text of the item
 *  priority  // The priority level of the item as string [A-Z]
 *  complete  // Boolean
 *  completed // Date completed
 *  date      // Date attached to object, typically with a complete item
 *  contexts  // Array, contexts for the object, e.g. @Home == "Home"
 *  projects  // Array, projects fot the object, e.g. +Chores == "Chores"
 */
Ext.define('TodoTxt.model.Task', {
    extend: 'Ext.data.Model',

    idProperty: 'id',
    fields: [
        {name: 'id',         type: 'string'},
        {name: 'text',       type: 'string'},
        {name: 'priority',   type: 'string'},
        {name: 'complete',   type: 'boolean'},
        {name: 'completed',  type: 'string'},
        {name: 'date',       type: 'string'},
        {name: 'contexts',   type: 'array'},
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
