type ImageSelectorWithLabelProps = {
  label: string;
  formIdentifier: string;
  outputFolder: string;
};

function ImageSelectorWithLabel({
  label,
  formIdentifier,
  outputFolder,
}: ImageSelectorWithLabelProps) {
  return (
    <div className="flex flex-row justify-between">
      <p>{label}</p>
      <input hidden={true} name={formIdentifier} />
      <button className="bg-gray-200 text-black py-1 px-2 text-sm">
        Foto uploaden/maken
      </button>
    </div>
  );
}

export default ImageSelectorWithLabel;
