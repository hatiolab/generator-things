# generator-things [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
>

## Installation

First, install [Yeoman](http://yeoman.io) and generator-things using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-things
```

Then generate your new things-scene-component project:

```bash
yo things:scene-component
```

## 로컬로 인스톨하는 경우 (generator-things 개발시 권장)

먼저, https://github.com/hatiolab/generator-things 로부터 generator-things 프로젝트를 설치한다.

로컬에 설치된 generator-things 폴더에서 npm link 를 실행한다.

```
$ mkdir things-scene-xxx # 원하는 컴포넌트 이름의 폴더를 만든다. 폴더 이름은 꼭 'things-scene-' 으로 시작되어야 한다.
$ cd things-scene-xxx    # 폴더로 이동한다.
$ yo things:things-scene-component  # 컴포넌트를 만든다.
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

EULA © [Hatiolab](http://things-scene.hatiolab.com/EULA/)


[npm-image]: https://badge.fury.io/js/generator-things.svg
[npm-url]: https://npmjs.org/package/generator-things
[travis-image]: https://travis-ci.org/heartyoh/generator-things.svg?branch=master
[travis-url]: https://travis-ci.org/heartyoh/generator-things
[daviddm-image]: https://david-dm.org/heartyoh/generator-things.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/heartyoh/generator-things
[coveralls-image]: https://coveralls.io/repos/heartyoh/generator-things/badge.svg
[coveralls-url]: https://coveralls.io/r/heartyoh/generator-things
