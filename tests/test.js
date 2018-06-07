import Store from "../src/store";

// mocks for react component
const setStateMock = jest.fn();
const componentMock = {
  setState: setStateMock
};

it("Initialize store", () => {
  let fruitStore = new Store("fruits");
  expect(fruitStore.get()).toBeUndefined();
  expect(fruitStore.key).toBe("fruits");
  expect(fruitStore.connections()).toEqual([]);
});

it("Initialize store with callback", done => {
  let fruitStore = new Store("fruits", () => done());
});

it("Set and Get value something", () => {
  let fruitStore = new Store("fruits");
  let mockCallBack = jest.fn();
  fruitStore._callBackAll = mockCallBack;

  let fruits = ["apple", "mango", "guava", "litchi"];
  let old_data = fruitStore.get();

  return fruitStore.set(fruits).then(data => {
    expect(data).toEqual(fruitStore.get());
    expect(data).not.toEqual(old_data);
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});

it("Connect components", () => {
  let fruitStore = new Store("fruits");
  fruitStore.connect(componentMock);

  fruitStore.set(["apples", "mangoes"]).then(
    expect(setStateMock.mock.calls.length).toBe(1),
    expect(setStateMock.mock.calls).toEqual([
      [
        {
          [fruitStore.key]: ["apples", "mangoes"]
        }
      ]
    ])
  );
});

it("Expect connections to be present on connect", () => {
  let fruitStore = new Store("fruits");
  fruitStore.connect(componentMock);

  expect(fruitStore.connections()).toEqual([componentMock]);
});

it("Connect with callback", () => {
  let fruitStore = new Store("fruits");
  let mockCallBack = jest.fn();

  fruitStore.connect(
    componentMock,
    mockCallBack
  );

  expect(mockCallBack.mock.calls.length).toBe(1);
});

it("Disconnect components", () => {
  let fruitStore = new Store("fruits");
  fruitStore.connect(componentMock);

  fruitStore.disconnect(componentMock).then(() => {
    fruitStore.set(["apple", "mango", "guava", "litchi"]).then(() => {
      expect(setStateMock.mock.calls.length).toBe(0);
    });
  });
});

it("Expect no connections to be left on disconnect", () => {
  let fruitStore = new Store("fruits");
  fruitStore.connect(componentMock);

  fruitStore
    .disconnect(componentMock)
    .then(() => expect(fruitStore.connections()).toEqual([]));
});
