import React, { memo } from "react";
import Todo from "./Todo";
import { connect } from "react-redux";

const TodoList = memo((props) => {
  const { todosList, isCheckedAll, checkAllTodos } = props;
  return (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        checked={isCheckedAll}
      ></input>
      <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
      <ul className="todo-list">
        {todosList.map((todo, index) => (
          <Todo key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />
        ))}
      </ul>
    </section>
  );
});

const mapStateToProps = (state) => {
  return {
    todosList: this.state.todos.todosList,
  };
};
export default connect(mapStateToProps)(TodoList);
