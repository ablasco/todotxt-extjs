var fs = require('fs'),
    _ = require('underscore'),
    cfg = require('../config'),
    TodoTxt = require('../jsTodoTxt')


/**
 * Parses file contents into an array of items.
 * @param {String} data
 */
function parseFile(data) {
    var fileData = data.split("\n"),
        tasks = [],
        idx = 0;

    for (var i = 0; i < fileData.length - 1; i++) {
        if (!fileData[i]) continue;

        var t = new TodoTxt.TodoTxtItem(fileData[i]);
        tasks.push({
            id: idx + 1,
            text: t.text,
            priority: t.priority || null,
            complete: t.complete || false,
            completed: t.completed? new Date(t.completed) : null,
            date: t.date? new Date(t.date) : null,
            contexts: t.contexts? String(t.contexts).split(',') : null,
            projects: t.projects? String(t.projects).split(',') : null
        });
        idx++;
    }

    return tasks;
}


function updateModel(data) {
    var item = new TodoTxt.TodoTxtItem('test');

    if (data.id) item.id = data.id;
    item.text = data.text;
    item.priority   = data.priority || null;
    item.complete   = data.complete || false;
    item.completed  = data.completed? new Date(data.completed) : null;
    item.date       = data.date? new Date(data.date) : null;
    item.contexts   = data.contexts? String(data.contexts).split(',') : null;
    item.projects   = data.projects? String(data.projects).split(',') : null;

    return item;
}



/**
 * GET home page.
 */
exports.index = function(req, res) {
    res.redirect('/index.html');
};


exports.list = function(req, res) {
    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;

        res.json({
            success: true,
            data: parseFile(data)
        });
    });
};


exports.add = function(req, res) {
    var item = updateModel(req.body),
        txtData = item.toString();

    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;
        var nTasks = data.split("\n").length;
        item.id = nTasks;

        fs.open(cfg.fs.file, 'a', 666, function(err, fd) {
            fs.write(fd, txtData + "\n", null, 'utf8', function(err) {
                if (err) throw err;
                //console.log("write to file");
                fs.close(fd, function() {
                    //console.log("file closed");
                    res.json({
                        success: true,
                        data: item
                    });
                });
            });
        });
    });
};


exports.update = function(req, res) {
    var p = req.body,
        updatedIdx = req.params.id - 1,
        tmpItem, updatedItem,
        offset = 0,
        position = null;

    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;

        fs.open(cfg.fs.file, "w+", function(err, fd) {
            if (err) throw err;

            _.each(parseFile(data), function(item, idx) {
                if (idx === updatedIdx) {
                    tmpItem = updateModel(p);
                    updatedItem = tmpItem
                } else {
                    tmpItem = updateModel(item);
                }

                var buffer = new Buffer(tmpItem.toString() + "\n");
                fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                    if (error) throw err;
                    //console.log(idx + ' - Written ' + written + ' bytes to the file: ' + tmpItem.toString());
                });
            });

            fs.close(fd, function() {
                //console.log("file closed");
                res.json({
                    success: true,
                    data: updatedItem
                });
            });
        });
    });
};


exports.del = function(req, res) {
    var p = req.body,
        deletedIdx = req.params.id - 1,
        tmpItem, deletedItem,
        offset = 0,
        position = null;

    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;

        fs.open(cfg.fs.file, "w+", function(err, fd) {
            if (err) throw err;

            _.each(parseFile(data), function(item, idx) {
                if (idx !== deletedIdx) {
                    tmpItem = updateModel(item);

                    var buffer = new Buffer(tmpItem.toString() + "\n");
                    fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                        if (error) throw err;
                        //console.log(idx + ' - Written ' + written + ' bytes to the file: ' + tmpItem.toString());
                    });
                }
            });

            fs.close(fd, function() {
                //console.log("file closed");
                res.json({
                    success: true
                });
            });
        });
    });
};


exports.complete = function(req, res) {
    var updatedIdx = req.params.id - 1,
        tmpItem, updatedItem,
        offset = 0,
        position = null;

    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;

        fs.open(cfg.fs.file, "w+", function(err, fd) {
            if (err) throw err;

            _.each(parseFile(data), function(item, idx) {
                tmpItem = updateModel(item);
                if (idx === updatedIdx) {
                    var isCompleted = (tmpItem.complete);
                    updatedItem = tmpItem;
                    updatedItem.complete =  isCompleted? false : true;
                    updatedItem.completed = isCompleted? null : new Date();
                }

                var buffer = new Buffer(tmpItem.toString() + "\n");
                fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                    if (error) throw err;
                    //console.log(idx + ' - Written ' + written + ' bytes to the file: ' + tmpItem.toString());
                });
            });

            fs.close(fd, function() {
                //console.log("file closed");
                res.json({
                    success: true,
                    data: updatedItem
                });
            });
        });
    });
};
