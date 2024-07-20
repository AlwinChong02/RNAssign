import sqlite3
db = sqlite3.connect('recipe.sqlite')

db.execute('DROP TABLE IF EXISTS recipe')

db.execute('''CREATE TABLE recipe(
    recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    notes TEXT NOT NULL,
    image TEXT NOT NULL
)''')


cursor = db.cursor()

cursor.execute('''
    INSERT INTO recipe(name,ingredients,instructions,notes,image)
    VALUES('Nasi Lemak',
               'Rice, Anchovies, Cucumber, Egg, Sambal',
               '1. Cook rice with coconut milk\n2. Fry anchovies\n3. Boil egg\n4. Slice cucumber\n5. Serve with sambal',
               'Best served with hot tea',
               'https://www.seriouseats.com/thmb/oBpvfjweNw7hHn5meqo6gpFF6Z0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20230309-NasiLemak-MichelleYip-Option1-8d0b9468c998495f91ef4ff6d3b5ab6b.jpg')
''')
cursor.execute('''
    INSERT INTO recipe(name,ingredients,instructions,notes,image)
    VALUES('Spaghetti Carbonara',
               'Spaghetti, Egg, Bacon, Cheese, Salt, Pepper',
               '1. Boil spaghetti\n2. Fry bacon\n3. Mix egg, cheese, salt, pepper\n4. Mix all together',
               'Best served with garlic bread',
               'https://www.allrecipes.com/thmb/zJzTLhtUWknHXVoFIzysljJ9wR8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg')	
''')
cursor.execute('''
    INSERT INTO recipe(name,ingredients,instructions,notes,image)
    VALUES('Chicken Rice',
               'Rice, Chicken, Cucumber, Soup, Chilli',
               '1. Cook rice\n2. Boil chicken\n3. Slice cucumber\n4. Serve with soup and chilli',
               'Best served with hot tea',
               'https://redhousespice.com/wp-content/uploads/2022/06/two-plateful-of-hainanese-chicken-rice-1365x2048.jpg')
''')

db.commit()
db.close()