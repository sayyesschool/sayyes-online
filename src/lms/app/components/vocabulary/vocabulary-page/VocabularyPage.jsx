import Stack from '@mui/joy/Stack';

import InlineInput from 'shared/components/inline-input';
import Page from 'shared/components/page';
import { Button, Checkbox, List, Select } from 'shared/ui-components';

import LeximaItem from 'lms/components/vocabulary/lexima-item';

const vocabulary = {
    id: 1,
    title: 'Мой словарь',
    description: '',
    url: '/vocabulary/vocabulary-page',
    items: [
        {
            id: 1,
            value: 'cat',
            definitions: [
                'a small animal with fur, four legs, and a tail that is kept as a pet'
            ],
            translations: [
                'кот',
                'кошка'
            ],
            examples: [
                'My cat likes dozing in front of the fire.',
                'I usually feed the neighbour\'s cat while she\'s away.',
                'She\'s always chasing cats out of the garden to protect her precious birds.',
                'A cat was miaowing pitifully outside the door.',
                'The cat purred as I stroked its fur.'
            ]
        },
        {
            id: 2,
            value: 'house',
            definitions: [
                'a building for human habitation, especially one that is lived in by a family or small group of people'
            ],
            translations: [
                'дом',
                'maison',
                'Haus'
            ],
            examples: [
                'Their house is located near the park.',
                'I grew up in that house.',
                'The house has a beautiful garden in the backyard.',
                'We painted the house last summer.',
                'The old house was full of character.'
            ]
        },
        {
            id: 3,
            value: 'book',
            definitions: [
                'a written or printed work consisting of pages glued or sewn together along one side and bound in covers'
            ],
            translations: [
                'книга',
                'livre',
                'Buch'
            ],
            examples: [
                'She reads a new book every week.',
                'I bought a rare book at the bookstore.',
                'The book was published last year.',
                'He wrote a book about his travels.',
                'Can I borrow that book when you\'re done?'
            ]
        },
        {
            id: 4,
            value: 'dog',
            definitions: [
                'a domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, non-retractile claws, and a barking, howling, or whining voice'
            ],
            translations: [
                'собака',
                'chien',
                'Hund'
            ],
            examples: [
                'Her dog loves playing fetch in the park.',
                'The dog barked loudly when the doorbell rang.',
                'I take my dog for a walk every morning.',
                'Our family adopted a rescue dog from the shelter.',
                'The dog wagged its tail excitedly.'
            ]
        },
        {
            id: 5,
            value: 'car',
            definitions: [
                'a road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people'
            ],
            translations: [
                'автомобиль',
                'voiture',
                'Auto'
            ],
            examples: [
                'She drives a red sports car.',
                'We rented a car for our road trip.',
                'The car needs to be serviced regularly.',
                'He parked his car in the garage.',
                'The car sped down the highway.'
            ]
        },
        {
            id: 6,
            value: 'tree',
            definitions: [
                'a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground'
            ],
            translations: [
                'дерево',
                'arbre',
                'Baum'
            ],
            examples: [
                'The children climbed the tree to pick apples.',
                'There is a beautiful tree in the park.',
                'The trees leaves change color in the fall.',
                'We planted several trees in our backyard.',
                'The tree provided shade on a hot day.'
            ]
        },
        {
            id: 7,
            value: 'river',
            definitions: [
                'a large natural stream of water flowing in a channel to the sea, a lake, or another such stream'
            ],
            translations: [
                'река',
                'rivière',
                'Fluss'
            ],
            examples: [
                'They went fishing in the river.',
                'The river flooded after heavy rain.',
                'We took a boat trip down the river.',
                'The river forms a natural boundary between the two countries.',
                'The river flows through the center of the city.'
            ]
        },
        {
            id: 8,
            value: 'computer',
            definitions: [
                'an electronic device for storing and processing data'
            ],
            translations: [
                'компьютер',
                'ordinateur',
                'Computer'
            ],
            examples: [
                'I use my computer for work and entertainment.',
                'She bought a new computer for gaming.',
                'The computer crashed and lost all my files.',
                'We need to upgrade the computer\'s memory.',
                'The computer screen displays high-resolution images.'
            ]
        },
        {
            id: 9,
            value: 'sun',
            definitions: [
                'the star that is the central body of the solar system, around which the planets orbit and from which they receive light and heat'
            ],
            translations: [
                'солнце',
                'soleil',
                'Sonne'
            ],
            examples: [
                'The sun rises in the east and sets in the west.',
                'We enjoyed the warm rays of the sun on the beach.',
                'The sun provides energy for plants through photosynthesis.',
                'Protect your skin from the sun\'s harmful rays with sunscreen.',
                'The sun is essential for life on Earth.'
            ]
        },
        {
            id: 10,
            value: 'music',
            definitions: [
                'vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion'
            ],
            translations: [
                'музыка',
                'musique',
                'Musik'
            ],
            examples: [
                'Listening to music helps me relax.',
                'She plays classical music on the piano.',
                'The concert featured live music from local bands.',
                'Music is a universal language.',
                'He studied music theory in college.'
            ]
        },
        {
            id: 11,
            value: 'flower',
            definitions: [
                'the seed-bearing part of a plant, consisting of reproductive organs (stamens and carpels) that are typically surrounded by a brightly colored corolla (petals) and a green calyx (sepals)'
            ],
            translations: [
                'цветок',
                'fleur',
                'Blume'
            ],
            examples: [
                'She received a bouquet of flowers on her birthday.',
                'The garden is full of colorful flowers in the spring.',
                'He grows roses and tulips in his flower garden.',
                'The flower emits a sweet fragrance.',
                'She pressed flowers in a book to preserve them.'
            ]
        },
        {
            id: 12,
            value: 'friend',
            definitions: [
                'a person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations'
            ],
            translations: [
                'друг',
                'ami',
                'Freund'
            ],
            examples: [
                'She\'s my best friend.',
                'He has many friends from different countries.',
                'We became friends in elementary school.',
                'They are longtime friends.',
                'She made a new friend at the party.'
            ]
        },
        {
            id: 13,
            value: 'beach',
            definitions: [
                'a pebbly or sandy shore, especially by the ocean between high- and low-water marks'
            ],
            translations: [
                'пляж',
                'plage',
                'Strand'
            ],
            examples: [
                'They enjoyed walking along the beach at sunset.',
                'The kids built sandcastles on the beach.',
                'We had a picnic on the beach.',
                'The beach is crowded with tourists in the summer.',
                'The beach stretches for miles along the coastline.'
            ]
        },
        {
            id: 14,
            value: 'language',
            definitions: [
                'the method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way'
            ],
            translations: [
                'язык',
                'langue',
                'Sprache'
            ],
            examples: [
                'Learning a new language opens doors to new opportunities.',
                'She speaks multiple languages fluently.',
                'Language is a key aspect of cultural identity.',
                'The book is translated into several languages.',
                'I want to improve my language skills.'
            ]
        },
        {
            id: 15,
            value: 'mountain',
            definitions: [
                'a large natural elevation of the earth\'s surface rising abruptly from the surrounding level; a large steep hill'
            ],
            translations: [
                'гора',
                'montagne',
                'Berg'
            ],
            examples: [
                'They climbed the mountain to reach the summit.',
                'The mountain range is covered in snow.',
                'The village is nestled at the foot of the mountain.',
                'We went hiking in the mountains last weekend.',
                'The mountain landscape is breathtaking.'
            ]
        },
        {
            id: 16,
            value: 'food',
            definitions: [
                'any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth'
            ],
            translations: [
                'еда',
                'nourriture',
                'Essen'
            ],
            examples: [
                'We enjoyed delicious food at the restaurant.',
                'He grows his own food in the garden.',
                'The food at the party was excellent.',
                'She likes to try new foods when traveling.',
                'The chef prepared a gourmet meal.'
            ]
        },
        {
            id: 17,
            value: 'city',
            definitions: [
                'a large town'
            ],
            translations: [
                'город',
                'ville',
                'Stadt'
            ],
            examples: [
                'New York City is known as "The Big Apple".',
                'She lives in a bustling city.',
                'The city skyline is impressive.',
                'We visited historical sites in the city.',
                'The city has a vibrant arts scene.'
            ]
        },
        {
            id: 18,
            value: 'game',
            definitions: [
                'a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck'
            ],
            translations: [
                'игра',
                'jeu',
                'Spiel'
            ],
            examples: [
                'We played a board game together.',
                'He enjoys playing video games in his free time.',
                'The team won the game with a last-minute goal.',
                'Let\'s organize a game of soccer this weekend.',
                'Playing games helps improve cognitive skills.'
            ]
        },
        {
            id: 19,
            value: 'school',
            definitions: [
                'an institution for educating children'
            ],
            translations: [
                'школа',
                'école',
                'Schule'
            ],
            examples: [
                'She teaches at a local elementary school.',
                'I attended the same school as my siblings.',
                'The school offers extracurricular activities.',
                'We visited the school during open house.',
                'His school has a modern campus.'
            ]
        },
        {
            id: 20,
            value: 'water',
            definitions: [
                'a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms'
            ],
            translations: [
                'вода',
                'eau',
                'Wasser'
            ],
            examples: [
                'They drank refreshing cold water after the hike.',
                'Water is essential for survival.',
                'The lake water is crystal clear.',
                'She filled a glass with water from the tap.',
                'We went swimming in the ocean water.'
            ]
        },
        {
            id: 21,
            value: 'friendship',
            definitions: [
                'the emotions or conduct of friends; the state of being friends'
            ],
            translations: [
                'дружба',
                'amitié',
                'Freundschaft'
            ],
            examples: [
                'Their friendship grew stronger over the years.',
                'She values friendship above all else.',
                'Friendship requires trust and mutual respect.',
                'We celebrated years of friendship with a party.',
                'They have a deep bond of friendship.'
            ]
        },
        {
            id: 22,
            value: 'phone',
            definitions: [
                'a device used for transmitting sound (typically speech) over distances'
            ],
            translations: [
                'телефон',
                'téléphone',
                'Telefon'
            ],
            examples: [
                'She answered the phone and spoke to her friend.',
                'I lost my phone and had to get a new one.',
                'The phone rang loudly in the middle of the meeting.',
                'He called her on the phone to apologize.',
                'She uses her phone to stay connected with family.'
            ]
        },
        {
            id: 23,
            value: 'money',
            definitions: [
                'a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively'
            ],
            translations: [
                'деньги',
                'argent',
                'Geld'
            ],
            examples: [
                'She saved up her money to buy a new bicycle.',
                'Money can\'t buy happiness.',
                'He donated money to a local charity.',
                'We budget our money carefully.',
                'The money was stolen from the safe.'
            ]
        },
        {
            id: 24,
            value: 'sky',
            definitions: [
                'the region of the atmosphere and outer space seen from the earth'
            ],
            translations: [
                'небо',
                'ciel',
                'Himmel'
            ],
            examples: [
                'The sky was clear and blue.',
                'She gazed at the stars in the night sky.',
                'Birds flew high in the sky.',
                'The sky darkened before the storm.',
                'The sunset painted the sky with vibrant colors.'
            ]
        },
        {
            id: 25,
            value: 'city',
            definitions: [
                'a large town'
            ],
            translations: [
                'город',
                'ville',
                'Stadt'
            ],
            examples: [
                'New York City is known as "The Big Apple".',
                'She lives in a bustling city.',
                'The city skyline is impressive.',
                'We visited historical sites in the city.',
                'The city has a vibrant arts scene.'
            ]
        },
        {
            id: 26,
            value: 'country',
            definitions: [
                'a nation with its own government, occupying a particular territory'
            ],
            translations: [
                'страна',
                'pays',
                'Land'
            ],
            examples: [
                'She traveled to a foreign country for vacation.',
                'Our country celebrates Independence Day in July.',
                'The country is known for its beautiful landscapes.',
                'He represents our country in international meetings.',
                'The country has a rich cultural heritage.'
            ]
        },
        {
            id: 27,
            value: 'family',
            definitions: [
                'a group consisting of parents and children living together in a household'
            ],
            translations: [
                'семья',
                'famille',
                'Familie'
            ],
            examples: [
                'They have a large family with four children.',
                'Family gatherings are important to them.',
                'She comes from a close-knit family.',
                'Family values shape our upbringing.',
                'The family went on a vacation together.'
            ]
        },
        {
            id: 28,
            value: 'game',
            definitions: [
                'a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck'
            ],
            translations: [
                'игра',
                'jeu',
                'Spiel'
            ],
            examples: [
                'We played a board game together.',
                'He enjoys playing video games in his free time.',
                'The team won the game with a last-minute goal.',
                'Let\'s organize a game of soccer this weekend.',
                'Playing games helps improve cognitive skills.'
            ]
        },
        {
            id: 29,
            value: 'movie',
            definitions: [
                'a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture'
            ],
            translations: [
                'фильм',
                'film',
                'Film'
            ],
            examples: [
                'They watched a great movie last night.',
                'The movie was directed by a famous filmmaker.',
                'We enjoy going to the movies on weekends.',
                'The movie received positive reviews from critics.',
                'She starred in a popular movie last year.'
            ]
        },
        {
            id: 30,
            value: 'sport',
            definitions: [
                'an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment'
            ],
            translations: [
                'спорт',
                'sport',
                'Sport'
            ],
            examples: [
                'He plays soccer and tennis as his favorite sports.',
                'Watching sports on TV is a popular pastime.',
                'She won a gold medal in the sports competition.',
                'The school promotes participation in sports.',
                'Sports contribute to a healthy lifestyle.'
            ]
        },
        {
            id: 31,
            value: 'water',
            definitions: [
                'a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms'
            ],
            translations: [
                'вода',
                'eau',
                'Wasser'
            ],
            examples: [
                'They drank refreshing cold water after the hike.',
                'Water is essential for survival.',
                'The lake water is crystal clear.',
                'She filled a glass with water from the tap.',
                'We went swimming in the ocean water.'
            ]
        },
        {
            id: 32,
            value: 'friendship',
            definitions: [
                'the emotions or conduct of friends; the state of being friends'
            ],
            translations: [
                'дружба',
                'amitié',
                'Freundschaft'
            ],
            examples: [
                'Their friendship grew stronger over the years.',
                'She values friendship above all else.',
                'Friendship requires trust and mutual respect.',
                'We celebrated years of friendship with a party.',
                'They have a deep bond of friendship.'
            ]
        },
        {
            id: 33,
            value: 'phone',
            definitions: [
                'a device used for transmitting sound (typically speech) over distances'
            ],
            translations: [
                'телефон',
                'téléphone',
                'Telefon'
            ],
            examples: [
                'She answered the phone and spoke to her friend.',
                'I lost my phone and had to get a new one.',
                'The phone rang loudly in the middle of the meeting.',
                'He called her on the phone to apologize.',
                'She uses her phone to stay connected with family.'
            ]
        },
        {
            id: 34,
            value: 'money',
            definitions: [
                'a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively'
            ],
            translations: [
                'деньги',
                'argent',
                'Geld'
            ],
            examples: [
                'She saved up her money to buy a new bicycle.',
                'Money can\'t buy happiness.',
                'He donated money to a local charity.',
                'We budget our money carefully.',
                'The money was stolen from the safe.'
            ]
        },
        {
            id: 35,
            value: 'sky',
            definitions: [
                'the region of the atmosphere and outer space seen from the earth'
            ],
            translations: [
                'небо',
                'ciel',
                'Himmel'
            ],
            examples: [
                'The sky was clear and blue.',
                'She gazed at the stars in the night sky.',
                'Birds flew high in the sky.',
                'The sky darkened before the storm.',
                'The sunset painted the sky with vibrant colors.'
            ]
        },
        {
            id: 36,
            value: 'city',
            definitions: [
                'a large town'
            ],
            translations: [
                'город',
                'ville',
                'Stadt'
            ],
            examples: [
                'New York City is known as "The Big Apple".',
                'She lives in a bustling city.',
                'The city skyline is impressive.',
                'We visited historical sites in the city.',
                'The city has a vibrant arts scene.'
            ]
        },
        {
            id: 37,
            value: 'country',
            definitions: [
                'a nation with its own government, occupying a particular territory'
            ],
            translations: [
                'страна',
                'pays',
                'Land'
            ],
            examples: [
                'She traveled to a foreign country for vacation.',
                'Our country celebrates Independence Day in July.',
                'The country is known for its beautiful landscapes.',
                'He represents our country in international meetings.',
                'The country has a rich cultural heritage.'
            ]
        },
        {
            id: 38,
            value: 'family',
            definitions: [
                'a group consisting of parents and children living together in a household'
            ],
            translations: [
                'семья',
                'famille',
                'Familie'
            ],
            examples: [
                'They have a large family with four children.',
                'Family gatherings are important to them.',
                'She comes from a close-knit family.',
                'Family values shape our upbringing.',
                'The family went on a vacation together.'
            ]
        },
        {
            id: 39,
            value: 'game',
            definitions: [
                'a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck'
            ],
            translations: [
                'игра',
                'jeu',
                'Spiel'
            ],
            examples: [
                'We played a board game together.',
                'He enjoys playing video games in his free time.',
                'The team won the game with a last-minute goal.',
                'Let\'s organize a game of soccer this weekend.',
                'Playing games helps improve cognitive skills.'
            ]
        },
        {
            id: 40,
            value: 'movie',
            definitions: [
                'a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture'
            ],
            translations: [
                'фильм',
                'film',
                'Film'
            ],
            examples: [
                'They watched a great movie last night.',
                'The movie was directed by a famous filmmaker.',
                'We enjoy going to the movies on weekends.',
                'The movie received positive reviews from critics.',
                'She starred in a popular movie last year.'
            ]
        },
        {
            id: 41,
            value: 'sport',
            definitions: [
                'an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment'
            ],
            translations: [
                'спорт',
                'sport',
                'Sport'
            ],
            examples: [
                'He plays soccer and tennis as his favorite sports.',
                'Watching sports on TV is a popular pastime.',
                'She won a gold medal in the sports competition.',
                'The school promotes participation in sports.',
                'Sports contribute to a healthy lifestyle.'
            ]
        }
    ],
    itemsCount: 41
};

