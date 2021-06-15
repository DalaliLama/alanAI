intent(`(Navigate|Take|Go|Show me| to| app|application) usage`, p => {
        p.play({command: 'navigation', route: 'appstats'});
        p.play(`Navigating to Application Usage Stats`);
});
intent(`(Navigate|Take|Go|Show me| to|) FAQ`, p => {
        p.play({command: 'navigation', route: 'faq'});
        p.play(`Navigating to FAQ`);
});
intent(`(Navigate|Take|Go|Show me| to|) homescreen`, p => {
        p.play({command: 'navigation', route: 'home'});
        p.play(`Navigating back to home`);
});
intent(`(Take|Go me|) back`, p => {
        p.play({command: 'navigation', route: 'back'});
        p.play(`Going back`);
});