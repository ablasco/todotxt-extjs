
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.redirect('/index.html');
};

exports.list = function(req, res) {
    res.json({
        success: true,
        data: [
            {
                priority: 'A',
                content: 'Task title #1',
                context: 'Context #1',
                project: 'Project #1'
            },
            {
                priority: 'B',
                content: 'Task title #2',
                context: 'Context #2',
                project: 'Project #1'
            },
            {
                priority: 'C',
                content: 'Task title #3',
                context: 'Context #1',
                project: 'Project #1'
            },
            {
                priority: 'D',
                content: 'Task title #4',
                context: 'Context #2',
                project: 'Project #1'
            }
        ]
    });
};

exports.add = function(req, res) {
    res.json({
        success: true,
        data: {}
    });
};

exports.update = function(req, res) {
    res.json({
        success: true,
        data: {}
    });
};

exports.del = function(req, res) {
    res.json({
        success: true,
        data: {}
    });
};

exports.complete = function(req, res) {
    res.json({
        success: true,
        data: {}
    });
};
