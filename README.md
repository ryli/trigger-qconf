
# trigger-qconf

[![NPM version](https://badgen.net/npm/v/trigger-qconf)](https://npmjs.com/package/trigger-qconf) [![NPM downloads](https://badgen.net/npm/dm/trigger-qconf)](https://npmjs.com/package/trigger-qconf)

get all the values in the config file.

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
    // 1：conf string
    some_mysql: 'mysql_path_string',
    // 2: object that has a `qconf` attribute
    some_mysql: {
      qconf: 'mysql_path_string',
    }
  },

  // conf key: conf or kafka
  conf: {
    some_conf: 'conf_path_string',
  },
  kafka: {
    some_conf: 'conf_path_string',
  },

  // host key
  host: {
    some_host: 'host_path_string',
  },
  redis: {
    some_host: 'host_path_string',
  },

}
```

## Usage

```bash
# flag: production
trigger-qconf file-path [flag]
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
