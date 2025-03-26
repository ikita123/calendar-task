const Sidebar = () => (
  <aside className="w-64 bg-white border-r p-4">
    <h2 className="text-lg font-semibold mb-4 text-center">Assign All</h2>
    {[1, 2, 3].map((_, i) => (
      <div key={i} className="p-3 border rounded-lg mb-2">
        <p className="font-medium">Cameron Williamson</p>
        <p className="text-sm text-gray-500">4140 Parker Rd.</p>
        <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded">
          Assign
        </button>
      </div>
    ))}
  </aside>
);

export default Sidebar;
