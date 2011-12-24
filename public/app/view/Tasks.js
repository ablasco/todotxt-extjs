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
        this.addEvents(['taskEdit', 'taskDelete']);

        this.columns = [
            {
                header: 'Priority',
                dataIndex: 'priority',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1
            },
            {
                header: 'Text',
                dataIndex: 'text',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                },
                flex: 1
            },
            {
                header: 'Contexts',
                dataIndex: 'contexts',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1
            },
            {
                header: 'Projects',
                dataIndex: 'projects',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1
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