export default function VocabularyPage() {
    const { title, itemsCount, items } = vocabulary;
    const vocabularyTitle = `${title} (${itemsCount})`;

    return (
        <Page className="Vocabulary">
            <Page.Content className="VocabularyPageContent">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="Vocabulary__header"
                >
                    <Checkbox
                        checked={false}
                        onChange={() => console.log('check')}
                    />

                    <Select
                        name='VocabularySelect'
                        className="Vocabulary__select"
                        defaultValue="my-vocabulary"
                        onChange={() => console.log('change select')}
                    >
                        <Select.Option value="my-vocabulary">{vocabularyTitle}</Select.Option>
                        <Select.Option value="course">Course vocabulary</Select.Option>
                        <Select.Option value="extra">Extra vocabulary</Select.Option>
                    </Select>

                    <InlineInput placeholder="Слово" className="Vocabulary__input" />
                    <InlineInput placeholder="Перевод" className="Vocabulary__input" />

                    <Button
                        content="Добавить слово"
                        onClick={() => console.log('Вы добавили слово')}
                    />
                </Stack>

                <List className="Vocabulary__body">
                    {items?.map(({ id, value, translations }) => <LeximaItem key={id} value={value} translations={translations} />)}
                </List>
            </Page.Content>
        </Page>
    );
}