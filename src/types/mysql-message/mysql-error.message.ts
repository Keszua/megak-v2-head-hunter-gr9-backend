/* eslint-disable @typescript-eslint/naming-convention */
export enum MySqlErrorMessage {
  ER_DUP_ENTRY = 'Duplicate input syntax.',
  ER_ROW_IS_REFERENCED = 'Cannot add or update a child row: a foreign key constraint fails',
  ER_NO_REFERENCED_ROW = 'Cannot delete or update a parent row: a foreign key constraint fails.',
  ER_DATA_TOO_LONG = 'Data too long for a column.',
  ER_CHECK_CONSTRAINT_VIOLATED = 'Check constraint is violated.',
  ER_INVALID_DEFAULT = ' Invalid default value.',
  ER_SYNTAX_ERROR = 'You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use.',
  ER_WRONG_VALUE_COUNT = 'Column count doesn not match value count.',
  ER_UNSUPPORTED_EXTENSION = 'Table uses an extension that doesn not exist in this MySQL version.',
  ER_QUERY_INTERRUPTED = 'Query execution was interrupted.',
  ER_LOCK_WAIT_TIMEOUT = 'Lock wait timeout exceeded; try restarting transaction.',
}
