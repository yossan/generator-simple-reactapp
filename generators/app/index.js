const semver    = require('semver')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
  }
  
  initializing () {
  }

  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'app name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'version',
        default: '0.1.0',
        validate: (input) => {
          if (semver.valid(input)) {
            return true
          } else {
            return 'Error occors: your inputed version is invalid'
          }
        }
      },
      {
        type: 'input',
        name: 'author',
        message: 'author',
        store: true
      }
    ]).then((answers) => {
      this.answers = answers
    })
  }

  configuring () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appname: this.answers.name,
        version: this.answers.version,
        author:  this.answers.author
      })

    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'))

    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc'))

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js'))

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      {
        appname: this.answers.name
      })
  }

  installingWebpack () {
    this.npmInstall(['webpack', 'webpack-cli', 'webpack-dev-server'], {'save-dev': true})
  }

  installingBabel () {
    this.npmInstall(['babel-loader', 'babel-core', 'babel-preset-env', 'babel-preset-react'], {'save-dev' : true})
  }

  installingReact () {
    this.npmInstall(['react', 'react-dom'])
  }

  installingHtmlWebpackPlugin () {
    this.npmInstall(['html-webpack-plugin'], {'save-dev' : true})
  }

  writing () {
    // generatorの特定のファイルを書き込む
  }

  conflict () {
  }

  install () {
    // yeomanで用意されているインストール用のヘルパーメソッドを使った場合、自動的に `install` キューで実行される
    // ここではサードパッケージによるモジュールのインストールを行う。
  }

  end () {
    // cleanup もしくは、別れを告げる
    // installしたコマンドはここで使える
  }

}

