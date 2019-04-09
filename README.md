
# trigger-qconf

[![NPM version](https://badgen.net/npm/v/trigger-qconf)](https://npmjs.com/package/trigger-qconf) [![NPM downloads](https://badgen.net/npm/dm/trigger-qconf)](https://npmjs.com/package/trigger-qconf)

test get address by qconf

## Install

```bash

# npm
npm i -g trigger-qconf

# yarn
yarn global add trigger-qconf
```

## qconf-map file

```js
module.exports = {
  // mysql key
  // host: slave, master
  // conf: username, password
  mysql: {
    xx: 'mysql_path_string',
  },

  // conf key
  // conf only
  conf: {
    xx: 'conf_path_string',
  },

  // other
  // host only
  other_1: {
    xx: 'host_path_string',
  },
  other_2: {
    xx: 'host_path_string',
  },
}
```

## Usage

```bash
trigger-qconf file-path
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**trigger-qconf** © [ELEVEN](https://github.com/ryli), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by ELEVEN with help from contributors ([list](https://github.com/ryli/trigger-qconf/contributors)).

> [github.com/ryli](https://github.com/ryli) · GitHub [@ELEVEN](https://github.com/ryli) · Twitter [@ryliweb](https://twitter.com/ryliweb)
