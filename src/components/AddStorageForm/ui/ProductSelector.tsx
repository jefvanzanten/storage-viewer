import useAddProduct from "../hooks/useAddProduct";

function ProductSelector() {
  const {
    selectSuggestion,
    handleProductChange,
    productQuery,
    suggestions,
    showSuggestions,
  } = useAddProduct();

  console.log(suggestions);

  return (
    <div className="flex flex-row gap-2 justify-between relative">
      <p>Product*</p>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <input
            name="productName"
            type="text"
            className="w-[10em] bg-white text-black px-2 py-1"
            value={productQuery}
            onChange={handleProductChange}
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="w-full bg-white border ">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSelector;
