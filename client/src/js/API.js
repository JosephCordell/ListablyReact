module.exports = {
    media: {
        get: async () => {
            return await fetch('/api/media/get', {
                method: 'POST',
                body: localStorage.getItem('todo'),
                headers: { 'Content-type': 'application/json' },
            })
                .then((response) => response.json())
                .catch((err) => console.log(err));
        },
    },
    todo: {
        create: async () => {
            return;
        },

        delete: async (value, id) => {
            const todo = JSON.parse(localStorage.getItem('todo'));
            const newTodo = todo.filter((media) => media.id !== id);
            localStorage.setItem('todo', JSON.stringify(newTodo));
            fetch('/api/users/update', {
                method: 'PUT',
                body: JSON.stringify({ todo: JSON.stringify(newTodo) }),
                headers: {
                    'Content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .catch((err) => console.log(err));
            return newTodo;
        },

        update: async (value, id) => {
            const todo = JSON.parse(localStorage.getItem('todo'));
            let found = false;

            todo.forEach((e, index) => {
                if (e.id === id) {
                    found = true;
                    if (e.todo === value) {
                        return;
                    } else {
                        todo[index].todo = value;
                    }
                }
            });
            if (!found) {
                todo.push({ id: id, todo: value });
            }

            localStorage.setItem('todo', JSON.stringify(todo));

            fetch('/api/users/update', {
                method: 'PUT',
                body: { todo: todo },
                headers: {
                    'Content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => response.json())
                .catch((err) => console.log(err));
            return todo;
        },
    },
    loggedIn: () => {
        if (localStorage.getItem('token') === null) {
            return false;
        }
        return true;
    },
};
