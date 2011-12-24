/**
 * The Movies controller.
 */
Ext.define("TodoTxt.controller.Tasks", {
    extend: 'Ext.app.Controller',

    models: [
        'Task'
    ],

    stores: [
        'Tasks'
    ],

    views:  [
        'Tasks'
    ],

    init: function () {
        this.control({
            'taskseditor': {
                render: this.onEditorRender,
                edit: this.afterTaskEdit,
                taskEdit: this.onTaskEdit,
                taskDelete: this.onTaskDelete
            },
            'taskseditor button': {
                click: this.addTask
            }
        });
    },

    onEditorRender: function () {
        // cache a reference to the tasksEditor and rowEditor
        this.tasksEditor = Ext.ComponentQuery.query('taskseditor')[0];
        this.rowEditor = this.tasksEditor.rowEditor;
    },

    afterTaskEdit: function () {
        var s = this.getStore('Tasks');
        s.sync();
    },

    addTask: function () {
        var newTask,
            s = this.getStore('Tasks');

        // add blank item to store -- will automatically add new row to grid
        newTask = s.add({
            title: '',
            year: ''
        })[0];

        this.rowEditor.startEdit(newTask, this.tasksEditor.columns[0]);
    },

    onTaskEdit: function (evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.tasksEditor.columns[evtData.colIndex]);
        }
    },

    onTaskDelete: function (evtData) {
        var s = this.getStore('Tasks');
        var record = s.getAt(evtData.rowIndex);
        if(record) {
            s.remove(record);
            s.sync();
        }
    }
});
