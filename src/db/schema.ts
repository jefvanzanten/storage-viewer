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

const productInfo = sqliteTable("product_info", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  content: real(),
  imgUrl: text().unique(),
  brandId: int("brand").references(() => brand.id),
  unitTypeId: int("unit_type").references(() => unitType.id),
  categoryId: int("category").references(() => category.id),
});

const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

const locationInfo = sqliteTable("location_info", {
  id: int().primaryKey({ autoIncrement: true }),
  locationId: int("location_id").references(() => location.id),
  parentId: int("parent_id").references(() => location.id),
});

const storageInfo = sqliteTable("storage_info", {
  id: int().primaryKey({ autoIncrement: true }),
  quantity: int().notNull(),
  expiration_date: text(),
  locationId: int("location")
    .references(() => location.id)
    .notNull(),
  productInfoId: int("product_info")
    .references(() => productInfo.id)
    .notNull(),
});

// Relations
const storageInfoRelations = relations(storageInfo, ({ one }) => ({
  product: one(productInfo, {
    fields: [storageInfo.productInfoId],
    references: [productInfo.id],
  }),
  location: one(location, {
    fields: [storageInfo.locationId],
    references: [location.id],
  }),
}));

const productInfoRelations = relations(productInfo, ({ one }) => ({
  brand: one(brand, {
    fields: [productInfo.brandId],
    references: [brand.id],
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

const locationRelations = relations(location, ({ one }) => ({
  locationInfo: one(locationInfo, {
    fields: [location.id],
    references: [locationInfo.locationId],
  }),
}));

const locationInfoRelations = relations(locationInfo, ({ one }) => ({
  location: one(location, {
    fields: [locationInfo.locationId],
    references: [location.id],
  }),
  parent: one(location, {
    fields: [locationInfo.parentId],
    references: [location.id],
  }),
}));

export {
  unitType,
  brand,
  category,
  productInfo,
  location,
  locationInfo,
  storageInfo,
  storageInfoRelations,
  productInfoRelations,
  locationRelations,
  locationInfoRelations,
};
