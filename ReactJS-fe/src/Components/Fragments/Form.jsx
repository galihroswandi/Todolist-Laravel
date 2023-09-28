import { useEffect, useState } from "react";
import InputForm from "../Elements/InputForm";
import { createTodo, updateTodo } from "../../services/TodoService";
import PropTypes from "prop-types";

export default function Form({ callback, edit }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(edit ? true : false);
    setTitleValue(edit ? edit.title : "");
    setTextAreaValue(edit ? edit.description : "");
  }, [edit]);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 1500);
  }, [success, error]);

  const handleCancelEdit = () => {
    edit = null;
    setUpdate(false);
    setTitleValue("");
    setTextAreaValue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    !e.target.title.value && setError("Title is required");
    !e.target.description.value && setError("Description is required");

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    const renderMessage = (message) => {
      setSuccess(message);
      setTitleValue("");
      setTextAreaValue("");
      callback();
    };

    if (!update) {
      const res = await createTodo(data);

      if (res.error) {
        setError("Data gagal ditambahkan !");
      } else {
        renderMessage("Data berhasil ditambahkan !");
      }
    } else {
      const res = await updateTodo(data, edit.id);
      if (res.error) {
        setError("Data gagal diubah !");
      } else {
        renderMessage("Data berhasil diubah !");
      }
    }
  };

  return (
    <div>
      {error && <Alert message={error} css="bg-red-200" />}
      {success && <Alert message={success} css="bg-green-200" />}
      <form onSubmit={handleSubmit} className="py-2 px-3 flex flex-col gap-y-2">
        <InputForm
          title="Title"
          type="text"
          placeholder="Type here for title"
          value={titleValue}
          callback={(e) => setTitleValue(e)}
        />
        <label
          htmlFor="description"
          className="text-slate-600 flex flex-col gap-y-2"
        >
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="2"
            className="max-w-full border rounded-[.1rem] px-3 py-2 text-sm outline-none bg-primary border-[#B5D665] text-slate-500"
            placeholder="Type here for description"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          ></textarea>
        </label>
        <button
          type="submit"
          className="w-full bg-[#B5D665] text-primary mt-2 py-1.5 px-2 rounded-sm text-sm"
        >
          {update ? "Update todo" : "Add Todo"}
        </button>
        {update && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
Form.propTypes = {
  callback: PropTypes.func,
  edit: PropTypes.any,
};

export const Alert = ({ message, css }) => {
  return (
    <section
      className={`alert-success py-2 mt-5 px-3 text-slate-600 rounded-sm text-sm mx-3 ${css}`}
    >
      <p>{message}</p>
    </section>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  css: PropTypes.string,
};
