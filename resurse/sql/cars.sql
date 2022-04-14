DROP TYPE IF EXISTS categ_modele;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_modele AS ENUM( 'lamborghini', 'mclaren', 'bmw', 'ferrari', 'bugatti');
CREATE TYPE tipuri_produse AS ENUM('urus', 'aventador', 'huracan', 'sian', 'm8', 'coupe', 
'x6', 'i8', 'chiron', 'veyron', 'divo', 'senna', 'm4', 'tributo', '720s');


CREATE TABLE IF NOT EXISTS cars (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   horsepower INT NOT NULL CHECK (horsepower>=0),   
   tip_produs tipuri_produse DEFAULT 'urus',
   maxspeed INT NOT NULL CHECK (maxspeed>=0),
   categorie categ_modele DEFAULT 'lamborghini',
   tunings VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   steering_wheel_right BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   culoare VARCHAR(50) 
);

INSERT into cars (nume, descriere, pret, horsepower, maxspeed, tip_produs, categorie, tunings, steering_wheel_right, imagine, culoare) VALUES 
('Lamborghini Urus', 'Cea mai frumoasa masina', 300000, 650, 305, 'urus', 'lamborghini', '{"scaune incalzite", "tablete"}', False, 'urus.jpg', 'black'),
('Bmw M8', 'Un bmw interesant', 150000, 617, 311, 'm8', 'bmw', '{"sistem audio", "aer conditionat"}', True, 'm8.jpg', 'black'),
('Mclaren Coupe', 'Mcdonalds', 170000, 562, 328, 'coupe', 'mclaren', '{"aer conditionat", "spoiler"}', True, 'coupe.jpg', 'orange'), 
('Bmw I8', 'Un bmw misto', 200000, 570, 300, 'i8', 'bmw', '{"sistem audio", "spoiler}', True, 'i8.jpg', 'black'), 
('Lamborghini Aventador', 'O masina rapida', 300000, 660, 320, 'aventador', 'lamborghini', '{"spoiler", "tablete"}', True, 'aventador.jpg', 'white'), 
('Lamborghini Huracan', 'aventador wannabe', 250000, 570, 300, 'huracan', 'lamborghini', '{"scaune incalzite", "tablete"}', True, 'huracan.jpg', 'sky-blue'), 
('Lamborghini Avendator', 'Vroom Vroom rosu', 320000, 640, 330, 'aventador', 'lamborghini', '{"aer conditionat", "tablete"}', False, 'red-avendator.jpg', 'red'),
('Lamborghini Sian', 'Old but gold', 2640000, 807, 350, 'sian', 'lamborghini', '{"turbo", "spoiler"}', False, 'sian.jpg', 'turquoise'),
('Mclaren 720s', 'Nava spatiala', 315000, 710, 341, '720s', 'mclaren', '{"spoiler", "turbo"}', False, 'orange-mclaren.jpg', 'orange'), 
('Bugatti Chiron', 'Cea mai rapida', 3300000, 1500, 381, 'chiron', 'bugatti', '{"lux", "turbo"}', False, 'chiron.jpg', 'white'), 
('Bugatti Divo', 'Arata genial', 5700000, 1479, 380, 'divo', 'bugatti', '{"sistem audio", "gps"}', True, 'divo.jpg', 'black'), 
('Bmw M4 Competition', 'Masina de drifturi', 194000, 473, 303, 'm4', 'bmw', '{"drift tires", "tablete"}', False, 'm4-comp.jpg', 'yellow'), 
('Bmw M8', 'Bmw-ul oceanelor', 132000, 620, 311, 'm8', 'bmw', '{"spoiler", "sistem audo"}', False, 'm8-blue.jpg', 'blue'), 
('Mclaren Senna', 'ozn de la mclaren', 1000000, 789, 340, 'senna', 'mclaren', '{"scaune incalzite", "aer conditionat"}', True, 'senna.jpg', 'red'), 
('Ferrari Tributo', 'Ferrari aduce tribut haha', 290000, 640, 320, 'tributo', 'ferrari', '{"lux", "drift"}', False, 'tributo.jpg', 'red'), 
('Lamborghini Urus', 'Cea mai frumoasa masina pe albastru', 310000, 660, 320, 'urus', 'lamborghini', '{"scaune incalizate", "turbo"}', False, 'urus-blue.jpg', 'blue'), 
('Bugatti Veyron', 'Am fost recent prin Bucuresti', 1700000, 987, 431, 'veyron', 'bugatti', '{"spoiler", "lux"}', True, 'veyron.jpg', 'black-orange');


