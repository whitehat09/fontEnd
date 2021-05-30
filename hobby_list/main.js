const { createStore } = window.Redux;

// SETUP REDUX STORE
// state 1
// reducer 2
// store 3

//  1
const initialState = JSON.parse(localStorage.getItem("hobby_list")) || [];

// 2
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }
    default:
      return state;
  }
};
//  3
const store = createStore(hobbyReducer); // tạo store

// -----------------

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId"); // đưa ra html vs id
  if (!ulElement) return;

  // reset previous content of ul
  ulElement.innerHTML = "";

  for (const hobby of hobbyList) {
    const liElement = document.createElement("li"); // tạp thẻ li
    liElement.textContent = hobby; // nội dung của li

    ulElement.appendChild(liElement); // cho vào thẻ li
  }
};

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState(); // get là lấy giá trị
//renderHobbyList(["..."]); // xuất ra html
renderHobbyList(initialHobbyList); // xuất ra html

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector("#hobbyFormId");
if (hobbyFormElement) {
  // lấy được form
  const handleFormSubmit = (e) => {
    // prevent browser from reloading
    e.preventDefault(); // chặn

    const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");
    if (!hobbyTextElement) return;

    //console.log("SUBMIT", hobbyTextElement.value);
    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    };
    store.dispatch(action);

    // reset form
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  // cập nhập sự thay đổi
  //console.log("STATE UPDATE: ", store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem("hobby_list", JSON.stringify(newHobbyList));
  // chuyển về chuỗi để lưu với key là hobby_list
});
