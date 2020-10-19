export class HubResult {
  code: number;
  data: any;
}

export function isSuccesStatusCode(result: HubResult): boolean {
  return result.code >= 200 && result.code < 300;
}