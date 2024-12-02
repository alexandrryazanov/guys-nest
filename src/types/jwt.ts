export interface DecodedPayload {
  sub: string; // userId
  iat?: number;
  exp?: number;
  type: TokenType;
}

export enum TokenType {
  ACCESS,
  REFRESH,
}
