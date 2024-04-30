"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jss-plugin-global";
exports.ids = ["vendor-chunks/jss-plugin-global"];
exports.modules = {

/***/ "(ssr)/./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"(ssr)/./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jss */ \"(ssr)/./node_modules/jss/dist/jss.esm.js\");\n\n\nvar at = \"@global\";\nvar atPrefix = \"@global \";\nvar GlobalContainerRule = /*#__PURE__*/ function() {\n    function GlobalContainerRule(key, styles, options) {\n        this.type = \"global\";\n        this.at = at;\n        this.isProcessed = false;\n        this.key = key;\n        this.options = options;\n        this.rules = new jss__WEBPACK_IMPORTED_MODULE_1__.RuleList((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, options, {\n            parent: this\n        }));\n        for(var selector in styles){\n            this.rules.add(selector, styles[selector]);\n        }\n        this.rules.process();\n    }\n    /**\n   * Get a rule.\n   */ var _proto = GlobalContainerRule.prototype;\n    _proto.getRule = function getRule(name) {\n        return this.rules.get(name);\n    } /**\n   * Create and register rule, run plugins.\n   */ ;\n    _proto.addRule = function addRule(name, style, options) {\n        var rule = this.rules.add(name, style, options);\n        if (rule) this.options.jss.plugins.onProcessRule(rule);\n        return rule;\n    } /**\n   * Replace rule, run plugins.\n   */ ;\n    _proto.replaceRule = function replaceRule(name, style, options) {\n        var newRule = this.rules.replace(name, style, options);\n        if (newRule) this.options.jss.plugins.onProcessRule(newRule);\n        return newRule;\n    } /**\n   * Get index of a rule.\n   */ ;\n    _proto.indexOf = function indexOf(rule) {\n        return this.rules.indexOf(rule);\n    } /**\n   * Generates a CSS string.\n   */ ;\n    _proto.toString = function toString(options) {\n        return this.rules.toString(options);\n    };\n    return GlobalContainerRule;\n}();\nvar GlobalPrefixedRule = /*#__PURE__*/ function() {\n    function GlobalPrefixedRule(key, style, options) {\n        this.type = \"global\";\n        this.at = at;\n        this.isProcessed = false;\n        this.key = key;\n        this.options = options;\n        var selector = key.substr(atPrefix.length);\n        this.rule = options.jss.createRule(selector, style, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, options, {\n            parent: this\n        }));\n    }\n    var _proto2 = GlobalPrefixedRule.prototype;\n    _proto2.toString = function toString(options) {\n        return this.rule ? this.rule.toString(options) : \"\";\n    };\n    return GlobalPrefixedRule;\n}();\nvar separatorRegExp = /\\s*,\\s*/g;\nfunction addScope(selector, scope) {\n    var parts = selector.split(separatorRegExp);\n    var scoped = \"\";\n    for(var i = 0; i < parts.length; i++){\n        scoped += scope + \" \" + parts[i].trim();\n        if (parts[i + 1]) scoped += \", \";\n    }\n    return scoped;\n}\nfunction handleNestedGlobalContainerRule(rule, sheet) {\n    var options = rule.options, style = rule.style;\n    var rules = style ? style[at] : null;\n    if (!rules) return;\n    for(var name in rules){\n        sheet.addRule(name, rules[name], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, options, {\n            selector: addScope(name, rule.selector)\n        }));\n    }\n    delete style[at];\n}\nfunction handlePrefixedGlobalRule(rule, sheet) {\n    var options = rule.options, style = rule.style;\n    for(var prop in style){\n        if (prop[0] !== \"@\" || prop.substr(0, at.length) !== at) continue;\n        var selector = addScope(prop.substr(at.length), rule.selector);\n        sheet.addRule(selector, style[prop], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, options, {\n            selector: selector\n        }));\n        delete style[prop];\n    }\n}\n/**\n * Convert nested rules to separate, remove them from original styles.\n */ function jssGlobal() {\n    function onCreateRule(name, styles, options) {\n        if (!name) return null;\n        if (name === at) {\n            return new GlobalContainerRule(name, styles, options);\n        }\n        if (name[0] === \"@\" && name.substr(0, atPrefix.length) === atPrefix) {\n            return new GlobalPrefixedRule(name, styles, options);\n        }\n        var parent = options.parent;\n        if (parent) {\n            if (parent.type === \"global\" || parent.options.parent && parent.options.parent.type === \"global\") {\n                options.scoped = false;\n            }\n        }\n        if (!options.selector && options.scoped === false) {\n            options.selector = name;\n        }\n        return null;\n    }\n    function onProcessRule(rule, sheet) {\n        if (rule.type !== \"style\" || !sheet) return;\n        handleNestedGlobalContainerRule(rule, sheet);\n        handlePrefixedGlobalRule(rule, sheet);\n    }\n    return {\n        onCreateRule: onCreateRule,\n        onProcessRule: onProcessRule\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jssGlobal);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvanNzLXBsdWdpbi1nbG9iYWwvZGlzdC9qc3MtcGx1Z2luLWdsb2JhbC5lc20uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBEO0FBQzNCO0FBRS9CLElBQUlFLEtBQUs7QUFDVCxJQUFJQyxXQUFXO0FBRWYsSUFBSUMsc0JBQ0osV0FBVyxHQUNYO0lBQ0UsU0FBU0Esb0JBQW9CQyxHQUFHLEVBQUVDLE1BQU0sRUFBRUMsT0FBTztRQUMvQyxJQUFJLENBQUNDLElBQUksR0FBRztRQUNaLElBQUksQ0FBQ04sRUFBRSxHQUFHQTtRQUNWLElBQUksQ0FBQ08sV0FBVyxHQUFHO1FBQ25CLElBQUksQ0FBQ0osR0FBRyxHQUFHQTtRQUNYLElBQUksQ0FBQ0UsT0FBTyxHQUFHQTtRQUNmLElBQUksQ0FBQ0csS0FBSyxHQUFHLElBQUlULHlDQUFRQSxDQUFDRCw4RUFBUUEsQ0FBQyxDQUFDLEdBQUdPLFNBQVM7WUFDOUNJLFFBQVEsSUFBSTtRQUNkO1FBRUEsSUFBSyxJQUFJQyxZQUFZTixPQUFRO1lBQzNCLElBQUksQ0FBQ0ksS0FBSyxDQUFDRyxHQUFHLENBQUNELFVBQVVOLE1BQU0sQ0FBQ00sU0FBUztRQUMzQztRQUVBLElBQUksQ0FBQ0YsS0FBSyxDQUFDSSxPQUFPO0lBQ3BCO0lBQ0E7O0dBRUMsR0FHRCxJQUFJQyxTQUFTWCxvQkFBb0JZLFNBQVM7SUFFMUNELE9BQU9FLE9BQU8sR0FBRyxTQUFTQSxRQUFRQyxJQUFJO1FBQ3BDLE9BQU8sSUFBSSxDQUFDUixLQUFLLENBQUNTLEdBQUcsQ0FBQ0Q7SUFDeEIsRUFDQTs7R0FFQztJQUdESCxPQUFPSyxPQUFPLEdBQUcsU0FBU0EsUUFBUUYsSUFBSSxFQUFFRyxLQUFLLEVBQUVkLE9BQU87UUFDcEQsSUFBSWUsT0FBTyxJQUFJLENBQUNaLEtBQUssQ0FBQ0csR0FBRyxDQUFDSyxNQUFNRyxPQUFPZDtRQUN2QyxJQUFJZSxNQUFNLElBQUksQ0FBQ2YsT0FBTyxDQUFDZ0IsR0FBRyxD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QixLQUFLO1FBQ2hDLElBQUl2QixLQUFLZCxJQUFJLEtBQUssV0FBVyxDQUFDcUMsT0FBTztRQUNyQ0QsZ0NBQWdDdEIsTUFBTXVCO1FBQ3RDQyx5QkFBeUJ4QixNQUFNdUI7SUFDakM7SUFFQSxPQUFPO1FBQ0xJLGNBQWNBO1FBQ2R4QixlQUFlQTtJQUNqQjtBQUNGO0FBRUEsaUVBQWV1QixTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0b21hdGVkLWludGVydmlldy8uL25vZGVfbW9kdWxlcy9qc3MtcGx1Z2luLWdsb2JhbC9kaXN0L2pzcy1wbHVnaW4tZ2xvYmFsLmVzbS5qcz85Y2UzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCB7IFJ1bGVMaXN0IH0gZnJvbSAnanNzJztcblxudmFyIGF0ID0gJ0BnbG9iYWwnO1xudmFyIGF0UHJlZml4ID0gJ0BnbG9iYWwgJztcblxudmFyIEdsb2JhbENvbnRhaW5lclJ1bGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBHbG9iYWxDb250YWluZXJSdWxlKGtleSwgc3R5bGVzLCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlID0gJ2dsb2JhbCc7XG4gICAgdGhpcy5hdCA9IGF0O1xuICAgIHRoaXMuaXNQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucnVsZXMgPSBuZXcgUnVsZUxpc3QoX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICAgIHBhcmVudDogdGhpc1xuICAgIH0pKTtcblxuICAgIGZvciAodmFyIHNlbGVjdG9yIGluIHN0eWxlcykge1xuICAgICAgdGhpcy5ydWxlcy5hZGQoc2VsZWN0b3IsIHN0eWxlc1tzZWxlY3Rvcl0pO1xuICAgIH1cblxuICAgIHRoaXMucnVsZXMucHJvY2VzcygpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBydWxlLlxuICAgKi9cblxuXG4gIHZhciBfcHJvdG8gPSBHbG9iYWxDb250YWluZXJSdWxlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0UnVsZSA9IGZ1bmN0aW9uIGdldFJ1bGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnJ1bGVzLmdldChuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGFuZCByZWdpc3RlciBydWxlLCBydW4gcGx1Z2lucy5cbiAgICovXG4gIDtcblxuICBfcHJvdG8uYWRkUnVsZSA9IGZ1bmN0aW9uIGFkZFJ1bGUobmFtZSwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgcnVsZSA9IHRoaXMucnVsZXMuYWRkKG5hbWUsIHN0eWxlLCBvcHRpb25zKTtcbiAgICBpZiAocnVsZSkgdGhpcy5vcHRpb25zLmpzcy5wbHVnaW5zLm9uUHJvY2Vzc1J1bGUocnVsZSk7XG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cbiAgLyoqXG4gICAqIFJlcGxhY2UgcnVsZSwgcnVuIHBsdWdpbnMuXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLnJlcGxhY2VSdWxlID0gZnVuY3Rpb24gcmVwbGFjZVJ1bGUobmFtZSwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgbmV3UnVsZSA9IHRoaXMucnVsZXMucmVwbGFjZShuYW1lLCBzdHlsZSwgb3B0aW9ucyk7XG4gICAgaWYgKG5ld1J1bGUpIHRoaXMub3B0aW9ucy5qc3MucGx1Z2lucy5vblByb2Nlc3NSdWxlKG5ld1J1bGUpO1xuICAgIHJldHVybiBuZXdSdWxlO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgaW5kZXggb2YgYSBydWxlLlxuICAgKi9cbiAgO1xuXG4gIF9wcm90by5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZihydWxlKSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZXMuaW5kZXhPZihydWxlKTtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgQ1NTIHN0cmluZy5cbiAgICovXG4gIDtcblxuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZXMudG9TdHJpbmcob3B0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIEdsb2JhbENvbnRhaW5lclJ1bGU7XG59KCk7XG5cbnZhciBHbG9iYWxQcmVmaXhlZFJ1bGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBHbG9iYWxQcmVmaXhlZFJ1bGUoa2V5LCBzdHlsZSwgb3B0aW9ucykge1xuICAgIHRoaXMudHlwZSA9ICdnbG9iYWwnO1xuICAgIHRoaXMuYXQgPSBhdDtcbiAgICB0aGlzLmlzUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB2YXIgc2VsZWN0b3IgPSBrZXkuc3Vic3RyKGF0UHJlZml4Lmxlbmd0aCk7XG4gICAgdGhpcy5ydWxlID0gb3B0aW9ucy5qc3MuY3JlYXRlUnVsZShzZWxlY3Rvciwgc3R5bGUsIF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgICBwYXJlbnQ6IHRoaXNcbiAgICB9KSk7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IEdsb2JhbFByZWZpeGVkUnVsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlID8gdGhpcy5ydWxlLnRvU3RyaW5nKG9wdGlvbnMpIDogJyc7XG4gIH07XG5cbiAgcmV0dXJuIEdsb2JhbFByZWZpeGVkUnVsZTtcbn0oKTtcblxudmFyIHNlcGFyYXRvclJlZ0V4cCA9IC9cXHMqLFxccyovZztcblxuZnVuY3Rpb24gYWRkU2NvcGUoc2VsZWN0b3IsIHNjb3BlKSB7XG4gIHZhciBwYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KHNlcGFyYXRvclJlZ0V4cCk7XG4gIHZhciBzY29wZWQgPSAnJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgc2NvcGVkICs9IHNjb3BlICsgXCIgXCIgKyBwYXJ0c1tpXS50cmltKCk7XG4gICAgaWYgKHBhcnRzW2kgKyAxXSkgc2NvcGVkICs9ICcsICc7XG4gIH1cblxuICByZXR1cm4gc2NvcGVkO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVOZXN0ZWRHbG9iYWxDb250YWluZXJSdWxlKHJ1bGUsIHNoZWV0KSB7XG4gIHZhciBvcHRpb25zID0gcnVsZS5vcHRpb25zLFxuICAgICAgc3R5bGUgPSBydWxlLnN0eWxlO1xuICB2YXIgcnVsZXMgPSBzdHlsZSA/IHN0eWxlW2F0XSA6IG51bGw7XG4gIGlmICghcnVsZXMpIHJldHVybjtcblxuICBmb3IgKHZhciBuYW1lIGluIHJ1bGVzKSB7XG4gICAgc2hlZXQuYWRkUnVsZShuYW1lLCBydWxlc1tuYW1lXSwgX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICAgIHNlbGVjdG9yOiBhZGRTY29wZShuYW1lLCBydWxlLnNlbGVjdG9yKVxuICAgIH0pKTtcbiAgfVxuXG4gIGRlbGV0ZSBzdHlsZVthdF07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVByZWZpeGVkR2xvYmFsUnVsZShydWxlLCBzaGVldCkge1xuICB2YXIgb3B0aW9ucyA9IHJ1bGUub3B0aW9ucyxcbiAgICAgIHN0eWxlID0gcnVsZS5zdHlsZTtcblxuICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgaWYgKHByb3BbMF0gIT09ICdAJyB8fCBwcm9wLnN1YnN0cigwLCBhdC5sZW5ndGgpICE9PSBhdCkgY29udGludWU7XG4gICAgdmFyIHNlbGVjdG9yID0gYWRkU2NvcGUocHJvcC5zdWJzdHIoYXQubGVuZ3RoKSwgcnVsZS5zZWxlY3Rvcik7XG4gICAgc2hlZXQuYWRkUnVsZShzZWxlY3Rvciwgc3R5bGVbcHJvcF0sIF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgICBzZWxlY3Rvcjogc2VsZWN0b3JcbiAgICB9KSk7XG4gICAgZGVsZXRlIHN0eWxlW3Byb3BdO1xuICB9XG59XG4vKipcbiAqIENvbnZlcnQgbmVzdGVkIHJ1bGVzIHRvIHNlcGFyYXRlLCByZW1vdmUgdGhlbSBmcm9tIG9yaWdpbmFsIHN0eWxlcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGpzc0dsb2JhbCgpIHtcbiAgZnVuY3Rpb24gb25DcmVhdGVSdWxlKG5hbWUsIHN0eWxlcywgb3B0aW9ucykge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAobmFtZSA9PT0gYXQpIHtcbiAgICAgIHJldHVybiBuZXcgR2xvYmFsQ29udGFpbmVyUnVsZShuYW1lLCBzdHlsZXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChuYW1lWzBdID09PSAnQCcgJiYgbmFtZS5zdWJzdHIoMCwgYXRQcmVmaXgubGVuZ3RoKSA9PT0gYXRQcmVmaXgpIHtcbiAgICAgIHJldHVybiBuZXcgR2xvYmFsUHJlZml4ZWRSdWxlKG5hbWUsIHN0eWxlcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgaWYgKHBhcmVudC50eXBlID09PSAnZ2xvYmFsJyB8fCBwYXJlbnQub3B0aW9ucy5wYXJlbnQgJiYgcGFyZW50Lm9wdGlvbnMucGFyZW50LnR5cGUgPT09ICdnbG9iYWwnKSB7XG4gICAgICAgIG9wdGlvbnMuc2NvcGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnNlbGVjdG9yICYmIG9wdGlvbnMuc2NvcGVkID09PSBmYWxzZSkge1xuICAgICAgb3B0aW9ucy5zZWxlY3RvciA9IG5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBvblByb2Nlc3NSdWxlKHJ1bGUsIHNoZWV0KSB7XG4gICAgaWYgKHJ1bGUudHlwZSAhPT0gJ3N0eWxlJyB8fCAhc2hlZXQpIHJldHVybjtcbiAgICBoYW5kbGVOZXN0ZWRHbG9iYWxDb250YWluZXJSdWxlKHJ1bGUsIHNoZWV0KTtcbiAgICBoYW5kbGVQcmVmaXhlZEdsb2JhbFJ1bGUocnVsZSwgc2hlZXQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvbkNyZWF0ZVJ1bGU6IG9uQ3JlYXRlUnVsZSxcbiAgICBvblByb2Nlc3NSdWxlOiBvblByb2Nlc3NSdWxlXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGpzc0dsb2JhbDtcbiJdLCJuYW1lcyI6WyJfZXh0ZW5kcyIsIlJ1bGVMaXN0IiwiYXQiLCJhdFByZWZpeCIsIkdsb2JhbENvbnRhaW5lclJ1bGUiLCJrZXkiLCJzdHlsZXMiLCJvcHRpb25zIiwidHlwZSIsImlzUHJvY2Vzc2VkIiwicnVsZXMiLCJwYXJlbnQiLCJzZWxlY3RvciIsImFkZCIsInByb2Nlc3MiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJnZXRSdWxlIiwibmFtZSIsImdldCIsImFkZFJ1bGUiLCJzdHlsZSIsInJ1bGUiLCJqc3MiLCJwbHVnaW5zIiwib25Qcm9jZXNzUnVsZSIsInJlcGxhY2VSdWxlIiwibmV3UnVsZSIsInJlcGxhY2UiLCJpbmRleE9mIiwidG9TdHJpbmciLCJHbG9iYWxQcmVmaXhlZFJ1bGUiLCJzdWJzdHIiLCJsZW5ndGgiLCJjcmVhdGVSdWxlIiwiX3Byb3RvMiIsInNlcGFyYXRvclJlZ0V4cCIsImFkZFNjb3BlIiwic2NvcGUiLCJwYXJ0cyIsInNwbGl0Iiwic2NvcGVkIiwiaSIsInRyaW0iLCJoYW5kbGVOZXN0ZWRHbG9iYWxDb250YWluZXJSdWxlIiwic2hlZXQiLCJoYW5kbGVQcmVmaXhlZEdsb2JhbFJ1bGUiLCJwcm9wIiwianNzR2xvYmFsIiwib25DcmVhdGVSdWxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js\n");

/***/ })

};
;