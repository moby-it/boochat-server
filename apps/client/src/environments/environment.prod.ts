import { environment as environmentBase } from "./environment.base";
export const environment = {
  ...environmentBase,
  remotes: {
    chat:'https://pkdxstorage.blob.core.windows.net/chat/remoteEntry.js',
    events:'https://pkdxstorage.blob.core.windows.net/events/remoteEntry.js'
  }
};
