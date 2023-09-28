import { useEffect, useState } from "react";
import Form, { Alert } from "../Components/Fragments/Form.jsx";
import Todo from "../Components/Fragments/Todo.jsx";
import { getTodos } from "../services/TodoService.js";
import Footer from "../Components/Fragments/Footer.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [edit, setEdit] = useState(false);

  const getDataFromAPI = () => {
    getTodos().then((response) => {
      setTodos(response.data);
    });
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 1500);
  }, [error, success]);

  return (
    <div className="container px-3">
      <div className="bg-white max-w-2xl min-h-[80vh] mx-auto mt-10 rounded-md py-3 px-5 shadow-lg">
        <h1 className="text-3xl font-bold text-center mt-2 text-secondary">
          TODOLIST
        </h1>
        {}
        {error && <Alert message={error} css="bg-red-200" />}
        {success && <Alert message={success} css="bg-green-200" />}
        <main className="md:flex">
          <Form callback={getDataFromAPI} edit={edit} />
          <section className="todo-wrapper mt-4 md:max-h-[65vh] md:overflow-y-auto">
            {todos.length > 0 ? (
              todos.map((data) => {
                return (
                  <div key={data.id}>
                    <Todo
                      title={data.title}
                      description={data.description}
                      id={data.id}
                      error={setError}
                      success={setSuccess}
                      callback={getDataFromAPI}
                      edit={setEdit}
                      completed={data.completed}
                    />
                  </div>
                );
              })
            ) : (
              <span className="inline-block text-center w-full">
                No Data Available
              </span>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
