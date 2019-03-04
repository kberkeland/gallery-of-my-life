CREATE TABLE "gallery_items" (
    "id" SERIAL PRIMARY KEY,
    "path" VARCHAR(100) NOT NULL,
    "description" VARCHAR(240),
    "likes" INTEGER
);

INSERT INTO "gallery_items" ("path", "description", "likes")
VALUES ('images/bahamas.jpg', 'The only Bahamas vacation picture on my computer.', 10),
('images/baseball_game.jpg', 'Picture of Kye and Katie at a Twins game.', 8),
('images/brody.jpg', 'Super awesome Irish Setter.', 12),
('images/family.jpg', 'Old picture of a picture with parents, siblings and great grandparents.', 8),
('images/lexi.jpg', 'Cat on her second day at home.', 7),
('images/peeper.jpg', 'Peeper (Pepper) rabbit in the backyard.', 7),
('images/reid.jpg', 'Latest picture of tiny baby.', 22);