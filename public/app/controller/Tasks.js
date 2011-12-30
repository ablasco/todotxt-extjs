/**
 * The Movies controller.
 */
Ext.define("TodoTxt.controller.Tasks", {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['TreeNodes', 'Tasks', 'Priorities'],
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

    onTaskEdit: function(evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if (record) {
            this.rowEditor.startEdit(record, this.tasksEditor.columns[evtData.colIndex]);
        }
    },

    afterTaskEdit: function() {
        var s = this.getStore('Tasks');
        s.sync();
    },

    onTaskDelete: function(evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if (record) {
            s.remove(record);
            s.sync();
        }
    },

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

    addTask: function() {
        var newTask,
            s = this.getStore('Tasks');

        // add blank item to store -- will automatically add new row to grid
        newTask = s.add({text: ''})[0];
        this.rowEditor.startEdit(newTask, this.tasksEditor.columns[0]);
    },

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
