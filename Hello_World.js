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

// Try: "What is today", "What is tomorrow" and "What is next Friday".
// The '.value' field of this slot contains the user input, and the '.moment' field contains the moment.js object.

// But what to do if you need to have more than one predefined slot of the same type in the pattern?
// We have a solution for this case!
// When you use more than one slot of the same type, we automatically create an array containing the slot objects.
// This array will be named as the predefined slot appended by the '_' symbol.
// The same logic applies to user-defined slots.
// In patterns, the '_' symbol might be used as a pluralizer if added after a word. It means that this word might be used in both singular and plural forms.

// Just like in real world conversations, in voice scripts some user commands may have meaning only within a context.
// On the Alan Platform you can define such contexts (https://alan.app/docs/server-api/contexts#defining-contexts).
// After that you will add to them follows (https://alan.app/docs/server-api/contexts#follows), special commands available only when the context is active.

// There are two ways how a context can be activated.
// The first approach is to have an intent defined in the context.

const openContext = context(() => {
    intent('Activate the context', p => {
        p.play('The context is now active');
    });

    follow('Is the context active', p => {
        p.play('Yes. (It is active.|)');
    });
});

// Try: "Is the context active" -> "Activate the context" -> "Is the context active"
// Notice that the first time you will ask about the context being active Alan can't match your command.
// You can debug which commands are available by using the flowchart (press the expand button on the "map" widget in the bottom right corner).
// Active commands will have the white background, inactive - grey.

// Another way how you can activate a context is by using the then() function (https://alan.app/docs/server-api/contexts#activating-the-context-manually).

let chooseDrink = context(() => {
    follow('(I want|get me) a $(DRINK tea|cup of tea|soda)', p => {
        p.play(`You have ordered a ${p.DRINK.value}.`);
    })
});

intent('Can I have something to drink', p => {
    p.play('(Sure|Yes), we have tea and soda.');
    p.play('Which would you like?');
    p.then(chooseDrink);
});

// Try: "I want a cup of tea" -> "Can I have something to drink" -> "Get me a soda".
// Notice: the first command wasn't matched again. This is because the context with this command wasn't active.

// Contexts are very powerful tools at your disposal.
// You can even create a conversational chain of any depth you like.

let confirmOrder = context(() => {
    follow('Yes', p => {
        p.play('Your order is confirmed');
    });
    
    follow('No', p => {
        p.play('Your order is cancelled');
    });
});

let chooseDish = context(() => {
    follow('Get me a $(DISH pizza|burger)', p => {
        p.play(`You have ordered a ${p.DISH.value}. Do you confirm?`);
        p.then(confirmOrder);
    })
});

intent('What is on the menu', p => {
    p.play('We have pizza and burgers');
    p.then(chooseDish);
});

// Before trying the next set of commands make sure that the flowchart is expanded.
// Notice how different contexts are being activated one after another.
// Try: "Yes" or "Get me a pizza".
// Notice that they are unavailable.
// Try: "What is on the menu" -> "Get me a pizza" -> "Yes" or "No".

// Questions to help with script/app usage
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
    'Who (are|developed the|this developers| of| this| app|application)', p=>{
    p.play('AVA is developed by Vidya Rupak and Aryan Gupta')
    }
);
