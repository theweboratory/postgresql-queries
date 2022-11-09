const {
  columnsTestArray,
  tableNameArray,
  conditionsTestArray,
  throwErrorsArray,
} = require("../tools/errors/testQueries/singleTableTests");
const buildQuery = require("../tools/testHelpers/buildQuery");
const singleTable = require("./singleTable");

describe("Single Table Function Test Suite", () => {
  describe("Return Tests", () => {
    it("Returns a string", () => {
      const input = "table_name";
      const output = singleTable(input);

      expect(typeof output).toEqual("string");
    });

    describe("Returns correct query when:", () => {
      tableNameArray.forEach((type) => {
        it(type.test, () => {
          expect(typeof type.value).toEqual(type.type);
          expect(singleTable(type.value)).toEqual(type.query);
        });

        columnsTestArray.forEach((column, columnIndex) => {
          describe(type.test, () => {
            if (columnIndex === 0) {
              it(column.test, () => {
                expect(typeof type.value).toEqual(type.type);
                expect(typeof column.value).toEqual(column.type);
                expect(singleTable(type.value)).toEqual(column.query);
              });
            } else {
              it(column.test, () => {
                expect(typeof type.value).toEqual(type.type);
                expect(typeof column.value).toEqual(column.type);
                expect(singleTable(type.value, column.value)).toEqual(
                  column.query
                );
              });
            }
          });
        });

        conditionsTestArray.forEach((condition, condIndex) => {
          columnsTestArray.forEach((column, colIndex) => {
            const expectQuery = buildQuery([column.query, condition.query]);
            describe(type.test, () => {
              describe(column.test, () => {
                it(condition.test, () => {
                  expect(typeof type.value).toEqual(type.type);
                  expect(typeof column.value).toEqual(column.type);
                  if (condIndex === 0) {
                    if (colIndex === 0) {
                      const output = singleTable(type.value);
                      expect(output).toEqual(expectQuery);
                    } else {
                      const output = singleTable(type.value, column.value);
                      expect(output).toEqual(expectQuery);
                    }
                  } else {
                    if (colIndex === 0) {
                      const output = singleTable(
                        type.value,
                        [],
                        condition.value
                      );

                      expect(typeof condition).toEqual(condition.type);
                      expect(output).toEqual(expectQuery);
                    } else {
                      const output = singleTable(
                        type.value,
                        column.value,
                        condition.value
                      );
                      expect(typeof condition).toEqual(condition.type);
                      expect(output).toEqual(expectQuery);
                    }
                  }
                });
              });
            });
          });
        });
      });
    });
  });

  describe("Throws Errors", () => {});
});
