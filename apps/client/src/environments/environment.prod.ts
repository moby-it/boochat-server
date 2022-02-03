import { environment as environmentBase } from "./environment.base";
export const environment = {
  ...environmentBase,
  remotes: {
    chat:'https://pkdxstore.blob.core.windows.net/chat/remoteEntry.js',
    events:'https://pkdxstore.blob.core.windows.net/events/remoteEntry.js'
  }
};
