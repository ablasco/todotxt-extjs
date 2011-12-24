var fs = require('fs'),
    _ = require('underscore'),
    file = '/home/ablasco/Dropbox/todo/todo2.txt',
    TodoTxt = require('../jsTodoTxt')

//require('date-utils')

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
            completed: t.completed || null,
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
    item.priority = data.priority || null;
    item.complete = data.complete || false;
    item.completed = data.completed || null;
    item.date = data.date? new Date(data.date) : null;
    item.contexts = data.contexts? String(data.contexts).split(',') : null;
    item.projects = data.projects? String(data.projects).split(',') : null;

    return item;
}



/**
 * GET home page.
 */
exports.index = function(req, res) {
    res.redirect('/index.html');
};


exports.list = function(req, res) {
    fs.readFile(file, "ascii", function(err, data) {
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

    fs.open(file, 'a', 666, function(err, id) {
        fs.write(id, txtData + "\n", null, 'utf8', function(err) {
            if (err) throw err;
            //console.log("write to file");
            fs.close(id, function() {
                //console.log("file closed");
                res.json({
                    success: true,
                    data: item
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

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        fs.open(file, "w+", function(err, fd) {
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

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        fs.open(file, "w+", function(err, fd) {
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
    res.json({
        success: true,
        data: {}
    });
};
