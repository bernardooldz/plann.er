-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "email" TEXT,
    "expires_at" DATETIME NOT NULL,
    "used_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invitations_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "trip_id" TEXT NOT NULL,
    CONSTRAINT "participants_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_participants" ("email", "id", "is_confirmed", "is_owner", "name", "trip_id") SELECT "email", "id", "is_confirmed", "is_owner", "name", "trip_id" FROM "participants";
DROP TABLE "participants";
ALTER TABLE "new_participants" RENAME TO "participants";
CREATE TABLE "new_trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "starts_at" DATETIME NOT NULL,
    "ends_at" DATETIME NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT,
    CONSTRAINT "trips_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_trips" ("created_at", "destination", "ends_at", "id", "is_confirmed", "starts_at") SELECT "created_at", "destination", "ends_at", "id", "is_confirmed", "starts_at" FROM "trips";
DROP TABLE "trips";
ALTER TABLE "new_trips" RENAME TO "trips";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_token_key" ON "invitations"("token");
