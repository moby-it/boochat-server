import { Alert } from '@boochat/domain';
import { AlertDocument } from '@boochat/persistence/read-db';

export function fromDocumentToEntity(document: AlertDocument): Alert {
  return new Alert({ type: document.type, payload: document.toObject() });
}

export function fromDocumentsToEntities(documents: AlertDocument[]): Alert[] {
  return documents.map((document) => fromDocumentToEntity(document));
}
