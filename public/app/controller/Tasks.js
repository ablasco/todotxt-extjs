/**
 * Controller for tasks management.
 * @class TodoTxt.controller.Tasks
 * @extends Ext.app.Controller
 */
Ext.define("TodoTxt.controller.Tasks", {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['TreeNodes', 'Tasks', 'Priorities', 'Contexts', 'Projects'],
    views:  ['Tree', 'Tasks'],

    init: function() {
        this.control({
            'taskseditor': {
                render: this.onEditorRender,
                taskEdit: this.onTaskEdit,
                edit: this.afterTaskEdit,
                taskDelete: this.onTaskDelete,
                taskComplete: this.onTaskComplete
            },
            '#newTask': {
                click: this.addTask
            },
            '#syncFile': {
                click: this.onSync
            }
        });
    },

    onEditorRender: function() {
        // cache a reference to the tasksEditor and rowEditor
        this.tasksEditor = Ext.ComponentQuery.query('taskseditor')[0];
        this.rowEditor = this.tasksEditor.rowEditor;
    },

    /**
     * Edits a given task.
     * @param {Object} evtData
     */
    onTaskEdit: function(evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if (record) {
            this.rowEditor.startEdit(record, this.tasksEditor.columns[evtData.colIndex]);
        }
    },

    /**
     * Callback for post-edit syncronization tasks.
     * @param {Object} evtData
     */
    afterTaskEdit: function() {
        var s = this.getStore('Tasks');
        s.sync();
    },

    /**
     * Removes a given task.
     * @param {Object} evtData
     */
    onTaskDelete: function(evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if (record) {
            s.remove(record);
            s.sync();
        }
    },

    /**
     * Marks a task as completed.
     * @param {Object} evtData
     */
    onTaskComplete: function(evtData) {
        var s = this.getStore('Tasks'),
            record = s.getAt(evtData.rowIndex);

        if (record) {
            var isCompleted = (record.data.complete === false);
            record.set('complete', isCompleted);
            record.set('completed', isCompleted? new Date() : null);
            record.save();
        }
    },

    /**
     * Creates a new task model.
     */
    addTask: function() {
        var newTask,
            s = this.getStore('Tasks');

        // add blank item to store -- will automatically add new row to grid
        newTask = s.add({text: ''})[0];
        this.rowEditor.startEdit(newTask, this.tasksEditor.columns[0]);
    },

    /**
     * Syncronizes grid contents with server file.
     */
    onSync: function() {
        Ext.Ajax.request({
            url: '/sync',
            success: function(response) {
                var text = response.responseText;
                // process server response here
                console.log(text);
            },
            failure: function(response) {
                var text = response.responseText;
                // process server response here
                console.warn(text);
            }
        });
    }
});
