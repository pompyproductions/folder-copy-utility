const getFolderStructure = require("./getFolderStructure");
const path = require("path");

it("hello", () => {
  expect(
    getFolderStructure(path.join(__dirname, "./dirtest"))
  ).toMatchObject({
    name: "root"
  })
})

it("hello2", () => {
  expect(
    getFolderStructure(path.join(__dirname, "./dirtest"))
    .children
    .find(child => child.name === "folderA")
    .isDir
  ).toBe(true)
})