import buttonCounter from "./button-counter.js";
import bmiCal from "./bmi-cal.js";
import randomGenerator from "./random-generator.js";
import timestamp from "./timestamp.js";

window.$docsify.vueComponents = {
  'button-counter': buttonCounter,
  'bmi-cal': bmiCal,
  'random-generator': randomGenerator,
  timestamp,
}
