const INITIAL_STATE = {
  todosList: [
    {
      id: 1,
      text: "todo 1",
      isCompleted: true,
    },
    {
      id: 2,
      text: "todo 2",
      isCompleted: false,
    },
  ],
  todoEditingId: "",
  isCheckedAll: false,
  status: "All",
};

const todosReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default todosReducers;
