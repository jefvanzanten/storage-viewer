import { GetAllProducts } from "@/services/productService";
import { useState } from "react";

function useAddProduct() {
  const [productQuery, setProductQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function selectSuggestion(suggestion: string) {
    setProductQuery(suggestion);
    setShowSuggestions(false);
  }

  async function handleProductChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setProductQuery(value);

    if (value.length > 0) {
      const suggestions = await GetAllProducts(value);
      setSuggestions(suggestions || []);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  return {
    selectSuggestion,
    handleProductChange,
    productQuery,
    suggestions,
    showSuggestions,
  };
}

export default useAddProduct;
