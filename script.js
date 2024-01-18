const textInput = document.getElementById("text");
const numberInput = document.getElementById("number");
const addButton = document.getElementById("add");

const url = "https://crudcrud.com/api/c1ec692d4cbe40b98b3793dcf966c456/todo";

const postTodo = async () => {
	const data = {
		text: textInput.value,
		number: numberInput.value,
		isLogin: false,
	};
	try {
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		getTodo();
	} catch (e) {
		console.error(e);
	}
	if (textInput.value === "" && numberInput.value === "") {
		alert("Толук толтурунуз!");
	}
	textInput.value = "";
	numberInput.value = "";
};

const getTodo = async () => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		renderTodo(data);
	} catch (e) {
		console.error(e);
	}
};

const renderTodo = (users) => {
	const todoList = document.getElementById("todoList");
	todoList.innerHTML = null;
	users.map((item) => {
		const list = document.createElement("li");
		const textValue = document.createElement("h2");
		const numberValue = document.createElement("span");
		const completeds = document.createElement("button");
		completeds.innerText = "Completed";
		completeds.addEventListener("click", () =>
			putTodo(item._id, item.text, item.number, item.isLogin)
		);
		const deleteButton = document.createElement("button");
		deleteButton.innerText = "Delete";
		deleteButton.addEventListener("click", () => deleteTodo(item._id));
		textValue.innerText = item.text;
		numberValue.innerText = item.number;
		list.append(textValue, numberValue, completeds, deleteButton);
		todoList.appendChild(list);
	});
};

// const render = (pop) => {
// 	const result = pop.map((item) => {
// 		return `
// 			<div class="list">
// 				<h2>${item.text}</h2>
// 				<span>${item.number}</span>
// 				<button onclick="putTodos('${item._id}', '${item.text}', '${item.number}', ${item.isLogin})">COMPLETED</button>
// 				<button onclick="deleteTodos('${item._id}')">DELETE</button>
// 			</div>
// 		`;
// 	});
//   const getHtml = document.getElementById('todoList');
//   getHtml.innerHTML = result.join("");
// };

addButton.addEventListener("click", () => postTodo());

const putTodo = async (id, text, number, isLogin) => {
	try {
		await fetch(`${url}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: text,
				number: number,
				isLogin: !isLogin,
			}),
		});
		getTodo();
	} catch (e) {
		console.error(e);
	}
};

const deleteTodo = async (id) => {
	try {
		await fetch(`${url}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		getTodo();
	} catch (e) {
		console.error(e);
	}
};
