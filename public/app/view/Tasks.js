/**
 * The Grid of Movies
 */
Ext.define('TodoTxt.view.Tasks', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.taskseditor',
    selType: 'rowmodel',
    rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2
    }),
    store: 'Tasks',

    initComponent: function () {
        var taskEditor = this;
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Group: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
        });

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
                charPrefix = (colIdx === 5)? '@' : '+',
                output = '<span class="' + isCompleted + '" style="color: #aaa">';

            if (!value) return '';
            Ext.each(allItems, function(item) {
                output += charPrefix + item + ' ';
            });

            return output + '</span>';
        };

        this.addEvents(['taskEdit', 'taskDelete']);
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
                xtype: 'textfield', allowBlank: true
            }
        }, {
            header: 'Projects', dataIndex: 'projects',
            flex: 1, renderer: rndCategory,
            editor: {
                xtype: 'textfield', allowBlank: true
            }
        }, {
            xtype: 'actioncolumn', width: 50,
            items: [{
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
        }];

        this.plugins = [this.rowEditor];
        this.features = [groupingFeature],

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Add Task'
                }
            ]
        }];

        this.callParent(arguments);
    }
});
