'use strict';

class Bypass extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
  }

  /**
   * 
   * @param {Float32Array[][]} inputs 
   * @param {Float32Array[][]} outputs
   */
  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    for (let i = 0; i < output.length; i++) {
      for (let j = 0; j < output[i].length; j++) {
        if (j % 1 !== 0) {
          /* drop condition */
          input[i][j] = 0;
        }
      }
      output[i].set(input[i]);
    }
    return true
  }
}

registerProcessor('bypass', Bypass)