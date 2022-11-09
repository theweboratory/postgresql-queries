const singleTableErrors = require("../../tools/errors/singleTableErrors");

const singleTable = (tableName, columns = [], conditions = []) => {
  const queryStrArr = ["SELECT"];
  if (tableName) {
    if (typeof tableName === "string") {
    } else if (
      typeof tableName === "object" &&
      tableName.constructor !== Array
    ) {
      if (tableName.name) {
        tableName = tableName.name;
      } else {
        throw new Error(singleTableErrors.tableNameWrongObjKey);
      }
    } else {
      throw new Error(singleTableErrors.tableNameTypeError);
    }
  } else {
    throw new Error(singleTableErrors.noTableNameError);
  }

  if (typeof columns === "object") {
    if (columns.constructor === Array) {
      if (columns.length === 0) {
        queryStrArr.push("*");
      } else {
        columns.forEach((column, index) => {
          if (index === columns.length - 1) {
            if (typeof column === "object") {
              if (column.name && column.altName) {
                queryStrArr.push(`${column.name} AS ${column.altName}`);
              } else if (column.name) {
                queryStrArr.push(column.name);
              } else if (!column.name) {
                throw new Error(singleTableErrors.columnErrorNoObjName);
              }
            } else if (typeof column === "string") {
              queryStrArr.push(column);
            }
          } else {
            if (typeof column === "object") {
              if (column.name && column.altName) {
                queryStrArr.push(`${column.name} AS ${column.altName},`);
              } else if (column.name) {
                queryStrArr.push(`${column.name},`);
              } else if (!column.name) {
                throw new Error(singleTableErrors.columnErrorNoObjName);
              }
            } else if (typeof column === "string") {
              queryStrArr.push(`${column},`);
            }
          }
        });
      }
    } else {
      throw new Error(singleTableErrors.columnsTypeError);
    }
  } else if (typeof columns === "string") {
    queryStrArr.push(columns);
  } else {
    throw new Error(singleTableErrors.columnsTypeError);
  }

  queryStrArr.push("FROM");

  queryStrArr.push(tableName);

  if (typeof conditions === "object") {
    if (conditions.constructor === Array) {
      if (conditions.length !== 0) {
        queryStrArr.push("WHERE");

        conditions.forEach((condition, index) => {
          if (condition.target && condition.action && condition.value) {
            if (index > 0) {
              if (condition.prefix) {
                queryStrArr.push(
                  `${condition.prefix} ${condition.target} ${condition.action} ${condition.value}`
                );
              } else {
                queryStrArr.push(
                  `AND ${condition.target} ${condition.action} ${condition.value}`
                );
              }
            } else {
              queryStrArr.push(
                `${condition.target} ${condition.action} ${condition.value}`
              );
            }
          } else {
            throw new Error(singleTableErrors.missingConditionKeys);
          }
        });
      }
    } else {
      queryStrArr.push("WHERE");
      if (conditions.target && conditions.action && conditions.value) {
        queryStrArr.push(
          `${conditions.target} ${conditions.action} ${conditions.value}`
        );
      } else {
        throw new Error(singleTableErrors.missingConditionKeys);
      }
    }
  }

  const queryStr = queryStrArr.join(" ");
  return queryStr;
};

module.exports = singleTable;
