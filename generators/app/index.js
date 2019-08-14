'use strict';

const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = Generator.extend({
  initializing: function () {
    this.props = {};
  },
  prompting: function () {
    this.log(yosay(
      'Welcome to ' + chalk.red('Kotlin Android Starter') + ' generator!'
    ));

    const prompts = [
      {
        name: 'name',
        message: 'What are you calling your app?',
        store: true,
        default: this.appname // Default to current folder name
      },
      {
        name: 'package',
        message: 'What package will you be publishing the app under?'
      },
      {
        name: 'targetSdk',
        message: 'What Android SDK will you be targeting?',
        store: true,
        default: 26 // Android 8.0 (O(7.1+))
      },
      {
        name: 'minSdk',
        message: 'What is the minimum Android SDK you wish to support?',
        store: true,
        default: 19 // Android 4.0 (Ice Cream Sandwich)
      }];

    return this.prompt(prompts).then(props => {
      this.props.appPackage = props.package;
      this.appName = props.name;
      this.appPackage = props.package;
      this.androidTargetSdkVersion = props.targetSdk;
      this.androidMinSdkVersion = props.minSdk;
    });
  },

  writing: function () {
    var packageDir = this.props.appPackage.replace(/\./g, '/');
    var appFolder = 'template-kotlin';

    mkdirp('app');
    mkdirp('app/src/main/assets');
    mkdirp('app/src/main/java/' + packageDir);
    mkdirp('app/src/androidTest/java/' + packageDir);
    mkdirp('app/src/commonTest/java/' + packageDir);
    mkdirp('app/src/debug');
    mkdirp('app/src/debug/java/' + packageDir);
    mkdirp('app/src/release');
    mkdirp('app/src/release/java/' + packageDir);
    mkdirp('app/src/test/resources');
    mkdirp('app/src/test/java/' + packageDir);

    var appPath = this.sourceRoot() + '/' + appFolder + '/';

    this.fs.copy(appPath + 'gitignore', '.gitignore');
    this.fs.copy(appPath + 'gradle.properties', 'gradle.properties');
    this.fs.copy(appPath + 'gradlew', 'gradlew');
    this.fs.copy(appPath + 'gradlew.bat', 'gradlew.bat');
    this.fs.copy(appPath + 'settings.gradle', 'settings.gradle');
    this.fs.copy(appPath + 'app/gitignore', 'app/.gitignore');
    this.fs.copy(appPath + 'app/lint.xml', 'app/lint.xml');
    this.fs.copy(appPath + 'app/dependencies.gradle', 'app/dependencies.gradle');

    this.fs.copy(appPath + 'gradle', 'gradle');
    this.fs.copy(appPath + 'app/src/main/res', 'app/src/main/res');
    this.fs.copy(appPath + 'app/src/test/resources', 'app/src/test/resources');

    this.fs.copyTpl(appPath + 'app/proguard-rules.pro', 'app/proguard-rules.pro', this.props);
    this.fs.copyTpl(appPath + 'README.md', 'README.md', this.props);
    this.fs.copyTpl(appPath + 'build.gradle', 'build.gradle', this.props);
    this.fs.copyTpl(appPath + 'app/build.gradle', 'app/build.gradle', this.props);
    this.fs.copyTpl(appPath + 'app/src/androidTest/java/io/mvpstarter/sample', 'app/src/androidTest/java/' + packageDir, this.props);
    this.fs.copyTpl(appPath + 'app/src/commonTest/java/io/mvpstarter/sample', 'app/src/commonTest/java/' + packageDir, this.props);
    this.fs.copyTpl(appPath + 'app/src/debug/AndroidManifest.xml', 'app/src/debug/AndroidManifest.xml', this.props);
    this.fs.copyTpl(appPath + 'app/src/debug/res', 'app/src/debug/res', this.props);
    this.fs.copyTpl(appPath + 'app/src/debug/java/io/mvpstarter/', 'app/src/debug/java/' + packageDir, this.props);
    this.fs.copyTpl(appPath + 'app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(appPath + 'app/src/main/java/io/mvpstarter/sample', 'app/src/main/java/' + packageDir, this.props);
    this.fs.copyTpl(appPath + 'app/src/main/res/layout', 'app/src/main/res/layout', this.props);
    this.fs.copyTpl(appPath + 'app/src/release/res', 'app/src/release/res', this.props);
    this.fs.copyTpl(appPath + 'app/src/release/java/io/mvpstarter/', 'app/src/release/java/' + packageDir, this.props);
    this.fs.copyTpl(appPath + 'app/src/test/java/io/mvpstarter/sample', 'app/src/test/java/' + packageDir, this.props);
  }
});
