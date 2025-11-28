# Checklist: ProductName Tabel Wijzigingen

## Database Schema

### 1. Voeg productName relatie toe aan productInfoRelations
**Bestand:** [src/db/schema.ts:71-84](src/db/schema.ts#L71-L84)

```typescript
const productInfoRelations = relations(productInfo, ({ one }) => ({
  brand: one(brand, {
    fields: [productInfo.brandId],
    references: [brand.id],
  }),
  productName: one(productName, {  // ← TOEVOEGEN
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
```

### 2. Exporteer productName tabel
**Bestand:** [src/db/schema.ts:104-116](src/db/schema.ts#L104-L116)

```typescript
export {
  unitType,
  brand,
  category,
  productName,  // ← TOEVOEGEN
  productInfo,
  locationTable,
  locationInfo,
  storageInfo,
  storageInfoRelations,
  productInfoRelations,
  locationRelations,
  locationInfoRelations,
};
```

---

## Product Service

### 3. Fix GetAllProducts() - Join met productName tabel
**Bestand:** [src/services/productService.ts:8-15](src/services/productService.ts#L8-L15)

**Probleem:** `productInfo.name` bestaat niet meer

**Oplossing:**
```typescript
import { db } from "@/db";
import { like, eq } from "drizzle-orm";
import { productInfo, productName } from "@/db/schema";  // ← productName importeren

async function GetAllProducts(query: string): Promise<string[]> {
  const products = await db
    .select({ name: productName.name })
    .from(productInfo)
    .innerJoin(productName, eq(productInfo.productNameId, productName.id))
    .where(like(productName.name, `%${query}%`));

  return products.map((p) => p.name);
}
```

### 4. Fix GetProductId() - Zoek via productName
**Bestand:** [src/services/productService.ts:18-34](src/services/productService.ts#L18-L34)

**Probleem:** Zoekt op `productInfo.name` die niet bestaat

**Oplossing:** Zoek eerst productNameId, dan productInfoId
```typescript
async function GetProductId(name: string): Promise<number | undefined> {
  try {
    // Stap 1: Zoek productNameId
    const productNameResult = await db
      .select({ id: productName.id })
      .from(productName)
      .where(eq(productName.name, name))
      .limit(1);

    if (productNameResult.length === 0) {
      return undefined;
    }

    // Stap 2: Zoek productInfoId via productNameId
    const existing = await db
      .select({ id: productInfo.id })
      .from(productInfo)
      .where(eq(productInfo.productNameId, productNameResult[0].id))
      .limit(1);

    if (existing.length > 0) {
      return existing[0].id;
    }

    return undefined;
  } catch (error: unknown) {
    console.log(error);
  }
}
```

**OF:** Als je meerdere productInfo records wilt (bijv. verschillende merken mayonaise), return een array:
```typescript
async function GetProductIdsByName(name: string): Promise<number[]> {
  try {
    const products = await db
      .select({ id: productInfo.id })
      .from(productInfo)
      .innerJoin(productName, eq(productInfo.productNameId, productName.id))
      .where(eq(productName.name, name));

    return products.map(p => p.id);
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}
```

---

## Storage Service

### 5. Voeg productName relatie toe aan query
**Bestand:** [src/services/storageService.ts:9-28](src/services/storageService.ts#L9-L28)

**Probleem:** Query haalt `product.name` op, maar die kolom bestaat niet

**Oplossing:**
```typescript
const storage = await db.query.storageInfo.findMany({
  with: {
    product: {
      with: {
        brand: true,
        productName: true,  // ← TOEVOEGEN
        unitType: true,
        category: true,
      },
    },
    location: {
      with: {
        locationInfo: {
          with: {
            parent: true,
          },
        },
      },
    },
  },
});
```

### 6. Fix mapping - Haal naam uit productName relatie
**Bestand:** [src/services/storageService.ts:31-42](src/services/storageService.ts#L31-L42)

**Probleem:** `storageInfo.product.name` bestaat niet

**Oplossing:**
```typescript
return storage.map((storageInfo) => ({
  id: storageInfo.id,
  quantity: storageInfo.quantity,
  expirationDate: storageInfo.expiration_date ?? "",
  product: {
    id: storageInfo.product.id,
    name: storageInfo.product.productName?.name ?? "",  // ← WIJZIGEN
    content: storageInfo.product.content ?? 0,
    brand: storageInfo.product.brand?.name,
    unitType: storageInfo.product.unitType?.name,
    category: storageInfo.product.category?.name,
  },
  location: {
    id: storageInfo.location.id,
    name: storageInfo.location.name,
    parentName: storageInfo.location.locationInfo?.parent?.name,
  },
}));
```

---

## Database Migratie

### 7. Genereer en run migratie
```bash
npm run db:generate
npm run db:migrate
```

---

## Testing

### 8. Test scenarios
- [ ] Product toevoegen met zelfde naam maar ander merk (3x Mayonaise, verschillende merken)
- [ ] Product zoeken via GetAllProducts()
- [ ] Product ophalen via GetProductId()
- [ ] Storage weergave met correcte product namen
- [ ] UI componenten (ProductSelector)
- [ ] Check of alle ESLint errors zijn opgelost

---

## Samenvatting Belangrijkste Wijzigingen

1. **Schema:**
   - `productName` relatie toevoegen aan `productInfoRelations`
   - `productName` exporteren

2. **productService.ts:**
   - Import `productName` toevoegen
   - Alle queries JOINen met `productName` tabel
   - `GetProductId()` aanpassen om via productName te zoeken

3. **storageService.ts:**
   - `productName` relatie toevoegen aan query
   - Mapping fixen om naam uit `productName` relatie te halen

4. **Database:**
   - Migratie genereren en uitvoeren

5. **Testing:**
   - Alle flows end-to-end testen
