declare module 'multistream' {
  import { Readable, ReadableOptions } from 'stream';

  export default class Multistream extends Readable {
    constructor(
      streams: Array<Readable | NodeJS.ReadableStream>,
      options?: ReadableOptions
    );
  }
}
