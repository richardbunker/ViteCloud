export function Register() {
  return (
    <section className="p-8 bg-gray-200 flex-grow">
      <div className="p-2 bg-white max-w-md mx-auto rounded space-y-4">
        <h1 className="text-lg font-bold">Register</h1>
        <form className="flex flex-col h-full space-y-2">
          <input className="p-1 border" type="name" placeholder="Name" />
          <input className="p-1 border" type="email" placeholder="Email" />
          <button
            className="text-sm font-bold bg-blue-500 rounded py-1 px-2 text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
