import { MysqlErrorCodes } from '../../../types';
import { errorMessage } from '../error-message';

export const mySqlErrorMessage = {
  ER_DUP_ENTRY: 'Duplicate input syntax.',
  ER_ROW_IS_REFERENCED: 'Cannot add or update a child row: a foreign key constraint fails',
  ER_NO_REFERENCED_ROW: 'Cannot delete or update a parent row: a foreign key constraint fails.',
  ER_DATA_TOO_LONG: 'Data too long for a column.',
  ER_CHECK_CONSTRAINT_VIOLATED: 'Check constraint is violated.',
  ER_INVALID_DEFAULT: ' Invalid default value.',
  ER_SYNTAX_ERROR:
    'You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use.',
  ER_WRONG_VALUE_COUNT: 'Column count does not match value count.',
  ER_UNSUPPORTED_EXTENSION: 'Table uses an extension that does not exist in this MySQL version.',
  ER_QUERY_INTERRUPTED: 'Query execution was interrupted.',
  ER_LOCK_WAIT_TIMEOUT: 'Lock wait timeout exceeded; try restarting transaction.',
};

export const getMysqlErrorMessage = (code: string): string => {
  const errorMessagesMap: Record<string, string> = {
    [MysqlErrorCodes.ER_DUP_ENTRY]: mySqlErrorMessage.ER_DUP_ENTRY,
    [MysqlErrorCodes.ER_CHECK_CONSTRAINT_VIOLATED]: mySqlErrorMessage.ER_CHECK_CONSTRAINT_VIOLATED,
    [MysqlErrorCodes.ER_DATA_TOO_LONG]: mySqlErrorMessage.ER_DATA_TOO_LONG,
    [MysqlErrorCodes.ER_INVALID_DEFAULT]: mySqlErrorMessage.ER_INVALID_DEFAULT,
    [MysqlErrorCodes.ER_LOCK_WAIT_TIMEOUT]: mySqlErrorMessage.ER_LOCK_WAIT_TIMEOUT,
    [MysqlErrorCodes.ER_NO_REFERENCED_ROW]: mySqlErrorMessage.ER_NO_REFERENCED_ROW,
    [MysqlErrorCodes.ER_QUERY_INTERRUPTED]: mySqlErrorMessage.ER_QUERY_INTERRUPTED,
    [MysqlErrorCodes.ER_ROW_IS_REFERENCED]: mySqlErrorMessage.ER_ROW_IS_REFERENCED,
    [MysqlErrorCodes.ER_SYNTAX_ERROR]: mySqlErrorMessage.ER_SYNTAX_ERROR,
    [MysqlErrorCodes.ER_UNSUPPORTED_EXTENSION]: mySqlErrorMessage.ER_UNSUPPORTED_EXTENSION,
    [MysqlErrorCodes.ER_WRONG_VALUE_COUNT]: mySqlErrorMessage.ER_WRONG_VALUE_COUNT,
  };

  return errorMessagesMap[code] || errorMessage.INTERNAL_SERVER_ERROR;
};
