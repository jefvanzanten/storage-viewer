import StorageItemCard from "@/components/StorageItemCard";
import { GetAllStorage } from "@/storageService";

export default async function Home() {
  const data = await GetAllStorage();

  console.log("storageinfo:", data);
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4">
      <input className="bg-white w-[30em] px-4 py-2" defaultValue="Zoek..." />
      <div>
        {data.map((item) => (
          <StorageItemCard key={item.id} storageInfoItem={item} />
        ))}
      </div>
    </div>
  );
}
