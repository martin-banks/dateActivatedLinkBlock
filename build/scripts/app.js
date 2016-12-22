(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	"use strict";

	var prefixfree = require('./prefixfree.min.js');
	var content = require('./content');
	var linkTypes = {
		lead: 'cc-displayLink',
		reg: 'cc-regularLink'
	};

	var isMobileDevice = function isMobileDevice() {
		var mobile = /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream;
		return mobile ? true : false;
	};

	var isPastDate = function isPastDate(date) {
		console.log('checking dates');
		var d = new Date();
		var today = [d.getFullYear(), d.getMonth(), d.getDate()];
		console.log(today.join(''), date.join(''));
		if (today.join('') >= date.join('')) {
			return true;
		} else {
			return false;
		}
	};

	var templateTitleBlcok = function templateTitleBlcok() {
		return '\n\t\t\t<div id="cc-titleBlockContainer">\n\t\t\t\t<h2>' + content.introBlock.title + '</h2>\n\t\t\t\t<p>' + content.introBlock.intro + '</p>\n\t\t\t</div>\n\t\t';
	};

	var cardTextContainer = function cardTextContainer(props) {
		return '<div class="cc-contentContainer" style="background-image: url(../images/' + props.image + ')">\n\t\t\t<div class="cc-textContainer">\n\t\t\t\t<div class=\'cc-kicker\'>' + props.kicker + '</div>\n\t\t\t\t<h3>' + props.title + '</h3>\n\t\t\t\t<p>' + props.text + '</p>\n\t\t\t</div>\t\n\t\t</div>';
	};

	var templateLinkContainer = function templateLinkContainer(props, type) {
		if (isPastDate(props.liveDate)) {
			return '<a class="cc-linkContainer ' + type + ' ' + (!isMobileDevice() ? 'isDesktop' : 'isMobile') + ' cc-active" \n\t\t\t\t\thref="' + props.storyid + '" target="_self" rel="noopener noreferrer">\n\t\t\t\t\t' + cardTextContainer(props) + '\n\t\t\t\t</a>\n\t\t\t';
		} else {
			return '<div class="cc-linkContainer ' + type + ' ' + (!isMobileDevice() ? 'isDesktop' : 'isMobile') + ' cc-innactive">\n\t\t\t\t\t' + cardTextContainer(props) + '\n\t\t\t\t</div>\n\t\t\t';
		}
	};

	var createMainLink = function createMainLink(article) {
		if (!!article) {
			return templateLinkContainer(content.articles[article], linkTypes.lead);
		} else {
			return '';
		}
	};

	var createRegularLinks = function createRegularLinks(props) {
		var articleList = Object.keys(props);
		var regularLinks = articleList.map(function (article) {
			if ([config.hero, config.hide].indexOf(article) === -1) {
				var articleContent = content.articles[article];
				return templateLinkContainer(articleContent, linkTypes.reg);
			} else {
				return '';
			}
		}).join('');
		console.log(regularLinks);
		return '<div id="cc-regularLinksContainer">' + regularLinks + '</div>';
	};

	document.getElementById('cc-extralinks_app_container').innerHTML = [templateTitleBlcok(), createMainLink(config.hero), createRegularLinks(content.articles)].join('');
})();

},{"./content":2,"./prefixfree.min.js":3}],2:[function(require,module,exports){
'use strict';

module.exports = {
	introBlock: {
		title: 'Crosshead title for links',
		intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste eius necessitatibus pariatur, eum vel deleniti totam recusandae dicta ratione similique laudantium aliquid sed ipsa deserunt alias libero nihil eveniet, expedita!'
	},
	articles: {
		day1: {
			kicker: 'Day 1',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 20]
		},
		day2: {
			kicker: 'Day 2',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 21]
		},
		day3: {
			kicker: 'Day 3',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 22]
		},
		day4: {
			kicker: 'Day 4',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 23]
		},
		day5: {
			kicker: 'Day 5',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 24]
		},
		day6: {
			kicker: 'Day 6',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 25]
		},
		day7: {
			kicker: 'Day 7',
			title: 'Article title',
			text: 'Article intro text',
			image: '4x3.jpg',
			storyid: '123',
			liveDate: [2016, 11, 26]
		}
	}

};

},{}],3:[function(require,module,exports){
"use strict";

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
(function () {
  function k(a, b) {
    return [].slice.call((b || document).querySelectorAll(a));
  }if (window.addEventListener) {
    var e = window.StyleFix = { link: function link(a) {
        var c = a.href || a.getAttribute("data-href");try {
          if (!c || "stylesheet" !== a.rel || a.hasAttribute("data-noprefix")) return;
        } catch (b) {
          return;
        }var d = c.replace(/[^\/]+$/, ""),
            h = (/^[a-z]{3,10}:/.exec(d) || [""])[0],
            l = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(d) || [""])[0],
            g = /^([^?]*)\??/.exec(c)[1],
            m = a.parentNode,
            f = new XMLHttpRequest(),
            n;f.onreadystatechange = function () {
          4 === f.readyState && n();
        };n = function n() {
          var b = f.responseText;if (b && a.parentNode && (!f.status || 400 > f.status || 600 < f.status)) {
            b = e.fix(b, !0, a);if (d) var b = b.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function (b, a, c) {
              return (/^([a-z]{3,10}:|#)/i.test(c) ? b : /^\/\//.test(c) ? 'url("' + h + c + '")' : /^\//.test(c) ? 'url("' + l + c + '")' : /^\?/.test(c) ? 'url("' + g + c + '")' : 'url("' + d + c + '")'
              );
            }),
                c = d.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1"),
                b = b.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + c, "gi"), "$1");c = document.createElement("style");c.textContent = '/*# sourceURL=' + a.getAttribute('href') + ' */\n/*@ sourceURL=' + a.getAttribute('href') + ' */\n' + b;c.media = a.media;c.disabled = a.disabled;c.setAttribute("data-href", a.getAttribute("href"));m.insertBefore(c, a);m.removeChild(a);c.media = a.media;
          }
        };try {
          f.open("GET", c), f.send(null);
        } catch (p) {
          "undefined" != typeof XDomainRequest && (f = new XDomainRequest(), f.onerror = f.onprogress = function () {}, f.onload = n, f.open("GET", c), f.send(null));
        }a.setAttribute("data-inprogress", "");
      }, styleElement: function styleElement(a) {
        if (!a.hasAttribute("data-noprefix")) {
          var b = a.disabled;a.textContent = e.fix(a.textContent, !0, a);a.disabled = b;
        }
      }, styleAttribute: function styleAttribute(a) {
        var b = a.getAttribute("style"),
            b = e.fix(b, !1, a);a.setAttribute("style", b);
      }, process: function process() {
        k('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);k("style").forEach(StyleFix.styleElement);k("[style]").forEach(StyleFix.styleAttribute);
      }, register: function register(a, b) {
        (e.fixers = e.fixers || []).splice(void 0 === b ? e.fixers.length : b, 0, a);
      }, fix: function fix(a, b, c) {
        for (var d = 0; d < e.fixers.length; d++) {
          a = e.fixers[d](a, b, c) || a;
        }return a;
      }, camelCase: function camelCase(a) {
        return a.replace(/-([a-z])/g, function (b, a) {
          return a.toUpperCase();
        }).replace("-", "");
      }, deCamelCase: function deCamelCase(a) {
        return a.replace(/[A-Z]/g, function (b) {
          return "-" + b.toLowerCase();
        });
      } };(function () {
      setTimeout(function () {
        k('link[rel="stylesheet"]').forEach(StyleFix.link);
      }, 10);document.addEventListener("DOMContentLoaded", StyleFix.process, !1);
    })();
  }
})();
(function (k) {
  function e(b, c, d, h, l) {
    b = a[b];b.length && (b = RegExp(c + "(" + b.join("|") + ")" + d, "gi"), l = l.replace(b, h));return l;
  }if (window.StyleFix && window.getComputedStyle) {
    var a = window.PrefixFree = { prefixCSS: function prefixCSS(b, c, d) {
        var h = a.prefix;-1 < a.functions.indexOf("linear-gradient") && (b = b.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function (b, a, c, d) {
          return a + (c || "") + "linear-gradient(" + (90 - d) + "deg";
        }));b = e("functions", "(\\s|:|,)", "\\s*\\(", "$1" + h + "$2(", b);b = e("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + h + "$2$3", b);b = e("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + h + "$2:", b);if (a.properties.length) {
          var l = RegExp("\\b(" + a.properties.join("|") + ")(?!:)", "gi");b = e("valueProperties", "\\b", ":(.+?);", function (a) {
            return a.replace(l, h + "$1");
          }, b);
        }c && (b = e("selectors", "", "\\b", a.prefixSelector, b), b = e("atrules", "@", "\\b", "@" + h + "$1", b));b = b.replace(RegExp("-" + h, "g"), "-");return b = b.replace(/-\*-(?=[a-z]+)/gi, a.prefix);
      }, property: function property(b) {
        return (0 <= a.properties.indexOf(b) ? a.prefix : "") + b;
      }, value: function value(b, c) {
        b = e("functions", "(^|\\s|,)", "\\s*\\(", "$1" + a.prefix + "$2(", b);b = e("keywords", "(^|\\s)", "(\\s|$)", "$1" + a.prefix + "$2$3", b);0 <= a.valueProperties.indexOf(c) && (b = e("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + a.prefix + "$2$3", b));return b;
      }, prefixSelector: function prefixSelector(b) {
        return b.replace(/^:{1,2}/, function (b) {
          return b + a.prefix;
        });
      }, prefixProperty: function prefixProperty(b, c) {
        var d = a.prefix + b;return c ? StyleFix.camelCase(d) : d;
      } };(function () {
      var b = {},
          c = [],
          d = getComputedStyle(document.documentElement, null),
          h = document.createElement("div").style,
          l = function l(a) {
        if ("-" === a.charAt(0)) {
          c.push(a);a = a.split("-");var d = a[1];for (b[d] = ++b[d] || 1; 3 < a.length;) {
            a.pop(), d = a.join("-"), StyleFix.camelCase(d) in h && -1 === c.indexOf(d) && c.push(d);
          }
        }
      };if (0 < d.length) for (var g = 0; g < d.length; g++) {
        l(d[g]);
      } else for (var e in d) {
        l(StyleFix.deCamelCase(e));
      }var g = 0,
          f,
          k;for (k in b) {
        d = b[k], g < d && (f = k, g = d);
      }a.prefix = "-" + f + "-";a.Prefix = StyleFix.camelCase(a.prefix);a.properties = [];for (g = 0; g < c.length; g++) {
        e = c[g], 0 === e.indexOf(a.prefix) && (f = e.slice(a.prefix.length), StyleFix.camelCase(f) in h || a.properties.push(f));
      }!("Ms" != a.Prefix || "transform" in h || "MsTransform" in h) && "msTransform" in h && a.properties.push("transform", "transform-origin");a.properties.sort();
    })();(function () {
      function b(a, b) {
        h[b] = "";h[b] = a;return !!h[b];
      }var c = { "linear-gradient": { property: "backgroundImage", params: "red, teal" }, calc: { property: "width", params: "1px + 5%" }, element: { property: "backgroundImage", params: "#foo" }, "cross-fade": { property: "backgroundImage", params: "url(a.png), url(b.png), 50%" } };c["repeating-linear-gradient"] = c["repeating-radial-gradient"] = c["radial-gradient"] = c["linear-gradient"];var d = { initial: "color", "zoom-in": "cursor", "zoom-out": "cursor", box: "display", flexbox: "display", "inline-flexbox": "display", flex: "display", "inline-flex": "display", grid: "display", "inline-grid": "display", "max-content": "width", "min-content": "width", "fit-content": "width", "fill-available": "width" };a.functions = [];a.keywords = [];var h = document.createElement("div").style,
          e;for (e in c) {
        var g = c[e],
            k = g.property,
            g = e + "(" + g.params + ")";!b(g, k) && b(a.prefix + g, k) && a.functions.push(e);
      }for (var f in d) {
        k = d[f], !b(f, k) && b(a.prefix + f, k) && a.keywords.push(f);
      }
    })();(function () {
      function b(a) {
        e.textContent = a + "{}";return !!e.sheet.cssRules.length;
      }var c = { ":read-only": null, ":read-write": null, ":any-link": null, "::selection": null },
          d = { keyframes: "name", viewport: null, document: 'regexp(".")' };a.selectors = [];a.atrules = [];var e = k.appendChild(document.createElement("style")),
          l;for (l in c) {
        var g = l + (c[l] ? "(" + c[l] + ")" : "");!b(g) && b(a.prefixSelector(g)) && a.selectors.push(l);
      }for (var m in d) {
        g = m + " " + (d[m] || ""), !b("@" + g) && b("@" + a.prefix + g) && a.atrules.push(m);
      }k.removeChild(e);
    })();a.valueProperties = ["transition", "transition-property"];k.className += " " + a.prefix;StyleFix.register(a.prefixCSS);
  }
})(document.documentElement);

},{}]},{},[1]);
