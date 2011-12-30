var fs = require('fs'),
    _ = require('underscore'),
    cfg = require('../config'),
    TodoTxt = require('../jsTodoTxt')

var tmpBuffer = [];

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


function updateFile() {
    var offset = 0,
        position = null;

    fs.open(cfg.fs.file, "w+", function(err, fd) {
        if (err) throw err;

        _.each(tmpBuffer, function(item, idx) {
            var tmpItem = updateModel(item),
                buffer = new Buffer(tmpItem.toString() + "\n");

            fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                if (error) throw err;
                console.log(idx + ' - Written ' + written + ' bytes to the file: ' + tmpItem.toString());
            });
        });

        fs.close(fd, function() {
            console.log('File closed');
        });
    });
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
 * App static URL (GET '/').
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.index = function(req, res) {
    res.redirect('/index.html');
};

/**
 * Writes temporary buffer into file.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.sync = function(req, res) {
    updateFile();

    res.json({
        success: true,
        data: tmpBuffer
    });
};

/**
 * Returns the list of tasks.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.list = function(req, res) {
    fs.readFile(cfg.fs.file, "ascii", function(err, data) {
        if (err) throw err;
        tmpBuffer = parseFile(data);

        res.json({
            success: true,
            data: tmpBuffer
        });
    });
};

/**
 * Adds a new task to the list.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.add = function(req, res) {
    var item = updateModel(req.body);

    item.id = tmpBuffer.length + 1;
    tmpBuffer.push(item);
    if (cfg.fs.autoSave) updateFile();
    console.log('Task #%s added: %o', item.id, item);

    res.json({
        success: true,
        data: item
    });
};

/**
 * Modifies a given task.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.update = function(req, res) {
    var idx = req.params.id - 1,
        item;

    if (tmpBuffer[idx]) {
        item = updateModel(req.body);

        tmpBuffer[idx] = item;
        if (cfg.fs.autoSave) updateFile();
        console.log('Task #%s updated: %o', idx, item);
    }

    res.json({
        success: true,
        data: item
    });
};

/**
 * Removes a task from the list.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.del = function(req, res) {
    var idx = req.params.id - 1,
        item = tmpBuffer[idx];

    if (item) {
        delete tmpBuffer[idx];
        if (cfg.fs.autoSave) updateFile();
        console.log('Task #%s deleted: %o', idx, item);
    }

    res.json({
        success: true
    });
};

/**
 * Marks / unmarks task as completed..
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.complete = function(req, res) {
    var idx = req.params.id - 1,
        item,
        isCompleted;

    if (tmpBuffer[idx]) {
        item = updateModel(tmpBuffer[idx]);
        isCompleted = (item.complete);
        item.complete = isCompleted? false : true;
        item.completed = isCompleted? null : new Date();

        tmpBuffer[idx] = item;
        if (cfg.fs.autoSave) updateFile();
        console.log('Task #%s completed: %o', idx, item);
    }

    res.json({
        success: true,
        data: item
    });
};
