const { createTestScheduler } = require("jest");
const singleTableErrors = require("../tools/errors/singleTableErrors");
const singleTableTestQueries = require("../tools/errors/testQueries/singleTable");
const {
  returnsCorrectQuery,
  returnsCorrectQueryColumns,
} = require("../tools/errors/testQueries/singleTableTests");
const singleTable = require("./singleTable");

const tableName = "table_name";
const tableNameObj = { name: tableName };
const conditions1 = [
  {
    target: "id",
    action: "=",
    value: "userId",
  },
];

const conditions2 = [
  {
    target: "id",
    action: "=",
    value: "userId",
  },
  {
    target: "name",
    action: "=",
    value: "username",
  },
];

const conditions3 = [
  {
    target: "id",
    action: "=",
    value: "userId",
  },
  {
    prefix: "OR",
    target: "name",
    action: "=",
    value: "username",
  },
];

describe("SingleTable Function", () => {
  describe("Returns correct type", () => {
    it("returns a string", () => {
      const string = singleTable("users", [], []);

      expect(typeof string).toEqual("string");
    });
  });

  describe("Returns correct query", () => {
    describe("returns a basic select all from table query when tableName is the only parameter and the type of tableName is:", () => {
      returnsCorrectQuery.forEach((test) => {
        it(test.name, () => {
          const string = test.string;

          expect(typeof test.param).toEqual(test.paramType);
          expect(typeof string).toEqual("string");
          expect(string).toEqual(singleTableTestQueries.query1);
        });
      });
    });

    describe("returns a select statement with specific columns and the type of tableName is:", () => {
      returnsCorrectQueryColumns.forEach((query) => {
        describe(query.name, () => {
          query.tests.forEach((test) => {
            if (test.tests.length === 1) {
              it(test.name, () => {
                const string = test.tests[0].string;

                test.tests[0].params.forEach((param, index) => {
                  console.log(param.name);
                  expect(typeof param.name).toEqual(param.type);

                  if (index === 1) {
                    expect(param.name.constructor === Array).toEqual(true);
                  }
                });

                expect(typeof string).toEqual("string");
                expect(string).toEqual(test.tests[0].expect);
              });
            } else {
              describe(test.name, () => {
                test.tests.forEach((subTest) => {
                  it(subTest.name, () => {
                    const string = test.tests[0].string;

                    subTest.params.forEach((param, index) => {
                      expect(typeof param.name).toEqual(param.type);

                      if (index === 1 && param.type === "object") {
                        expect(param.name.constructor === Array).toEqual(true);

                        expect(param.name.length).toEqual(param.length);
                      }
                    });

                    expect(typeof subTest.string).toEqual("string");
                    expect(string).toEqual(subTest.expect);
                  });
                });
              });
            }
          });
        });
      });
    });

    describe("returns a select statement with specific columns and conditions from single table:", () => {
      describe("no columns", () => {
        const columns = [];
        it("has empty conditions Array", () => {
          const conditions = [];
          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(0);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(0);
          expect(string).toEqual(singleTableTestQueries.query1);
        });

        it("has one condition object in Array", () => {
          const conditions = conditions1;
          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(0);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(1);
          expect(string).toEqual(singleTableTestQueries.query6);
        });

        it("has two conditions in Array without a prefix", () => {
          const conditions = conditions2;

          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(0);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(2);
          expect(string).toEqual(singleTableTestQueries.query7);
        });

        it("has two conditions in Array with an OR prefix", () => {
          const conditions = conditions3;

          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(0);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(2);
          expect(string).toEqual(singleTableTestQueries.query8);
        });
      });

      describe("1 column:", () => {
        const columns = ["id"];
        it("has empty conditions Array", () => {
          const conditions = [];
          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(1);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(0);
          expect(string).toEqual(singleTableTestQueries.query2);
        });

        it("has one condition object in Array", () => {
          const conditions = conditions1;
          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(1);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(1);
          expect(string).toEqual(singleTableTestQueries.query9);
        });

        it("has two conditions in Array without a prefix", () => {
          const conditions = conditions2;

          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(1);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(2);
          expect(string).toEqual(singleTableTestQueries.query10);
        });

        it("has two conditions in Array with an OR prefix", () => {
          const conditions = conditions3;

          const string = singleTable(tableName, columns, conditions);

          expect(typeof tableName).toEqual("string");
          expect(typeof columns).toEqual("object");
          expect(columns.constructor === Array).toEqual(true);
          expect(columns.length).toEqual(1);
          expect(typeof conditions).toEqual("object");
          expect(conditions.constructor === Array).toEqual(true);
          expect(conditions.length).toEqual(2);
          expect(string).toEqual(singleTableTestQueries.query11);
        });
      });
    });
  });

  describe("Throws Errors", () => {
    describe("tableName Parameter", () => {
      it("no tableName Parameter", () => {
        expect(singleTable).toThrow(singleTableErrors.noTableNameError);
      });

      it("typeof tableName is a Number", () => {
        const tableName = 1;

        expect(typeof tableName).toEqual("number");
        expect(() => singleTable(tableName)).toThrow(
          singleTableErrors.tableNameTypeError
        );
      });

      it("typeof tableName is an Array", () => {
        const tableName = ["table_name"];

        expect(typeof tableName).toEqual("object");
        expect(tableName.constructor === Array).toEqual(true);
        expect(() => singleTable(tableName)).toThrow(
          singleTableErrors.tableNameTypeError
        );
      });

      it("if the wrong key name is included in tableName Object", () => {
        const tableName = { wrongKey: "table_name" };

        expect(typeof tableName).toEqual("object");
        expect(tableName.name).toEqual(undefined);
        expect(() => singleTable(tableName)).toThrow(
          singleTableErrors.tableNameWrongObjKey
        );
      });
    });

    describe("columns Parameter", () => {
      it("typeof columns is Number", () => {
        const columns = 1;

        expect(typeof tableName).toEqual("string");
        expect(typeof columns).toEqual("number");
        expect(() => singleTable(tableName, columns)).toThrow(
          singleTableErrors.columnsTypeError
        );
      });

      it("typeof columns is Object", () => {
        const columns = {};

        expect(typeof tableName).toEqual("string");
        expect(typeof columns).toEqual("object");
        expect(() => singleTable(tableName, columns)).toThrow(
          singleTableErrors.columnsTypeError
        );
      });
    });
  });
});
