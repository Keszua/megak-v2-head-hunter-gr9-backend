export enum TokenErrorCodes {
  /**
   * Occurs when the token is not found in the request (e.g., missing from cookies)
   */
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  /**
   * Occurs when the payload of the token is invalid or cannot be parsed
   */
  TOKEN_PAYLOAD_INVALID = 'TOKEN_PAYLOAD_INVALID',
  /**
   * Occurs when the user ID is missing from the token payload
   */
  TOKEN_PAYLOAD_USERID_MISSING = 'TOKEN_PAYLOAD_USERID_MISSING',
  /**
   * Occurs when the token type is missing from the token payload
   */
  TOKEN_PAYLOAD_TOKEN_TYPE_MISSING = 'TOKEN_PAYLOAD_TOKEN_TYPE_MISSING',
  /**
   * Occurs when the token type in the payload is invalid or does not match the expected value
   */
  TOKEN_PAYLOAD_TOKEN_TYPE_INVALID = 'TOKEN_PAYLOAD_TOKEN_TYPE_INVALID',
  /**
   * Occurs when the token has expired
   */
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  /**
   * Occurs when an active refresh token is not found for the user
   * during an access token refresh attempt.
   */
  ACTIVE_REFRESH_TOKEN_NOT_FOUND = 'ACTIVE_REFRESH_TOKEN_NOT_FOUND',
}
