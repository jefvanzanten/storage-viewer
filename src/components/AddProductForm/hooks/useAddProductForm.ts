function useAddProductForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName");
    const unitType = formData.get("unitType");
    const content = formData.get("content");
    const brandName = formData.get("brandName");
    const categoryName = formData.get("categoryName");
    const imgUrl = formData.get("imgUrl");
  };

  return { onSubmit };
}

export default useAddProductForm;
