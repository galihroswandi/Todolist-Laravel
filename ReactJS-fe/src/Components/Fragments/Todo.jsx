import { Edit, Trash } from "feather-icons-react/build/IconComponents";
import CheckCircle from "feather-icons-react/build/IconComponents/CheckCircle";
import PropTypes from "prop-types";
import {
  deleteTodo,
  getSingleTodo,
  udpateCompleted,
} from "../../services/TodoService";

export default function Todo(props) {
  const { title, description, id, error, success, callback, edit, completed } =
    props;
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteTodo(id);
    if (res) {
      success("Data berhasil dihapus !");
      callback();
    } else {
      error("Data gagal dihapus !");
    }
  };

  const handleTodoCompleted = async () => {
    const singleTodo = await getSingleTodo(id);

    const data = {
      ...singleTodo.data,
      completed: singleTodo.data.completed > 0 ? false : true,
    };
    await udpateCompleted(data, id);
    callback();
  };

  const handleEdit = async (id) => {
    const res = await getSingleTodo(id);
    !res.data ? error("Data tidak ditemukan") : edit(res.data);
  };

  return (
    <main className="px-3 mx-auto">
      <header className="flex justify-between items-start py-1.5 gap-y-3 min-w-[90%]">
        <button
          onClick={handleTodoCompleted}
          className="bg-accent mr-1.5 rounded-full p-1"
        >
          <CheckCircle className="w-3.5 h-3.5 text-slate-500" />
        </button>
        <section className="detail bg-accent flex flex-col gap-y-1 w-full pl-3 pr-3 py-1 pb-3 rounded-sm max-h-[100vh]">
          <section className="flex bg-accent justify-between items-center">
            <h6 className={`text-slate-500 ${completed > 0 && "line-through"}`}>
              {title}
            </h6>
          </section>
          <section>
            <h6 className="text-xs text-slate-500">Deskripsi</h6>
            <p
              className={`text-sm bg-primary px-2 py-1 rounded mt-1 text-slate-500 min-h-[5rem]  ${
                completed > 0 && "line-through"
              }`}
            >
              {description}
            </p>
            <section className="flex items-center mt-3 gap-x-2 justify-end">
              <button
                onClick={() => handleEdit(id)}
                className="text-primary bg-[#65A30D] flex items-center px-2 py-.5 rounded-sm"
              >
                <Edit className="w-3.5 h-3.5 text-primary" />
                <span>Edit</span>
              </button>
              <button
                className="text-primary bg-red-500 flex items-center px-2 py-.5 rounded-sm"
                onClick={handleDelete}
              >
                <Trash className="w-3.5 h-3.5 text-primary" />
                <span>Delete</span>
              </button>
            </section>
          </section>
        </section>
      </header>
    </main>
  );
}

Todo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  error: PropTypes.func,
  success: PropTypes.func,
  callback: PropTypes.func,
  edit: PropTypes.any,
  completed: PropTypes.string,
};
