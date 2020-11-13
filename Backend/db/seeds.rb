# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ruby = Language.create(name: 'Ruby', category: 'Object Oriented')
js = Language.create(name: 'JavaScript', category: 'Object Oriented')
python = Language.create(name: 'Python', category: 'Object Oriented')

ruby.notes.create(title: 'variables', body: 'assign variables like this: variable_name = "this is a variable, its type is string"')
js.notes.create(title: "variables", body: 'JS variables use the keyword let, const, or var. They each have different functionality. ex: const variableName = 14')
python.notes.create(title:"variables", body: "I dont know how to write variables in Python!! Check a later note :)")
