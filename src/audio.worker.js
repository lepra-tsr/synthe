'use strict';

class Bypass extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    const channels = 2
    for (let i = 0; i < output.length; i++) {
      output[i].set(input[i]);
    }
    return true
  }
}

registerProcessor('bypass', Bypass)