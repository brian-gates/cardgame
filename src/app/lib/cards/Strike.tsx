export function Strike() {
  return (
    <button
      name="action"
      value="strike"
      type="submit"
      className="w-36 h-56 bg-slate-100 rounded-md shadow-md border-2 hover:border-2 hover:scale-125 transition cursor-pointer flex flex-col"
    >
      <h4 className="text-lg font-bold text-center border-b w-full">Strike</h4>
      <div className="p-1 grow gap-1 flex flex-col">
        <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
        <p className="text-sm p-2 text-left shadow-inner rounded-sm h-fit border-2 border-green-300 grow">
          Deal 5 damage.
        </p>
      </div>
    </button>
  );
}
