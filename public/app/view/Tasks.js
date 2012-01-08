/**
 * Grid containing all tasks.
 * @class TodoTxt.view.Tasks
 * @extends Ext.grid.Panel
 */
Ext.define('TodoTxt.view.Tasks', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.taskseditor',

    store: 'Tasks',
    selType: 'rowmodel',
    autoScroll: true,
    autoHeight: true,
    rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2
    }),

    /**
     * Basic initialization duties.
     */
    initComponent: function() {
        var taskEditor = this;
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });
/*
        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners: {
                selectionchange: function(sm, selections) {
                    taskEditor.down('#removeButton').setDisabled(selections.length == 0);
                }
            }
        });
        this.selModel = selModel;
*/
        var rndBoolean = function(value) {
            return (value)? '<img src="images/tick.png">' : '';
        };

        var rndText = function(value, meta, rec) {
            var isCompleted = (rec.data.complete)? 'completed' : '';
            return '<span class="' + isCompleted + '">' + value + '</span>';
        };

        var rndPriority = function(value, meta, rec) {
            if (!value) return '';
            var isCompleted = (rec.data.complete)? 'completed' : '';
            return '<span class="' + isCompleted + ' priority-' + value + '">( ' + value + ' )</span>';
        };

        var rndDate = function(value, meta, rec) {
            if (!value) return '';
            var isCompleted = (rec.data.complete)? 'completed' : '';
            return '<span class="' + isCompleted + '">' + new Date(value).toLocaleDateString() + '</span>';
        };

        var rndCategory = function(value, meta, rec, rowIdx, colIdx) {
            var allItems = String(value).split(',') || [],
                isCompleted = (rec.data.complete)? 'completed' : '',
                //charPrefix = (colIdx === 6)? '@' : '+',
                charPrefix = (colIdx === 5)? '@' : '+',
                output = '<span class="' + isCompleted + '" style="color: #aaa">';

            if (!value) return '';
            Ext.each(allItems, function(item) {
                output += charPrefix + item + ' ';
            });

            return output + '</span>';
        };

        this.addEvents([
        /**
         * @event
         * Fired when a task is edited.
         */
            'taskEdit',

        /**
         * @event
         * Fired when a task is deleted.
         */
            'taskDelete',

        /**
         * @event
         * Fired when a task is marked as complete.
         */
            'taskComplete'
        ]);

        this.columns = [{
            header: 'Done', dataIndex: 'complete',
            flex: 0.5, hidden: true, renderer: rndBoolean,
            editor: {
                xtype: 'checkbox', allowBlank: true
            }
        }, {
            header: 'Completed at', dataIndex: 'completed',
            flex: 1, hidden: true, renderer: rndDate
        }, {
            header: 'Date', dataIndex: 'date',
            flex: 1, hidden: true, renderer: rndDate,
            editor: {
                xtype: 'datefield', allowBlank: true
            }
        }, {
            header: 'Priority', dataIndex: 'priority',
            flex: 0.5, renderer: rndPriority,
            editor: {
                xtype: 'combobox', store: 'Priorities', allowBlank: true,
                queryMode: 'local', displayField: 'name', valueField: 'id'
            }
        }, {
            header: 'Text', dataIndex: 'text',
            flex: 1, renderer: rndText,
            editor: {
                xtype: 'textfield', emptyText: 'Type your task', allowBlank: false
            }
        }, {
            header: 'Contexts', dataIndex: 'contexts',
            flex: 1, renderer: rndCategory,
            editor: {
                xtype: 'combobox', store: 'Contexts', allowBlank: true,
                multiSelect: true, delimiter: ',',
                queryMode: 'local', displayField: 'name', valueField: 'id'
            }
        }, {
            header: 'Projects', dataIndex: 'projects',
            flex: 1, renderer: rndCategory,
            editor: {
                xtype: 'combobox', store: 'Projects', allowBlank: true,
                multiSelect: true, delimiter: ',',
                queryMode: 'local', displayField: 'name', valueField: 'id'
            }
/**/
        }, {
            xtype: 'actioncolumn', width: 64,
            items: [{
                icon: 'images/tick.png', tooltip: 'Toggle Completed',
                handler: function(grid, rowIndex, colIndex) {
                    taskEditor.fireEvent('taskComplete', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }, {
                icon: 'images/edit.png', tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    taskEditor.fireEvent('taskEdit', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }, {
                icon: 'images/delete.png', tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    taskEditor.fireEvent('taskDelete', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }]
/**/
        }];

        this.plugins = [this.rowEditor];
        this.features = [groupingFeature];
/*
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Add Task'

//                    id: 'removeButton',
//                    icon: 'images/delete.png',
//                    text: 'Delete',
//                    disabled: true,
//                    handler: function(cmp) {
//                        var sm = cmp.up('taskseditor').getSelectionModel();
//                        Ext.each(sm.selected.items, function(item) {
//                            taskEditor.fireEvent('taskDelete', {
//                                rowIndex: item.data.id
//                            });
//                        });
//                    }
                }
            ]
        }];
*/
        this.callParent(arguments);
    }
});
