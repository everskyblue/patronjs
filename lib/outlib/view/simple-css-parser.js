"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * debido a tantas simples librerias que hay, he decidido incluir 
 * esta simple mini libreria de css en vez de crear una entera para parsear
 * y verificar errores. tal vez lo haga en un futuro.
 * 
 * @url https://github.com/Tombert/CsParse/blob/master/csparse.js
 * 
 * @license BSD 3-Clause
 * Copyright (c)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the {organization} nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
var cs = {};

cs.parse = function (cssString) {
  var separateEachSelector = cssString.replace(/\n/g, '').split('}');
  separateEachSelector.pop(); //Last element will be //'' or \n

  var cssObj = {};

  for (var i = 0; i < separateEachSelector.length; i += 1) {
    var sepSelectorAndData = separateEachSelector[i].split('{');
    var selector = sepSelectorAndData[0].trim();
    var fields = sepSelectorAndData[1].trim();
    var individualFields = fields.split(';');
    /**
     * linea de codigo añadida por mi
     * resulve el error o la obligacion de terminar con ";" al ultimo de cada regla
     * y previene el valores vacios
     */

    if (!individualFields[individualFields.length - 1].trim()) {
      individualFields.pop();
    } //


    cssObj[selector] = {};

    for (var j = 0; j < individualFields.length; j += 1) {
      var sepPropAndValue = individualFields[j].split(':'); // el uso de trim() para remover los espacios

      cssObj[selector.trim()][sepPropAndValue[0].trim()] = sepPropAndValue[1].trim();
    }
  }

  return cssObj;
};

cs.stringify = function (cssObject) {
  var cssString = '';

  for (var selector in cssObject) {
    var mainObject = cssObject[selector];
    cssString += selector + ' {\n';

    for (var field in mainObject) {
      field + ':' + mainObject[field] + '\n;';
    }

    cssString += '}\n';
  }

  return cssString;
};

var _default = cs;
exports["default"] = _default;