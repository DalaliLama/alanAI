intent('Hello world', p => {
    p.play('Hi there');
});

intent(
    'Who\'s there',
    'What\'s your name',
    p => {
        p.play(
            'My name is Alan.',
            'It\'s Alan.',
        );
    },
);

// There are many predefined slots powered by our Named Entity Recognition (NER) system.
// For them, you don't need to define alternatives and instead you just define the type of the NER slot.
// Available types are DATE, TIME, NUMBER, ORDINAL, LOC, NAME.
//
// Some of them will have their own special fields to support logic applicable to this slot type.
// Such fields are:
// DATE - .date, .luxon, .moment
// NUMBER - .number
// TIME - .time
// ORDINAL - .number
//
// Learn more about predefined slots here: (https://alan.app/docs/server-api/slots#predefined-slots).
//
// Let's take the DATE predefined slot as an example.

intent('What is $(DATE)', p => {
    const formattedDate = p.DATE.moment.format('dddd, MMMM Do YYYY');

    p.play(`${p.DATE.value} is a date`);
    p.play(`It is ${formattedDate}`);
});

intent(
    'What is the name of this (app|script|project)',
    'What does this (app|script|project) do',
    'What is this (app|script|project|)',
    'Why do I need this', p=> {
    p.play('This is a Personal Assistant Mobile Application named AVA. Its main purpose is to make the daily tasks of user simpler!')}
);

intent(
    'How does this work',
    'How to use this',
    'What can I do here',
    'What (should I|can I|to) say',
    'What commands are available', p=> {
    p.play('You can ask queries related to Date, Time, News, Location and Weather.')}
);

intent(
    'Who (are|developed the|this|ava developers| of| this| app|application| )', p=>{
    p.play('AVA is developed by Vidya Rupak and Aryan Gupta')
    }
);
