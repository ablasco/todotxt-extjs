/**
 * The TodoTxt application class.
 */
Ext.application({
    name: "TodoTxt",
    appFolder: "app",
    autoCreateViewport: true,

    controllers: [
        'Tasks'
    ],

    launch: function() {
        //console.log('App launched');
    }
});
