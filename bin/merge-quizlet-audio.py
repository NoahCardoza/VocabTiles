"""
    TODO: automate uploading questions to Quizlet and scraping data

    For now:
        bash:
            jq '.quizzes[].tiles[].text' -r quizzes.json | pbcopy
        js:
            const questions = Quizlet.setPageData.termIdToTermsMap
            const keys = Object.keys(questions)
            const data = keys
                .map(k => ({[questions[k].word]: location.origin + questions[k]._wordAudioUrl}))
                .reduce((collection, object) => ({...collection, ...object}), {})
            JSON.stringify(data, null, 2)

    Save to `speech.json` and run `python3.7 merge-quizlet-audio.py`.
"""

import json

audio = json.load(open('./speech.json', 'r'))
parent = json.load(open('../content/quizzes.json', 'r'))
quizzes = parent['quizzes']

for quiz in quizzes:
    for tile in quiz['tiles']:
        if 'speech' in tile:
            if tile['speech'] in audio:
                tile['ql_audio'] = audio[tile['speech']]
            else:
                print('No audio for speech:', tile['speech'])

        if tile['text'] in audio:
            tile['ql_audio'] = audio[tile['text']]
        else:
            print('No audio for text:', tile['text'])

json.dump(parent, open('../content/quizzes.json', 'w'), indent=2)
