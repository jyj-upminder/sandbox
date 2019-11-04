import * as workerpool from "workerpool"
// import workerpool = require('workerpool');
import { createRandomDataFile } from './random-data';

workerpool.worker({
  createRandomDataFile
});