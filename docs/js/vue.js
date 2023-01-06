import buttonCounter from "./button-counter.js";
import bmiCal from "./bmi-cal.js";
import randomGenerator from "./random-generator.js";
import timestamp from "./timestamp.js";
import fractionCal from "./fraction-cal.js";
import dateCal from "./date-cal.js";
import radixConverter from "./radix-converter.js";
import colorConverter from "./color-converter.js";

window.$docsify.vueComponents = {
  'button-counter': buttonCounter,
  'bmi-cal': bmiCal,
  'random-generator': randomGenerator,
  timestamp,
  'fraction-cal': fractionCal,
  'date-cal': dateCal,
  'radix-converter': radixConverter,
  'color-converter': colorConverter,
}
