// Richard Wen
// rrwen.dev@gmail.com

var exec = require('child_process').exec;
var fs = require('fs');
var moment = require('moment');
var test = require('tape');

// (package_info) Get package metadata
var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var testedPackages = [];
for (var k in json.dependencies) {
  testedPackages.push(k + ' (' + json.dependencies[k] + ')');
}
var devPackages = [];
for (var k in json.devDependencies) {
  devPackages.push(k + ' (' + json.devDependencies[k] + ')');
}

// (test_file) Pipe tests to file and output
if (!fs.existsSync('./tests/log')){
    fs.mkdirSync('./tests/log');
}
var testFile = './tests/log/test_' + json.version.split('.').join('_') + '.txt';
test.createStream().pipe(fs.createWriteStream(testFile));
test.createStream().pipe(process.stdout);

// (test_run) Run tests
test('Tests for ' + json.name + ' (' + json.version + ')', function (t) {
	t.comment('Node.js (' + process.version + ')');
	t.comment('Description: ' + json.description);
	t.comment('Date: ' + moment().format('YYYY-MM-DD hh:mm:ss'));
	t.comment('Dependencies: ' + testedPackages.join(', '));
	t.comment('Developer: ' + devPackages.join(', '));
	
	// (test_1) No file name
	exec('node index.js', (err, stdout, stderr)  => {
		if (!err) {
			var actual = fs.readFileSync('pg-testdb-template.js', 'utf8');
			var expected = fs.readFileSync('template.js', 'utf8');
			t.deepEquals(actual, expected, '(MAIN) No file name');
			fs.unlinkSync('pg-testdb-template.js');
		} else {
			t.fail('(MAIN) No file name' + err.message);
		}
	});
	
	// (test_2) File name
	exec('node index.js pg_tests.js', (err, stdout, stderr)  => {
		if (!err) {
			var actual = fs.readFileSync('pg_tests.js', 'utf8');
			var expected = fs.readFileSync('template.js', 'utf8');
			t.deepEquals(actual, expected, '(MAIN) File name');
			fs.unlinkSync('pg_tests.js');
		} else {
			t.fail('(MAIN) File name' + err.message);
		}
	});
	
	// (test_3) Help variant 1
	exec('node index.js pg_tests.js -h', (err, stdout, stderr)  => {
		if (!err) {
			t.pass('(MAIN) Help variant 1');
		} else {
			t.fail('(MAIN) Help variant 1' + err.message);
		}
	});
	
	// (test_3) Help variant 2
	exec('node index.js pg_tests.js --help', (err, stdout, stderr)  => {
		if (!err) {
			t.pass('(MAIN) Help variant 2');
		} else {
			t.fail('(MAIN) Help variant 2' + err.message);
		}
	});
	
	// (test_4) Help variant 3
	exec('node index.js pg_tests.js help', (err, stdout, stderr)  => {
		if (!err) {
			t.pass('(MAIN) Help variant 3');
		} else {
			t.fail('(MAIN) Help variant 3' + err.message);
		}
	});
	t.end();
});
