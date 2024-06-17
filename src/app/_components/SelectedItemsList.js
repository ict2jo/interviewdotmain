export default function SelectedItemsList({ selectedItems, handleRemoveItem }) {
  const uniqueItems = Array.from(new Set(selectedItems));

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueItems.map((item) => (
        <div
          key={item}
          className="bg-gray-200 px-3 py-1 mt-3 rounded-full text-sm flex items-center justify-center"
        >
          {item}
          <button onClick={() => handleRemoveItem(item)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 text-red-500 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
