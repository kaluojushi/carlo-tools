import buttonCounter from "./button-counter.js";
import bmiCal from "./bmi-cal.js";
import randomGenerator from "./random-generator.js";
import timestamp from "./timestamp.js";
import fractionCal from "./fraction-cal.js";
import dateCal from "./date-cal.js";
import radixConverter from "./radix-converter.js";
import colorConverter from "./color-converter.js";
import numberConverter from "./number-converter.js";
import onlineList from "./online-list.js";
import encodeTool from "./encode-tool.js";
import binaryCal from "./binary-cal.js";
import downloader from "./downloader.js";
import downloadMathtypeActivator from "./download-mathtype-activator.js";

window.$docsify.vueComponents = {
  'online-list': onlineList,
  'button-counter': buttonCounter,
  'bmi-cal': bmiCal,
  'random-generator': randomGenerator,
  timestamp,
  'fraction-cal': fractionCal,
  'date-cal': dateCal,
  'radix-converter': radixConverter,
  'color-converter': colorConverter,
  'number-converter': numberConverter,
  'encode-tool': encodeTool,
  'binary-cal': binaryCal,
  downloader,
  'download-mathtype-activator': downloadMathtypeActivator,
}
