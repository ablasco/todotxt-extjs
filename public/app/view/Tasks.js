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

        var rndText = function(value, meta, rec) {
            var isCompleted = (rec.data.complete === 'true')? 'text-decoration: line-through;' : '';
            return '<span style="' + isCompleted + '">' + value + '</span>';
        };

        var rndDate = function(value, meta, rec) {
            if (!value) return '';
            var isCompleted = (rec.data.complete === 'true')? 'text-decoration: line-through;' : '';
            return '<span style="' + isCompleted + '">' + new Date(value).toLocaleDateString() + '</span>';
        };

        this.addEvents(['taskEdit', 'taskDelete']);
        this.columns = [
            {
                header: 'Done',
                dataIndex: 'complete',
                editor: {
                    xtype: 'checkbox',
                    allowBlank: true
                },
                flex: 0.5,
                renderer: function(value) {
                    if (value === 'true') {
                        return '<img src="images/tick.png">';
                    }
                    return '';
                }
            },
            {
                header: 'Completed at',
                dataIndex: 'completed',
                editor: {
                    xtype: 'datefield',
                    allowBlank: true
                },
                flex: 1,
                hidden: true,
                renderer: rndDate
            },
            {
                header: 'Date',
                dataIndex: 'date',
                editor: {
                    xtype: 'datefield',
                    allowBlank: true
                },
                flex: 1,
                hidden: true,
                renderer: rndDate
            },
            {
                header: 'Priority',
                dataIndex: 'priority',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 0.5,
                renderer: function(value, meta, rec) {
                    var color,
                        isCompleted = (rec.data.complete === 'true')? 'text-decoration: line-through;' : '';

                    if (!value) return '';
                    if (value === 'A') color = 'red';
                    else if (value === 'B') color = 'blue';
                    else if (value === 'C') color = 'green';
                    else if (value === 'D') color = 'violet';

                    return '<span style="color: ' + color + '; ' + isCompleted + '">( ' + value + ' )</span>';
                }
            },
            {
                header: 'Text',
                dataIndex: 'text',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                },
                flex: 1,
                renderer: rndText
            },
            {
                header: 'Contexts',
                dataIndex: 'contexts',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1,
                renderer: function(value, meta, rec) {
                    var allItems = String(value).split(',') || [],
                        isCompleted = (rec.data.complete === 'true')? 'text-decoration: line-through;' : '',
                        output = '<span style="color: #aaa; ' + isCompleted + '">';

                    if (!value) return '';
                    Ext.each(allItems, function(item) {
                        output += '@' + item + ' ';
                    });

                    return output + '</span>';
                }
            },
            {
                header: 'Projects',
                dataIndex: 'projects',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1,
                renderer: function(value, meta, rec) {
                    var allItems = String(value).split(',') || [],
                        isCompleted = (rec.data.complete === 'true')? 'text-decoration: line-through;' : '',
                        output = '<span style="color: #aaa; ' + isCompleted + '">';

                    if (!value) return '';
                    Ext.each(allItems, function(item) {
                        output += '+' + item + ' ';
                    });

                    return output + '</span>';
                }
            },
            {
                xtype: 'actioncolumn',
                width: 50,
                items: [
                    {
                        icon: 'images/edit.png',  // Use a URL in the icon config
                        tooltip: 'Edit',
                        handler: function(grid, rowIndex, colIndex) {
                            taskEditor.fireEvent('taskEdit', {
                                rowIndex: rowIndex,
                                colIndex: colIndex
                            });
                        }
                    },
                    {
                        icon: 'images/delete.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            taskEditor.fireEvent('taskDelete', {
                                rowIndex: rowIndex,
                                colIndex: colIndex
                            });
                        }
                    }
                ]
            }
        ];

        this.plugins = [ this.rowEditor ];
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
