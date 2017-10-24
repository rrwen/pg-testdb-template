# pg-testdb-template

Richard Wen  
rrwen.dev@gmail.com  
  
Command line tool for creating a pg-testdb template file

## Install

1. Install [Node.js](https://nodejs.org/en/)
2. Install [pg-testdb](https://www.npmjs.com/package/pg-testdb) via `npm`
3. Install [pg-testdb-template](https://www.npmjs.com/package/pg-testdb-template) via `npm`

```
npm install pg-testdb --save-dev
npm install pg-testdb-template -g
```

For the latest developer version, see [Developer Install](#developer-install).

## Usage

Create a template file named `pg-testdb-template.js` for the [pg-testdb](https://www.npmjs.com/package/pg-testdb) package in the current directory:

```
pg-testdb-template
```

Create a template file named `pg_tests.js` in the current directory:

```
pg-testdb-template pg_tests.js
```

For help, use:

```
pg-testdb-template --help
```

## Developer Notes

### Developer Install

Install the latest developer version with `npm` from github:

```
npm install git+https://github.com/rrwen/pg-testdb-template
```
  
Install from `git` cloned source:

1. Ensure [git](https://git-scm.com/) is installed
2. Clone into current path
3. Install via `npm`

```
git clone https://github.com/rrwen/pg-testdb-template
cd pg-testdb-template
npm install
```

### Upload to Github

1. Ensure [git](https://git-scm.com/) is installed
2. Inside the `pg-testdb-template` folder, add all files and commit changes
3. Push to github

```
git add .
git commit -a -m "Generic update"
git push
```

### Upload to npm

1. Update the version in `package.json`
2. Run tests and check for OK status
3. Login to npm
4. Publish to npm

```
npm test
npm login
npm publish
```

### Implementation

The [npm](https://www.npmjs.com/) core package [fs](https://www.npmjs.com/package/fs) used to copy a template from the [pg-testdb-template](https://www.npmjs.com/package/pg-testdb-template) install directory to the user's current directory:

1. Create a read stream with `var read = fs.createReadStream('template.js');`
2. Create a write stream with `var write = fs.createWriteStream('copy.js');`
3. Pipe the read stream to the write stream `read.pipe(write);`
