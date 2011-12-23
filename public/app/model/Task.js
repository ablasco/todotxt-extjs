/**
 * The Task model definition
 */
Ext.define('TodoTxt.model.Task', {
    extend: 'Ext.data.Model',

    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'priority',
            type: 'string'
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'context',
            type: 'string'
        },
        {
            name: 'project',
            type: 'string'
        }
    ]
});
