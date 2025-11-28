import ImageSelectorWithLabel from "@/components/Shared/ui/ImageSelectorWithLabel";

type ProductImageSelectorProps = {};

function ProductImageSelector() {
  return (
    <ImageSelectorWithLabel
      label={"Productafbeelding"}
      formIdentifier={"productImage"}
      outputFolder={"/products/"}
    />
  );
}

export default ProductImageSelector;
