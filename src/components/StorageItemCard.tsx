"use client";

import { StorageItem } from "@/types";

// TODO: I need to refactor this so it seperates the html elements and logic,
// since I plan on making a react native app aswell and i want to re-use as much as possible.

type StorageItemProps = {
  storageInfoItem: StorageItem;
};

enum QuantityStatus {
  EMPTY,
  LOW,
  MEDIUM,
  HIGH,
}

// checks if quantity hits a certain treshold.
// I will probably make a dedicated treshold value for each product. Probably multiple.
function DetermineQuantityStatus(quantity: number): QuantityStatus {
  if (quantity == 0) return QuantityStatus.EMPTY;
  else if (quantity <= 6 && quantity > 0) return QuantityStatus.LOW;
  else if (quantity > 6 && quantity < 12) return QuantityStatus.MEDIUM;

  return QuantityStatus.HIGH;
}

// Color codes for the labels. Green is healthy amount left -> red is in dire need for renewal/rebuying
function GetQuantityStatusColor(status: QuantityStatus): string {
  switch (status) {
    case QuantityStatus.EMPTY:
      return "bg-gray-500";
    case QuantityStatus.LOW:
      return "bg-red-700";
    case QuantityStatus.MEDIUM:
      return "bg-orange-500";
    case QuantityStatus.HIGH:
      return "bg-green-500";
  }
}

// This needs to determine how many days are left from the expiration date to the current date.
function ConvertDateToDaysLeft(date: string) {
  console.log(date);
}

// The visual component
function StorageItemCard({ storageInfoItem }: StorageItemProps) {
  ConvertDateToDaysLeft(storageInfoItem.expirationDate);
  const today = Date.now();
  console.log(today);

  const quantityStatus = DetermineQuantityStatus(storageInfoItem.quantity);
  const quantityColorClass = GetQuantityStatusColor(quantityStatus);

  return (
    <div
      className={`flex flex-row rounded-xl min-w-[500px] bg-white text-[#000] p-4 gap-4`}
    >
      <div className={`flex items-center`}>
        {!storageInfoItem.product.imgUrl ? (
          <div className={`w-[5em] h-[5em] bg-gray-300`} />
        ) : (
          <div className={`w-[10px] h-[10px]`} />
        )}
      </div>
      <div className={`flex flex-col gap-1`}>
        <h1 className={`size-xl`}>
          {storageInfoItem.product.name}
          <span> - </span>
          {storageInfoItem.product.brand}
        </h1>
        <div className={`label-container`}>
          <p>Opbergplaats: </p>
          {storageInfoItem.location?.parentName && (
            <span className={`bg-slate-800 label`}>
              {storageInfoItem.location?.parentName}
            </span>
          )}
          {storageInfoItem.location.name && (
            <span
              className={`${
                storageInfoItem.location.parentName
                  ? `bg-indigo-900`
                  : `bg-slate-800`
              }  label`}
            >
              {storageInfoItem.location.name}
            </span>
          )}
        </div>

        <div className={`label-container`}>
          {storageInfoItem.expirationDate && (
            <div className={`label-container`}>
              <p>Houdbaar: </p>
              <span>{storageInfoItem.expirationDate}</span>
            </div>
          )}
          {storageInfoItem.product.content && (
            <div className={`label-container`}>
              <p>Hoeveel: </p>
              <span className={`label ${quantityColorClass}`}>
                {storageInfoItem.quantity}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorageItemCard;
