CREATE TABLE "Users" {
	"userId" INTERGER NOT NULL,
	dateModified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	PRIMARY KEY("userId" AUTOINCREMENT)
}

CREATE TABLE "Categories" {
	"categoryId" INTEGER NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	PRIMARY KEY("categoryId" AUTOINCREMENT)
}

CREATE TABLE "Carts" (
    "cartId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL UNIQUE,
    "status" TEXT NOT NULL CHECK ("status" IN ('new', 'abandoned', 'purchased')),
    dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("cartId" AUTOINCREMENT),
    FOREIGN KEY("userId") REFERENCES "Users"("userId")
);

CREATE TABLE "Products" (
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL CHECK ("price" > 0),
    "details" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    PRIMARY KEY("productId" AUTOINCREMENT),
    FOREIGN KEY("categoryId") REFERENCES "Categories"("categoryId")
);

CREATE TABLE CartProducts {
	"id" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	FOREIGN KEY("cartId") REFERENCES "cart"("cartId"),
	FOREIGN KEY("productId") REFERENCES "products"("productId"),
	PRIMARY KEY("id" AUTOINCREMENT)
}