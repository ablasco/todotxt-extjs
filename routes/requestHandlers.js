var fs = require("fs"),
    file = "/home/ablasco/Dropbox/todo/todo2.txt";

function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

function show(response, postData, action) {
    console.log("Request handler 'show' was called");

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        var tasklist = data.split("\n"),
            context = data.match(/(\+[a-z.-]+)/gi),
            project = data.match(/(\@[a-z.-]+)/gi),
            index;
            context = eliminateDuplicates(context);
            project = eliminateDuplicates(project);

        var body = '<html>'+
            '<head>'+
            '<title>todotxt-node</title>'+
            '<meta http-equiv="Content-Type" content="text/html; '+
            'charset=UTF-8" />'+
            '</head>'+
            '<body>'+
            '<h1>todo.txt</h1>'+
            '<form action="/add" method="post">'+
            '<label for="content">Add task</label>'+
            '<input type="text" name="content">'+

            '<label for="context">Add context</label>'+
            '<select name="context">'+
            '<option value="" selected="selected">Add context</option>';
        for (var i=0; i < context.length; i++) {
        body += '<option value="' + context[i] + '">'+
                context[i]+
                '</option>';
        }
        body += '</select>'+

            '<label for="project">Add project</label>'+
            '<select name="project">'+
            '<option value="" selected="selected">Add project</option>';
        for (var i=0; i < project.length; i++) {
        body += '<option value="' + project[i] + '">'+
                project[i]+
                '</option>';
        }

        body += '</select>'+
            '<label for="priority">Add priority</label>'+
            '<select name="priority">'+
            '<option value="" selected="selected">Add priority</option>'+
            '<option value="A">A</option>'+
            '<option value="B">B</option>'+
            '<option value="C">C</option>'+
            '<option value="D">D</option>'+
            '</select>'+
            
            '<input type="submit" value="Opret" />'+
            '</form>'+
            '<ol>';
        for (var i=0; i < tasklist.length-1; i++) {
            index = i + 1;
            body += '<li>'+ 
                    tasklist[i]+
                    '<a href="/edit/' + index + '">edit</a>'+
                    ' '+
                    '<a href="/del/' + index + '">delete</a>'+
                    ' '+
                    '<a href="/complete/' + index + '">complete</a>'+
                    '</li>';
        }

        body += '</ol>'+
            '</body>'+
            '</html>';

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end()
    });
}

function add(response, postData, action) {
    postDataContent = postData.content;
    postDataContext = postData.context;
    postDataProject = postData.project;
    postDataPriority = postData.priority;
    postData = "(" + postDataPriority + ") " + postDataContent + " " + postDataContext + " " + postDataProject + "\n";
    console.log("Request handler 'add' was called, and postData is: " + postData);
    fs.open(file, 'a', 666, function(err, id) {
        fs.write(id, postData, null, 'utf8', function(err) {
            if (err) throw err;
            console.log("write to file");
            fs.close(id, function() {
                console.log("file closed");
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            });
        });
    });
}

