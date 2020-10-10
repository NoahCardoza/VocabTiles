import json
import re

RE_SLUG = re.compile(r'\W+')


def slugify(text):
    return RE_SLUG.sub('-', text).lower()


quizzes = json.load(open('../content/quizzes.json', 'r'))['quizzes']

# SELECT MAX(id)
Category = """INSERT INTO "Category" (type, title, slug) VALUES('{type}', '{title}', '{slug}') RETURNING id INTO CategoryID;"""
Question = """INSERT INTO "Question" (category_id, text, audio, color, image) VALUES(CategoryID, '{text}', '{audio}', {color}, {image});"""

print('DO $$')
print('DECLARE CategoryID integer;')
print('BEGIN')

for quiz in quizzes:
    print(Category.format(type=quiz['type'],
                          title=quiz['category'],
                          slug=slugify(quiz['category'])))
    for tile in quiz['tiles']:
        image = f"'{tile['image']}'" if 'image' in tile else 'NULL'
        color = f"'{tile['color']}'" if 'color' in tile else 'NULL'
        print(Question.format(
              text=tile['text'],
              audio=tile['audio'],
              color=color,
              image=image))
print('END $$')
