import { environment as environmentBase } from "./environment.base";
export const environment = {
  ...environmentBase,
  remotes: {
    chat:'https://pokedexe-ui.s3.eu-west-3.amazonaws.com/chat/remoteEntry.js',
    events:'https://pokedexe-ui.s3.eu-west-3.amazonaws.com/events/remoteEntry.js'
  }
};
