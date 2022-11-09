const singleTableErrors = require("../singleTableErrors");
const singleTableTestQueries = require("./singleTable");

const tableNameString = "table_name";
const tableNameObjValue = { name: tableNameString };

const tableNameStringObj = {
  test: "Table Name is a String",
  value: tableNameString,
  type: "string",
  query: singleTableTestQueries.query1,
};

const tableNameObj = {
  test: "Table Name is an Object",
  value: tableNameObjValue,
  type: "object",
  query: singleTableTestQueries.query1,
};

const tableNameArray = [tableNameStringObj, tableNameObj];

const columnsNull = undefined;
const columnsString = "id";
const columnsEmptyArray = [];
const columns1 = [columnsString];
const columns2 = [...columns1, "name"];
const columns3 = [...columns2, "age"];
const columns4 = [...columns3, "email"];

const columnsNullObj = {
  test: "Column Parameter is Undefined",
  value: columnsNull,
  type: "undefined",
  length: null,
  query: singleTableTestQueries.query1,
};

const columnsStringObj = {
  test: "Column Parameter is a String",
  value: columnsString,
  type: "string",
  length: null,
  query: singleTableTestQueries.query2,
};
const columnsEmptyArrayObj = {
  test: "Column Parameter is an Empty Arr",
  value: columnsEmptyArray,
  type: "object",
  length: 0,
  query: singleTableTestQueries.query1,
};
const columns1Obj = {
  test: "Column Parameter is an array and has 1 element",
  value: columns1,
  type: "object",
  length: 1,
  query: singleTableTestQueries.query2,
};
const columns2Obj = {
  test: "Column Parameter is an array and has 2 elements",
  value: columns2,
  type: "object",
  length: 2,
  query: singleTableTestQueries.query3,
};
const columns3Obj = {
  test: "Column Parameter is an array and has 3 elements",
  value: columns3,
  type: "object",
  length: 3,
  query: singleTableTestQueries.query4,
};

const columns4Obj = {
  test: "Column Parameter is an array and has 4 elements",
  value: columns4,
  type: "object",
  length: 4,
  query: singleTableTestQueries.query5,
};

const columnsTestArray = [
  columnsNullObj,
  columnsStringObj,
  columnsEmptyArrayObj,
  columns1Obj,
  columns2Obj,
  columns3Obj,
  columns4Obj,
];

const conditionsEmptyArray = [];
const conditions1 = [
  {
    target: "id",
    action: "=",
    value: "userId",
  },
];

const conditions2 = [
  ...conditions1,
  {
    target: "name",
    action: "=",
    value: "username",
  },
];

const conditions3 = [
  ...conditions1,
  {
    prefix: "OR",
    target: "name",
    action: "=",
    value: "username",
  },
];

const conditionsNullObj = {
  test: "Conditions has no parameters",
  value: undefined,
  type: "undefined",
  query: "",
};

const conditionsEmptyArrayObj = {
  test: "Conditions has an empty Array",
  value: conditionsEmptyArray,
  type: "object",
  query: "",
};

const conditions1Obj = {
  test: "Conditions has one parameter",
  value: conditions1,
  type: "object",
  query: "WHERE id = userId",
};

const conditions2Obj = {
  test: "Conditions has 2 parameters with no prefix",
  value: conditions2,
  type: "object",
  query: "WHERE id = userId AND name = username",
};

const conditions3Obj = {
  test: "Conditions has 2 parameters with an OR prefix",
  value: conditions3,
  type: "object",
  query: "WHERE id = userId OR name = username",
};

const conditionsTestArray = [
  conditionsNullObj,
  conditionsEmptyArrayObj,
  conditions1Obj,
  conditions2Obj,
  conditions3Obj,
];

const tableNameErrorObj = {
  name: "tableName Parameter",
  tests: [
    {
      test: "no tableName Parameter",
      error: singleTableErrors.noTableNameError,
    },
    {
      test: "typeof tableName is a number",
      error: singleTableErrors.tableNameTypeError,
      value: 1,
      type: "number",
    },
    {
      test: "typeof tableName is an array",
      error: singleTableErrors.tableNameTypeError,
      value: ["table_name"],
      type: "object",
    },
    {
      test: "if the wrong key name is included in tableName Object",
      error: singleTableErrors.tableNameWrongObjKey,
      value: { wrongKey: "table_name" },
      type: "object",
    },
  ],
};

const columnsErrorObj = {
  name: "columns Parameter",
  tests: [
    {
      test: "typeof columns is a number",
      error: singleTableErrors.columnsTypeError,
      value: 1,
      type: "number",
    },
    {
      test: "typeof columns is an object",
      error: singleTableErrors.columnsTypeError,
      value: {},
      type: "object",
    },
  ],
};

const throwErrorsArray = [tableNameErrorObj, columnsErrorObj];

module.exports = {
  tableNameArray,
  columnsTestArray,
  conditionsTestArray,
  throwErrorsArray,
};