function edit(response, postData, action) {
    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        var tasklist = data.split("\n"),
            context = data.match(/(\+[a-z.-]+)/gi),
            project = data.match(/(\@[a-z.-]+)/gi),
            context = eliminateDuplicates(context);
            project = eliminateDuplicates(project);
            currentContext = tasklist[action - 1].match(/(\+[a-z.-]+)/gi), 
            currentProject = tasklist[action - 1].match(/(\@[a-z.-]+)/gi);
            currentPriority = tasklist[action - 1].match(/\(([^\)]*)\)/gi);
            currentPriority = currentPriority.toString().replace(/\(/g, '');
            currentPriority = currentPriority.toString().replace(/\)/g, '');
            var content = tasklist[action - 1].replace(currentContext, '').replace(currentProject, '').replace("(" + currentPriority + ")", '').replace(/^\s*|\s*$/g,'');

        var body = '<html>'+
            '<head>'+
            '<title>todotxt-node</title>'+
            '<meta http-equiv="Content-Type" content="text/html; '+
            'charset=UTF-8" />'+
            '</head>'+
            '<body>'+
            '<h1><a href="/">todo.txt</a></h1>'+
            '<form action="/update/' + action + '" method="post">'+

            // Add content
            '<label for="content">Rediger opgave</label>'+
            '<textarea name="content" rows="15" cols="20">'+
            content+
            '</textarea>'+

            // Add context
            '<label for="context">Add context</label>'+
            '<select name="context">';
        for (var i=0; i < context.length; i++) {
        body += '<option value="' + context[i] + '"';
            if(context[i] == currentContext ) {
                body += ' selected="selected">';
            } else {
                body += ">";
            }
        body += context[i]+
                '</option>';
        }
        body += '</select>'+

            // Add project
            '<label for="project">Add project</label>'+
            '<select name="project">';
        for (var i=0; i < project.length; i++) {
        body += '<option value="' + project[i] + '"';
            if(project[i] == currentProject ) {
                body += ' selected="selected">';
            } else {
                body += ">";
            }
        body += project[i]+
                '</option>';
        }
        body += '</select>'+

            // Add priority
            '<label for="priority">Add priority</label>'+
            '<select name="priority">';
        var priority = ["A","B","C","D"];
        for (var i=0; i < priority.length; i++) {
        body += '<option value="' + priority[i] + '"';
            if(priority[i] == currentPriority ) {
                body += ' selected="selected">';
            } else {
                body += ">";
            }
        body += priority[i]+
                '</option>';
        }
        body += '</select>'+

            '<input type="submit" value="Opdater" />'+
            '</form>'+
            '</body>'+
            '</html>';
    
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end()
    });
}

function update(response, postData, action) {
    postDataContent = postData.content;
    postDataContext = postData.context;
    postDataProject = postData.project;
    postDataPriority = postData.priority;
    postData = "(" + postDataPriority + ") " + postDataContent + " " + postDataContext + " " + postDataProject;
    console.log("Request handler 'update' was called with number: " + action + ", and postData is: " + postData);

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        var tasklist = [];
        tasklist = data.split("\n");
        var position = action - 1;
        var newtasklist = tasklist.splice(position, 1, postData);

        fs.open(file, "w+", function(err, fd) {
            if (err) throw err;
            
            var offset = 0,
                position = null;
            for (var i=0; i < tasklist.length-1; i++) {
                buffer = new Buffer(tasklist[i] + "\n"),
                console.log(tasklist[i]);
                fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                    if (error) throw err;
                    console.log('Written ' + written + ' bytes to the file');
                    response.writeHead(302, {
                        'Location': '/'
                    });
                    response.end();
                });
            }
        });
    });
}

function del(response, postData, action) {
    console.log("Request handler 'del' was called with number: " + action);

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        var tasklist = [];
        tasklist = data.split("\n");
        var position = action - 1;
        var newtasklist = tasklist.splice(position, 1);

        fs.open(file, "w+", function(err, fd) {
            if (err) throw err;
            
            var offset = 0,
                position = null;
            for (var i=0; i < tasklist.length-1; i++) {
                buffer = new Buffer(tasklist[i] + "\n"),
                console.log(tasklist[i]);
                fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                    if (error) throw err;
                    console.log('Written ' + written + ' bytes to the file');
                    response.writeHead(302, {
                        'Location': '/'
                    });
                    response.end();
                });
            }
        });
    });
}

function complete(response, postData, action) {
    console.log("Request handler 'complete' was called with number: " + action);

    fs.readFile(file, "ascii", function(err, data) {
        if (err) throw err;

        var tasklist = [];
        tasklist = data.split("\n");
        var position = action - 1;
        var oldtask = tasklist[position];
        var newtask = "x " + oldtask;
        var newtasklist = tasklist.splice(position, 1, newtask);

        fs.open(file, "w+", function(err, fd) {
            if (err) throw err;
            
            var offset = 0,
                position = null;
            for (var i=0; i < tasklist.length-1; i++) {
                buffer = new Buffer(tasklist[i] + "\n"),
                console.log(tasklist[i]);
                fs.write(fd, buffer, offset, buffer.length, position, function(error, written) {
                    if (error) throw err;
                    console.log('Written ' + written + ' bytes to the file');
                    response.writeHead(302, {
                        'Location': '/'
                    });
                    response.end();
                });
            }
        });
    });
}

exports.show = show;
exports.add = add;
exports.edit = edit;
exports.update = update;
exports.del = del;
exports.complete = complete;
