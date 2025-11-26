import StorageItemCard from "@/components/StorageItemCard";
import { GetAllStorage } from "@/services/storageService";

export default async function Home() {
  const data = await GetAllStorage();

  console.log("storageinfo:", data);
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4">
      <input
        className="bg-white w-[31em] px-4 py-2 text-black"
        defaultValue="Zoek..."
      />
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <StorageItemCard key={item.id} storageInfoItem={item} />
        ))}
      </div>
    </div>
  );
}
