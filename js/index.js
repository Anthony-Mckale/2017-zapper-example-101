(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
  return React.createElement(
    "button",
    { className: "square", onClick: function onClick() {
        return props.onClick();
      } },
    props.value
  );
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        [0, 1, 2].map(function (item, i) {
          return React.createElement(
            "div",
            { key: i, className: "board-row" },
            [0, 1, 2].map(function (item, j) {
              return _this2.renderSquare(i * 3 + j);
            })
          );
        })
      );
    }
    /**
     * @param {number} i
     */

  }, {
    key: "renderSquare",
    value: function renderSquare(i) {
      var _this3 = this;

      return React.createElement(Square, { key: i, value: this.props.squares[i], onClick: function onClick() {
          return _this3.props.onClick(i);
        } });
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game() {
    _classCallCheck(this, Game);

    var _this4 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this4.state = {
      history: [{
        squares: Array(9).fill(null),
        selected: null
      }],
      xIsNext: true,
      stepNumber: 0
    };
    return _this4;
  }

  _createClass(Game, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      var history = this.state.history;
      var current = history[this.state.stepNumber];
      var winner = calculateWinner(current.squares);
      this.state.stepNumber++;

      var status = void 0;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      var that = this;

      var moves = history.map(function (step, move) {
        var x = step.selected % 3 + 1;
        var y = Math.floor(step.selected / 3) + 1;
        var desc = move ? 'Move #' + move + ' (' + x + ',' + y + ') selected' : 'Game start';
        var className = move == that.state.stepNumber - 1 ? 'active' : '';
        // console.log(desc, move, that.state.stepNumber, move == that.state.stepNumber - 1);
        return React.createElement(
          "li",
          { key: move, className: className },
          React.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this5.jumpTo(move);
              } },
            desc
          )
        );
      });

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "game" },
          React.createElement(
            "div",
            { className: "game-board" },
            React.createElement(Board, {
              squares: current.squares,
              onClick: function onClick(i) {
                return _this5.handleClick(i);
              }
            })
          ),
          React.createElement(
            "div",
            { className: "game-info" },
            React.createElement(
              "div",
              null,
              status
            ),
            React.createElement(
              "ol",
              null,
              moves
            )
          )
        )
      );
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 ? false : true
      });
    }

    /**
     * @param {number} i
     */

  }, {
    key: "handleClick",
    value: function handleClick(i) {
      var history = this.state.history;
      var current = history[history.length - 1];
      var squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          selected: i
        }]),
        xIsNext: !this.state.xIsNext
      });
    }
  }]);

  return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById('container'));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

},{}]},{},[1]);
