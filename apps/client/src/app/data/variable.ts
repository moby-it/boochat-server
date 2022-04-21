import { environment } from '../../environments/environment';

export const urlPrefix = environment.production ? 'https://' : 'http://';
