import logo from "./logo.svg";
import React, { PureComponent } from "react";
// pure để so sánh state đơn giản 1 lớp
// Components
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

//Css
import "./App.css";
import "./css/Todo.css";

const isNotCheckedAll = (todos = []) => todos.find((todo) => !todo.isCompleted);

const filterByStatus = (todos = [], status = "", id = "") => {
  switch (status) {
    case "ACTIVE":
      return todos.filter((todo) => !todo.isCompleted);
    case "COMPLETED":
      return todos.filter((todo) => todo.isCompleted);
    case "REMOVE":
      return todos.filter((todo) => todo.id !== id);
    default:
      return todos;
  }
};
class App extends PureComponent {
  state = {
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

  // mới vào chạy luôn
  componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todosList),
    });
  }

  addTodo = (todo = {}) => {
    this.setState((preState) => ({
      todosList: [...preState.todosList, todo],
    }));
  };

  getTodoEditingId = (id = "") => this.setState({ todoEditingId: id });

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todosList: list } = this.state;
      list.splice(index, 1, todo);
      // thêm lại vào vị trị i
      this.setState({
        todosList: list,
        todoEditingId: "",
        //hết phiên sửa khi enter
      });
    }
  };
  // dấu hoàn thành
  markCompleted = (id = "") => {
    const { todosList } = this.state;
    const updateList = todosList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState((preState) => ({
      todosList: updateList,
      // so sánh nếu có rồi thì đổi giá trị ngược lại còn không để bình thường
      isCheckedAll: !isNotCheckedAll(updateList),
    }));
  };
  // check toàn bộ hoàn thành
  checkAllTodos = () => {
    const { todosList, isCheckedAll } = this.state;
    this.setState((preState) => ({
      todosList: todosList.map((todo) => ({
        ...todo,
        isCompleted: !isCheckedAll,
      })),
      isCheckedAll: !preState.isCheckedAll,
    }));
  };

  setStateFilter = (status = "") => {
    this.setState({
      status,
    });
  };

  clearCompleted = () => {
    const { todosList } = this.state;
    this.setState({
      todosList: filterByStatus(todosList, "ACTIVE"),
    });
  };

  removeTodo = (id = " ") => {
    const { todosList } = this.state;
    this.setState({
      todosList: filterByStatus(todosList, "REMOVE", id),
    });
  };
  // removeTodo = (id = "") => {
  //   this.setState((prevState) => ({
  //     listTodos: filterByStatus(prevState.listTodos, "REMOVE", id),
  //   }));
  // };

  render() {
    const { todosList, todoEditingId, isCheckedAll, status } = this.state;
    return (
      <div className="todoapp">
        <Header addTodo={this.addTodo} isCheckedAll={isCheckedAll} />
        <TodoList
          getTodoEditingId={this.getTodoEditingId}
          todosList={filterByStatus(todosList, status)}
          todoEditingId={todoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        />
        <Footer
          setStatusFilter={this.setStateFilter}
          status={status}
          clearCompleted={this.clearCompleted}
          numOfTodos={todosList.length}
          numOfTodosLeft={filterByStatus(todosList, "ACTIVE").length}
        />
      </div>
    );
  }
}

export default App;
