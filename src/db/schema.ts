import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Tables

const unitType = sqliteTable("unit_type", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

const brand = sqliteTable("brand", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

const category = sqliteTable("category", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

const productName = sqliteTable("product_name", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

const productInfo = sqliteTable("product_info", {
  id: int().primaryKey({ autoIncrement: true }),
  content: real(),
  imgUrl: text().unique(),
  brandId: int("brand_id").references(() => brand.id),
  productNameId: int("product_name_id")
    .notNull()
    .references(() => productName.id),
  unitTypeId: int("unit_type_id").references(() => unitType.id),
  categoryId: int("category_id").references(() => category.id),
});

const locationTable = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  imgUrl: text().unique(),
});

const locationInfo = sqliteTable("location_info", {
  id: int().primaryKey({ autoIncrement: true }),
  locationId: int("location_id").references(() => locationTable.id),
  parentId: int("parent_id").references(() => locationTable.id),
});

const storageInfo = sqliteTable("storage_info", {
  id: int().primaryKey({ autoIncrement: true }),
  quantity: int().notNull(),
  expiration_date: text(),
  locationId: int("location_id")
    .references(() => locationTable.id)
    .notNull(),
  productInfoId: int("product_info_id")
    .references(() => productInfo.id)
    .notNull(),
});

// Relations
const storageInfoRelations = relations(storageInfo, ({ one }) => ({
  product: one(productInfo, {
    fields: [storageInfo.productInfoId],
    references: [productInfo.id],
  }),
  location: one(locationTable, {
    fields: [storageInfo.locationId],
    references: [locationTable.id],
  }),
}));

const productInfoRelations = relations(productInfo, ({ one }) => ({
  brand: one(brand, {
    fields: [productInfo.brandId],
    references: [brand.id],
  }),
  productName: one(productName, {
    fields: [productInfo.productNameId],
    references: [productName.id],
  }),
  unitType: one(unitType, {
    fields: [productInfo.unitTypeId],
    references: [unitType.id],
  }),
  category: one(category, {
    fields: [productInfo.categoryId],
    references: [category.id],
  }),
}));

const locationRelations = relations(locationTable, ({ one }) => ({
  locationInfo: one(locationInfo, {
    fields: [locationTable.id],
    references: [locationInfo.locationId],
  }),
}));

const locationInfoRelations = relations(locationInfo, ({ one }) => ({
  location: one(locationTable, {
    fields: [locationInfo.locationId],
    references: [locationTable.id],
  }),
  parent: one(locationTable, {
    fields: [locationInfo.parentId],
    references: [locationTable.id],
  }),
}));

export {
  unitType,
  brand,
  category,
  productName,
  productInfo,
  locationTable,
  locationInfo,
  storageInfo,
  storageInfoRelations,
  productInfoRelations,
  locationRelations,
  locationInfoRelations,
};
