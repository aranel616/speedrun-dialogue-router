import {Script} from "@sdr/engine";

export const script: Script = {
    // ============ Inherited decisions (set once at episode start) ============
    // Carry in from Episodes 1-2; constant for the whole path so occurrences
    // route consistently. In a full-game run these get driven by the prior
    // episode instead of being free.
    "start": {
        "choices": [
            {"name": "(Saved Kate)", "text": "", "set": {"name": "saved_kate", "type": "set", "value": true}, "next": "setup_suspended"},
            {"name": "(Didn't save Kate)", "text": "", "set": {"name": "saved_kate", "type": "set", "value": false}, "next": "setup_suspended"}
        ]
    },
    "setup_suspended": {
        "choices": [
            {"name": "(Blamed Nathan → Nathan suspended)", "text": "", "set": {"name": "suspended", "type": "set", "value": "nathan"}, "next": "setup_chloe3"},
            {"name": "(Blamed David → David on leave)", "text": "", "set": {"name": "suspended", "type": "set", "value": "david"}, "next": "setup_chloe3"},
            {"name": "(Blamed Jefferson → out of contest)", "text": "", "set": {"name": "suspended", "type": "set", "value": "jefferson"}, "next": "setup_chloe3"},
            {"name": "(Blame backfired → Max suspended)", "text": "", "set": {"name": "suspended", "type": "set", "value": "max"}, "next": "setup_chloe3"},
            {"name": "(No one suspended)", "text": "", "set": {"name": "suspended", "type": "set", "value": "none"}, "next": "setup_chloe3"}
        ]
    },
    "setup_chloe3": {
        "choices": [
            {"name": "(Took the blame for Chloe)", "text": "", "set": {"name": "intervened_for_chloe", "type": "set", "value": true}, "next": "setup_frank3"},
            {"name": "(Stayed hidden / blamed Chloe)", "text": "", "set": {"name": "intervened_for_chloe", "type": "set", "value": false}, "next": "setup_frank3"}
        ]
    },
    "setup_frank3": {
        "choices": [
            {"name": "(Shot at Frank)", "text": "", "set": {"name": "shot_at_frank", "type": "set", "value": true}, "next": "setup_warren3"},
            {"name": "(Didn't shoot at Frank)", "text": "", "set": {"name": "shot_at_frank", "type": "set", "value": false}, "next": "setup_warren3"}
        ]
    },
    "setup_warren3": {
        "choices": [
            {"name": "(Accepted Warren's invitation)", "text": "", "set": {"name": "accepted_warren_invite", "type": "set", "value": true}, "next": "dorm_maxroom"},
            {"name": "(Declined Warren's invitation)", "text": "", "set": {"name": "accepted_warren_invite", "type": "set", "value": false}, "next": "dorm_maxroom"}
        ]
    },

    // ===================== Girls' Dormitories (night) =====================
    "dorm_maxroom": {
        "text": [
            "Kate!",
            "I have something to show you",
            "meet me in front of campus",
            "get dat ass in gear NOW",
            "I knew Chloe would be all over this... So I better get moving."
        ],
        "next": "dorm_hallway"
    },
    "dorm_hallway": {
        "text": "Okay, this is scary dark. Let there be...",
        "next": "wells"
    },

    // ===================== Principal Wells (sneak past) =====================
    "wells": {
        "text": [
            "Principal Wells... Are you serious? I'm toast if he sees me...",
            "Ah, fuck it! I'm sitting my ass down. Nobody can expel me! Not yet, anyway..."
        ],
        "next": "wells_choice"
    },
    "wells_choice": {
        "choices": [
            {
                "name": "(Spotted while trying to sneak by)",
                "text": [
                    "Miss Caulfield, you have to be stealthier than that. You are not supposed to be outside your dormitory at this hour. You know that.",
                    "Great. So how do I get past him to meet Chloe?"
                ],
                "next": "wells_bridge"
            },
            {
                "name": "(Snuck past unseen)",
                "text": "",
                "next": "wells_bridge"
            }
        ]
    },
    "wells_bridge": {
        "text": "Max the Ninja strikes again!",
        "next": "campus_1"
    },

    // ===================== Main Campus =====================
    "campus_1": {
        "text": [
            "BOO-YAH!",
            "Get it? BOO-yah? Like I'm a scary punk ghost..."
        ],
        "next": "campus_2"
    },
    "campus_2": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "campus_2_saved"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "campus_2_notsaved"}
        ]
    },
    "campus_2_saved": {
        "text": [
            "More like a scary punk asshole. Hey, Chloe, I didn't exactly have the greatest day trying to keep my friend from jumping off the roof. I don't think I need you to prank me tonight, 'kay?",
            "Sorry, but you absolutely, balls-to-the-walls did save your friend!",
            "Kate saved herself. I couldn't even use my power...my head felt like it was being crushed...then I had NO clue what to say to her on that roof...",
            "Don't be so modest, rock star. Kate is alive because of YOU. You obviously said the right thing. And your badass power is gonna save us all! We just...need to connect the players.",
            "And find out who almost killed Kate."
        ],
        "next": "campus_3"
    },
    "campus_2_notsaved": {
        "text": [
            "More like a scary insensitive asshole. Chloe, I watched my friend jump off a roof today. I don't think you need to prank me tonight. You always trip out on me for not being there for YOU, but is this how you're there for me?",
            "I'm...I'm sorry, Max. I--I wasn't even thinking. I suck.",
            "I'm not trying to be a bitch, but...I'll NEVER get the image out of my head of Kate jumping off that roof... All because my power didn't work... It didn't mean shit.",
            "I know seeing Kate fall was horrible. I don't even know how to deal with that, so I just...act like an idiot. But it's YOUR badass power that's gonna bring all this to a close. We just need to connect the players.",
            "And find out who really killed Kate."
        ],
        "next": "campus_3"
    },
    "campus_3": {
        "text": [
            "We have to stop this from happening to anybody else.",
            "Oh, yeah, and somehow stop that tornado from wiping out Arcadia Bay...right?"
        ],
        "next": "campus_4"
    },
    "campus_4": {
        "choices": [
            {
                "name": "Don't joke.",
                "text": [
                    "Please don't joke about this, Chloe. Not right now.",
                    "Max, I'm not laughing at you. My old counselor told me that my sarcasm was a way of \"avoidance.\" That's why he's my ex-counselor."
                ],
                "next": "campus_5"
            },
            {
                "name": "I hope so.",
                "text": [
                    "I hope so, Chloe...but how? Snow and eclipse are bad omens.",
                    "This whole town is a bad omen. And notice that Blackwell seems to be ground zero?"
                ],
                "next": "campus_5"
            },
            {
                "name": "\"Chaos Theory.\"",
                "text": [
                    "Didn't you say that it was all about \"Chaos Theory\"? I don't see any control over this chaos...",
                    "Oh, right, except for your ability to--oh, yeah--manipulate time and space. No biggie."
                ],
                "next": "campus_5"
            }
        ]
    },
    "campus_5": {
        "text": "Chloe, I just feel weird about some of my decisions...",
        "next": "campus_6"
    },
    "campus_6": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "nathan", "node": "campus_6_nathan"},
            {"name": "suspended", "type": "eq", "value": "david", "node": "campus_6_david"},
            {"name": "suspended", "type": "eq", "value": "jefferson", "node": "campus_6_jefferson"},
            {"name": "suspended", "type": "eq", "value": "max", "node": "campus_6_max"},
            {"name": "suspended", "type": "eq", "value": "none", "node": "campus_6_none"}
        ]
    },
    "campus_6_nathan": {"text": "Especially after I just got Nathan expelled...", "next": "campus_7"},
    "campus_6_david": {"text": "Especially after I just got your step-bully suspended...", "next": "campus_7"},
    "campus_6_jefferson": {"text": "Especially after I just got Mr. Jefferson in trouble...", "next": "campus_7"},
    "campus_6_max": {"text": "I mean, I even got my own dumb ass suspended...", "next": "campus_7"},
    "campus_6_none": {"text": "Especially after I see the results... and then it's too late to rewind.", "next": "campus_7"},
    "campus_7": {
        "text": "Dude, do not even torture yourself like that. Let's focus on looking for clues, okay?",
        "next": "campus_8"
    },
    "campus_8": {
        "choices": [
            {
                "name": "About Kate.",
                "text": [
                    "Right. For one thing, there's too much coincidence between the people around Kate and Rachel.",
                    "Like step-prick and Nathan Prescott?"
                ],
                "next": "campus_8a"
            },
            {
                "name": "About Rachel.",
                "text": [
                    "We need to find out more about who Rachel was involved with around here.",
                    "She was able to blend in with everybody. Even with people I hated."
                ],
                "next": "campus_9"
            }
        ]
    },
    "campus_8a": {
        "choices": [
            {
                "name": "Of course.",
                "text": [
                    "Of course. They're both sociopaths.",
                    "More like psychopaths."
                ],
                "next": "campus_8a2"
            },
            {
                "name": "Not just them.",
                "text": [
                    "Not just them.",
                    "Yep... I just wanna beat the shit outta those particular bros..."
                ],
                "next": "campus_9"
            }
        ]
    },
    "campus_8a2": {
        "text": "",
        "next": [
            {"name": "intervened_for_chloe", "type": "eq", "value": true, "node": "campus_8a2_blame"},
            {"name": "intervened_for_chloe", "type": "eq", "value": false, "node": "campus_8a2_hidden"}
        ]
    },
    "campus_8a2_blame": {
        "text": "At least David doesn't try to beat down women like Nathan...",
        "next": "campus_9"
    },
    "campus_8a2_hidden": {
        "text": "The Blackwell security officer even hits his own stepdaughter...",
        "next": "campus_9"
    },
    "campus_9": {
        "text": [
            "And even though I don't know her, it feels like Rachel is guiding us to the truth...",
            "Fuck the truth, I just wanna find my friend right now... It scares me to think where she could be... Do you think she's...?"
        ],
        "next": "campus_10"
    },
    "campus_10": {
        "choices": [
            {
                "name": "Alive?",
                "text": [
                    "Alive? I HAVE to think that, Chloe. Her spirit is SO powerful here...",
                    "Maybe too much power..."
                ],
                "next": "campus_11"
            },
            {
                "name": "Dead?",
                "text": [
                    "Dead? I'm sorry. I hate even saying that, Chloe.",
                    "Not as much as I hate thinking it."
                ],
                "next": "campus_11"
            },
            {
                "name": "Kicking it.",
                "text": [
                    "Kicking it in Los Angeles? That would be the best-case scenario...",
                    "She wouldn't leave without me, okay? And how often do missing girls turn up?"
                ],
                "next": "campus_11"
            }
        ]
    },
    "campus_11": {
        "text": [
            "Max, we have to find Rachel soon. We have to...",
            "I promise you we will. Like you said, it's time to start the search for clues. Now tell me, what's your secret?",
            "Drum roll, please... I present the spare keys to Blackwell. Thank you, step-prick.",
            "You are such a boss, Chloe! I just...don't want you to get into any more trouble..."
        ],
        "next": "campus_12"
    },
    "campus_12": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "max", "node": "campus_12_susp"},
            {"name": "suspended", "type": "ne", "value": "max", "node": "campus_12_not"}
        ]
    },
    "campus_12_susp": {
        "text": "Look at all the trouble dropping in Arcadia Bay. At this point, who gives a fuck anymore? You're suspended anyway, Max. Lead the way.",
        "next": "campus_13"
    },
    "campus_12_not": {
        "text": "Look at all the trouble dropping in Arcadia Bay. At this point, who gives a fuck anymore? We're in it to win it, Max. Lead the way...",
        "next": "campus_13"
    },
    "campus_13": {
        "text": [
            "I'm so glad you're my partner in crime...",
            "As long as you're my partner in time.",
            "Insert groan here...",
            "Thank you again SO much for helping me put together a portfolio.",
            "Hopefully, the rest of the class will follow your lead. I'm sorry I was...distracted. As you know, it's not been a good day for Blackwell.",
            "I know this has been an awful day and you can talk to me anytime, Mr. Jefferson.",
            "Thank you, Victoria."
        ],
        "next": "campus_14"
    },
    "campus_14": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "campus_14_saved"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "campus_14_notsaved"}
        ]
    },
    "campus_14_saved": {
        "text": [
            "I'm glad it had a relatively happy ending.",
            "I don't know what I would've done if Katie jumped..."
        ],
        "next": "campus_15"
    },
    "campus_14_notsaved": {
        "text": [
            "I imagine...you're pretty upset over Kate as well...",
            "I'm, like, still in shock. I've never seen anybody die. I really cared about Katie."
        ],
        "next": "campus_15"
    },
    "campus_15": {
        "text": [
            "\"Katie\"? I...had no idea you two were that close. Did she...?",
            "Well...how does this affect the Everyday Heroes contest?"
        ],
        "next": "campus_16"
    },
    "campus_16": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "jefferson", "node": "campus_16_out"},
            {"name": "suspended", "type": "ne", "value": "jefferson", "node": "campus_16_in"}
        ]
    },
    "campus_16_out": {
        "text": "The contest will go on, I just won't be representing Blackwell at the event this year thanks to Max, who claims I enabled Kate Marsh's trouble by merely listening to her.",
        "next": "campus_17"
    },
    "campus_16_in": {
        "text": "It doesn't. The contest is still a-go and I still have to pick the winner to best represent Blackwell. I've got all the photos except one from...Max.",
        "next": "campus_17"
    },
    "campus_17": {
        "text": "I'll give you a one-word sneak preview of Max's photo: selfie. Listen...you've seen my entry, you know it's better than that. Wouldn't that be SO cool to hang out together in San Francisco, Mark?",
        "next": "campus_18"
    },
    "campus_18": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "jefferson", "node": "campus_18_out"},
            {"name": "suspended", "type": "ne", "value": "jefferson", "node": "campus_18_in"}
        ]
    },
    "campus_18_out": {
        "text": "Stick to Mr. Jefferson, Victoria. I won't be going to San Francisco, remember?",
        "next": "campus_19"
    },
    "campus_18_in": {
        "text": "Stick to Mr. Jefferson, Victoria, please? And, uh...I haven't picked a winner yet.",
        "next": "campus_19"
    },
    "campus_19": {
        "text": [
            "You already love my work, so it's not like you're playing favorites. Just imagine if you picked my photo, though...we would have to spend a LOT of time together... That could be...fun, don't you think?",
            "I'm going to think that you didn't say any of that.",
            "You might as well choose me...otherwise I might have to tell people you offered to choose my photo for favors or something...",
            "As a favor to your future, I'll also ignore that undisguised threat. This conversation is officially over, Miss Chase. I suggest you go back to your dorm now.",
            "Wait!",
            "I only...",
            "Are you fucking kidding me?",
            "So stupid...",
            "Just when I think Victoria can't get ANY more evil...",
            "Shit is about to get real at Blackwell...",
            "Let's go find out."
        ],
        "next": "hallway2_1"
    },

    // ===================== Hallway (break-in) =====================
    "hallway2_1": {
        "text": [
            "Chloe the Keymaster.",
            "You know it.",
            "Dude, I don't know about this...we're both already in SO much trouble..."
        ],
        "next": "hallway2_2"
    },
    "hallway2_2": {
        "text": "",
        "next": [
            {"name": "intervened_for_chloe", "type": "eq", "value": true, "node": "hallway2_2_blame"},
            {"name": "intervened_for_chloe", "type": "eq", "value": false, "node": "hallway2_2_hidden"}
        ]
    },
    "hallway2_2_blame": {
        "text": "Not to mention the weed you brought into my room. Joking.",
        "next": "hallway2_3"
    },
    "hallway2_2_hidden": {
        "text": "You can always let me get busted like you did with the weed.",
        "next": "hallway2_3"
    },
    "hallway2_3": {
        "text": [
            "I'm serious. We're not kids anymore. We're breaking and entering...",
            "If I have a key, how can it be breaking? They can't charge us for just entering!",
            "I'm serious. We could go to jail..."
        ],
        "next": "hallway2_4"
    },
    "hallway2_4": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "david", "node": "hallway2_4_leave"},
            {"name": "suspended", "type": "ne", "value": "david", "node": "hallway2_4_not"}
        ]
    },
    "hallway2_4_leave": {
        "text": "Not when Blackwell's ex-head of security is at home crying in his basement bunker...",
        "next": "hallway2_5"
    },
    "hallway2_4_not": {
        "text": "Not if I'm related to the head of Blackwell security. Step-shit will not want me in the hands of the local police...",
        "next": "hallway2_5"
    },
    "hallway2_5": {
        "text": "So we better find out what's in the principal's office first. You can rewind if we get caught, right? You have mad powers, Max.",
        "next": "hallway2_6"
    },
    "hallway2_6": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "hallway2_6_saved"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "hallway2_6_not"}
        ]
    },
    "hallway2_6_saved": {
        "text": "But my powers didn't save Kate... Maybe I did on my own...",
        "next": "hallway2_7"
    },
    "hallway2_6_not": {
        "text": "Tell that to Kate...",
        "next": "hallway2_7"
    },
    "hallway2_7": {
        "text": [
            "Come on. One more door and our work here is done.",
            "That's it! What the fuck? The security officer should have the key to the principal's office!",
            "He's hiding shit. Like EVERYBODY here.",
            "Well, now we definitely have to get this door open. Believe it or not, I know a little about lock-picking...thanks to Frank. I might as well test out my thief skill...",
            "Go for it. We're already in this deep...",
            "Well, you could look for the key...just in case.",
            "Why, yes, I could...",
            "No key for thee... We have to find another way in.",
            "Guess I didn't spend enough time with Frank... But I'll use my DIY lock-pick tools while you come up with a better plan.",
            "My plan has a name...",
            "Hey, Warren, you busy? Just bubble-hearth, you'll be okay. Listen, I need your physics expertise, stat. Without naming names, if somebody had access to the art and science labs and wanted to construct a device that would, say, open a locked door, would you maybe kinda know how? Huh? No...I'm just asking for fun. Thanks, Science Guy. Uh, n-no, no, no, stay. We need you as backup. Just send the text instructions NOW."
        ],
        "next": "hallway2_8"
    },
    "hallway2_8": {
        "text": "",
        "next": [
            {"name": "accepted_warren_invite", "type": "eq", "value": true, "node": "hallway2_8_acc"},
            {"name": "accepted_warren_invite", "type": "eq", "value": false, "node": "hallway2_8_dec"}
        ]
    },
    "hallway2_8_acc": {
        "text": "Yes, I'm still ALL-IN to \"Go Ape\" with you at the drive-in... Thanks for the help.",
        "next": "hallway2_9"
    },
    "hallway2_8_dec": {
        "text": "I'm sorry, I'm just not sure about a movie night right now. Don't hate me... And thanks for the help.",
        "next": "hallway2_9"
    },
    "hallway2_9": {
        "text": [
            "This sucks ass! Goddamn door!",
            "Try not to wake up everybody at Blackwell!",
            "Sorry, Max, I got nothin'. What about your plan?",
            "I'm gonna go put it together. Can you stay here and not get caught?",
            "I might get on the other side of that door before you, Lupin.",
            "The race is ON. See you soon.",
            "Warren is such a classic nerd. Let's see if I can find those items...",
            "Release the kra-can!",
            "It's all mine anyway...",
            "Only three more items to go!"
        ],
        "next": "sciencelab"
    },
    "sciencelab": {
        "text": [
            "Gross, I HATE that formalin smell...",
            "You deserve WAY more than this for taking on Nathan, but...every little grade counts...",
            "Ooh, sugar.",
            "You're halfway home, Max!"
        ],
        "next": "photolab"
    },
    "photolab": {
        "text": [
            "This is like a scene in a horror film...",
            "Take it easy on the door, Chloe. Let's try this instead. Boom! Literally.",
            "Yes! Time to blow shit up!",
            "If you'll light the candle...",
            "This is so cool!",
            "Get ready to haul ass.",
            "That...was so fucking cool!",
            "Oh, we are toast! Here comes the whole Arcadia Bay Fire and Police Department!",
            "Uh, so what should we do?",
            "If I can get this bastard open she can't cheat with her rewind... This is bullshit! Fuck you, door!"
        ],
        "next": "office"
    },
    "office": {
        "text": [
            "Welcome to my domain.",
            "You are magic! I have no clue how the hell you got in there, but you did it, sista!",
            "The company I keep... Now, let's find what we want and beat it. My powers only go so far.",
            "Man, I can see why the principal locks this room up. Fancy faux art crap. He must want everybody to know he has money...but no taste.",
            "How can you trust somebody who has a fucking bronze bird in his office? I'm glad I was expelled...",
            "Yes, if only the principal had a Monet or Picasso you'd still be at Blackwell...",
            "Eat me. I'm gonna pilfer the papers on this ugly-ass desk.",
            "Okay, sure, it's ugly, but damn, is it a cozy chair!",
            "This is your chance to truly get all deductive 'n' shit, Sherlock! Find us some clues about Rachel...or Kate...or Nathan...anybody!",
            "I'm on the case."
        ],
        "next": "pool_1"
    },

    // ===================== Swimming Pool =====================
    "pool_1": {
        "text": [
            "We're in the Otters' lair!",
            "Big fucking deal. I want that heated water!"
        ],
        "next": "pool_2"
    },
    "pool_2": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "max", "node": "pool_2_susp"},
            {"name": "suspended", "type": "ne", "value": "max", "node": "pool_2_not"}
        ]
    },
    "pool_2_susp": {"text": "We still have to play it cool, okay? Even if I'm suspended.", "next": "pool_3"},
    "pool_2_not": {"text": "We still have to play it cool, okay? I still go to school here.", "next": "pool_3"},
    "pool_3": {
        "text": [
            "You can own this hellhole once you figure out your rewind power...",
            "Chloe is so psyched for \"girls' night out\" so, I better follow her evil plan.",
            "Boys or girls?"
        ],
        "next": "pool_4"
    },
    "pool_4": {
        "choices": [
            {"name": "Boys' locker room.", "text": ["Boys, of course!", "Figures. Perv."], "next": "pool_5"},
            {"name": "Girls' locker room.", "text": ["Girls, of course!", "Girls? Ooh la-la..."], "next": "pool_5"}
        ]
    },
    "pool_5": {
        "text": [
            "Let me check to see if the pool's heated...",
            "Presto!",
            "Dude, it's getting old! Try and dazzle me with another trick!",
            "Better not try any Halloween pranks after today... I'm serious.",
            "Hello?",
            "Where are they?",
            "I heard something over here.",
            "Who's here?",
            "I got a flashlight and a stick!",
            "Anybody there?!",
            "Hey!",
            "We are so invisible!",
            "Let's bail!",
            "Wait, turn around, they're coming! We have to find another way out!",
            "This is bullshit. You can't go back to your dorm now, you're a Blackwell fugitive! Crash at my place tonight."
        ],
        "next": "pool_6"
    },
    "pool_6": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "david", "node": "pool_6_leave"},
            {"name": "suspended", "type": "ne", "value": "david", "node": "pool_6_not"}
        ]
    },
    "pool_6_leave": {"text": "You want me to crash where the Blackwell security officer I just busted lives, so I'll be safe? Okay!", "next": "pool_7"},
    "pool_6_not": {"text": "You want me to crash where the Blackwell security officer lives so I'll be safe? Okay!", "next": "pool_7"},
    "pool_7": {
        "text": [
            "Into the car!",
            "Get in!",
            "Hahaha! Later, fuckers! Max, you rock! We are so fucking awesome!",
            "Yes, we so are..."
        ],
        "next": "upstairs"
    },

    // ===================== Madsen Household - Upstairs =====================
    "upstairs": {
        "text": [
            "Photobomb!",
            "Photo-hog!",
            "It feels like a different world from yesterday...",
            "We left a skid mark on Blackwell last night.",
            "Like it needs another one. I'd like to do something good for my school and Arcadia Bay. I can't even submit my photo to represent... I just don't want to be rejected.",
            "Every great artist gets rejected before they get accepted. So you have to enter a photo.",
            "Even though I'm pimping the school and town you want to torch?",
            "Come on, I don't want to see Arcadia Bay burned to the shore, I just say shit like that because I've been trying to get out of here since—since you left, basically. If I could find Rachel, then pay Frank off, I'm still leaving to start a whole new life...",
            "Wish we could just hang out all morning like we used to... Maybe we should get up, I have to get back to Blackwell soon."
        ],
        "next": "upstairs_choice"
    },
    "upstairs_choice": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "max", "node": "upstairs_choice_susp"},
            {"name": "suspended", "type": "ne", "value": "max", "node": "upstairs_choice_not"}
        ]
    },
    "upstairs_choice_susp": {
        "text": [
            "No, you don't. You're suspended, criminal.",
            "Nobody suspended my homework. If I don't turn it in, the school will contact my folks again. And Max gets in more trouble."
        ],
        "next": "downstairs_1"
    },
    "upstairs_choice_not": {
        "text": [
            "Oh, does the schoolgirl have a test today?",
            "I'm starting to feel like going to Blackwell every day is a test. I just need to get on my regular school schedule again."
        ],
        "next": "downstairs_1"
    },

    // ===================== Downstairs (Joyce & David) =====================
    "downstairs_1": {
        "text": [
            "David, this is Officer Corn... Just wanted to let you know your stepdaughter's car was identified near the Blackwell campus last night around the time of the break-ins... Give me a call soon...",
            "What!? Are you in trouble again, Chloe? Don't you sleep?",
            "Message deleted.",
            "Good morning, Joyce...",
            "Rachel! Uh... I—I mean, Max... Whew, you startled me. You fit those clothes well. Thank God you're not a hellraiser like her or Chloe. Now tell me exactly what you want to chow on."
        ],
        "next": "downstairs_food"
    },
    "downstairs_food": {
        "choices": [
            {
                "name": "Pancakes.",
                "text": [
                    "I'm dying for some of your famous pancakes.",
                    "I thought you would have missed those. You ate more than William, and he loved them...",
                    "I remember. We would race each other to grab them from the stack.",
                    "So this time you can help me with the ingredients. I need you to grab me the eggs and milk.",
                    "Eggs and milk, no problemo.",
                    "\"The eggs always come first,\" as Joyce used to say...",
                    "Now for the mother's milk..."
                ],
                "next": "downstairs_3"
            },
            {
                "name": "Eggs and bacon.",
                "text": [
                    "Eggs and bacon all the way.",
                    "Remember when you guys would sleep in until I yelled out, \"Wakey wakey, eggs and bakey!\"",
                    "Totally. We'd wake up so fast.",
                    "So this time you can help me with the ingredients. I need you to grab me the actual eggs and the bacon.",
                    "I can handle eggs and bacon.",
                    "\"The eggs always come first,\" as Joyce used to say...",
                    "I should evolve and become a vegan but... Huh, bacon."
                ],
                "next": "downstairs_3"
            }
        ]
    },
    "downstairs_3": {
        "text": [
            "Thanks... After all these years and everything that's happened, it's great to see you and Chloe together again. She hasn't had a good friend since you or Rachel... Those clothes remind me so much of her. Such a sweet girl. I'm just hoping she's living large in L.A.",
            "I'd love to think that too, Joyce. But...",
            "We're on the same page, Max. I keep hoping that Rachel will show up or even send a message to Chloe from Hollywood... or wherever she is..."
        ],
        "next": "downstairs_rachel"
    },
    "downstairs_rachel": {
        "choices": [
            {
                "name": "Rachel in trouble.",
                "text": [
                    "I hate to even think this, much less say it out loud... but I think Rachel is in serious trouble.",
                    "I know. I watch those awful true crime shows and it makes me ill if I think about Rachel ending up on one... So I don't think too much.",
                    "I see why Chloe is so obsessed with finding her..."
                ],
                "next": "downstairs_4"
            },
            {
                "name": "Is Rachel okay?",
                "text": [
                    "Be honest, Joyce... do you think Rachel is okay?",
                    "God, I hope so. She was—is smart and she always landed on her feet. Maybe I don't know her as well as I thought... Maybe Chloe doesn't either.",
                    "Sometimes I feel like I don't know Chloe as well as I thought..."
                ],
                "next": "downstairs_4"
            },
            {
                "name": "Was Rachel mad at Chloe?",
                "text": [
                    "Is there any reason that Rachel might be mad at Chloe and left without her?",
                    "Chloe could piss everybody off but her. They were almost joined at the head. Reminded me of you and Chloe... But Rachel wasn't as grounded as you.",
                    "I'm grounded? Since when? Maybe that's why Chloe likes Rachel so much..."
                ],
                "next": "downstairs_4"
            }
        ]
    },
    "downstairs_4": {
        "text": "Max Caulfield, are you actually jealous of Rachel?",
        "next": "downstairs_jealous"
    },
    "downstairs_jealous": {
        "choices": [
            {
                "name": "Maybe.",
                "text": [
                    "Maybe. Rachel was so much cooler than me...",
                    "You think? Then why has Chloe been telling me she wishes she could be more like you over the past five years?",
                    "Doubt it. Uh... did she really? Five years ago feels like a thousand now..."
                ],
                "next": "downstairs_5"
            },
            {
                "name": "No way.",
                "text": [
                    "What? No way. I know I was selfish when I left. I'm glad Chloe found a better friend.",
                    "No, just a different one. Last time I saw you and Chloe in your pirate outfits I knew she would never find a better friend."
                ],
                "next": "downstairs_noway"
            }
        ]
    },
    "downstairs_noway": {
        "text": "",
        "next": [
            {"name": "intervened_for_chloe", "type": "eq", "value": true, "node": "downstairs_noway_blame"},
            {"name": "intervened_for_chloe", "type": "eq", "value": false, "node": "downstairs_noway_hidden"}
        ]
    },
    "downstairs_noway_hidden": {
        "text": [
            "I just wish you could have stopped Chloe from getting busted by David for that joint.",
            "I know..."
        ],
        "next": "downstairs_noway2"
    },
    "downstairs_noway_blame": {
        "text": [
            "And when you took the rap for that joint, you proved it.",
            "Thanks..."
        ],
        "next": "downstairs_noway2"
    },
    "downstairs_noway2": {
        "text": "But it seems like Chloe and me were pirates a thousand years ago...",
        "next": "downstairs_5"
    },
    "downstairs_5": {
        "text": [
            "And that makes me, what, a century old? You're only 18, Max. Ah, youth... if only I could go back...",
            "It's not all that, Joyce...",
            "Voila, a breakfast fit for us queens... and a king. Go sit at the table.",
            "Thank you so much, Joyce. I'm never leaving this table.",
            "Good. You can clean.",
            "Seeing you again... ahh, made me remember so much...",
            "I know these photos don't measure up to your work, Max...",
            "My favorite photographers probably take pictures similar to yours. You make David happy, Joyce.",
            "He wants us all to be happy, Max. He's just not great at showing it.",
            "Uhh, I don't think I can rock this outfit like Rachel...",
            "You have your own cool style.",
            "Wowser, I totally remember that day...",
            "I'm glad... William took this picture with his instant camera. It was the last picture he ever took... He had his car out right after this and—and...",
            "I know, Joyce. I'm sorry...",
            "I didn't show you this to be morbid. In fact, I want you to have this... This was when my baby was so full of life and light. She was hopeful, positive... everything she's not today. And this was the last time I ever saw Chloe truly happy.",
            "Did you guys have a bonding session about how fucked up I am?",
            "It's not always about you...",
            "Chloe, please. It's too early to start picking a fight. Eat instead.",
            "I'll keep the warden busy while you go peek in the garage.",
            "Now stop whispering or I'll know you're talking about me.",
            "Stop being so nosey, mother. Jeez, I can't do anything around here without everybody getting up in my shit...",
            "No one can even joke with you, Chloe, you fly off the handle like that...",
            "Excuse me, I have to use the bathroom.",
            "Sure, run off and pee when you should back me up.",
            "Now who's being paranoid? Just listen to yourself...",
            "Nobody else does!",
            "I do need to get into David's computer. He's gotta be hiding shit.",
            "No shit it needs a password... How about \"stepdouche\"... Try again! I need more clues...",
            "Joyce might as well have wrote \"Let's get married.\"",
            "That might be a useful password...",
            "Score! Max the Hacker strikes again!",
            "I better tell Chloe about this now... Just one more thing to make her sad. And mad.",
            "Nice breakfast.",
            "David, you're back already?"
        ],
        "next": "downstairs_david"
    },
    "downstairs_david": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "david", "node": "downstairs_david_leave"},
            {"name": "suspended", "type": "ne", "value": "david", "node": "downstairs_david_not"}
        ]
    },
    "downstairs_david_leave": {
        "text": [
            "That's what happens when you lose your job as head of Blackwell security.",
            "What happened?",
            "What you would expect to happen in this P.C. college bullshit age—the Principal takes the words of lying stoned students over a veteran and law professional.",
            "Ugh, again? This isn't the first time you've gotten in trouble there...",
            "Well, now it's the last time. I'll get a lawyer to sue their ass."
        ],
        "next": "downstairs_6"
    },
    "downstairs_david_not": {
        "text": [
            "I have to take a nap after writing up vandalism reports last night.",
            "What happened?",
            "Some little shitass punks broke in to the swimming pool. This is what happens at these P.C. bullshit colleges. Entitled students taking over the campus!",
            "Do you know for sure it was Blackwell students?",
            "Who else would do it? And I'm going to bust them."
        ],
        "next": "downstairs_6"
    },
    "downstairs_6": {
        "text": [
            "Figures you'd be here. Is that your Rachel Amber Halloween costume?",
            "You know more about her than me!"
        ],
        "next": "downstairs_david2"
    },
    "downstairs_david2": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "max", "node": "downstairs_david2_susp"},
            {"name": "suspended", "type": "ne", "value": "max", "node": "downstairs_david2_not"}
        ]
    },
    "downstairs_david2_susp": {"text": "Must be nice to be suspended and have some free time off Blackwell.", "next": "downstairs_david3"},
    "downstairs_david2_not": {"text": "No, you and Chloe think you know more than anybody. Like all teenagers.", "next": "downstairs_david3"},
    "downstairs_david3": {
        "text": "",
        "next": [
            {"name": "suspended", "type": "eq", "value": "david", "node": "downstairs_david3_leave"},
            {"name": "suspended", "type": "ne", "value": "david", "node": "downstairs_david3_not"}
        ]
    },
    "downstairs_david3_leave": {"text": "Leave Max alone, David. I can't believe you got fired—no, of course I can believe you got fired. Did you threaten some poor student with the stockade?", "next": "downstairs_7"},
    "downstairs_david3_not": {"text": "Leave Max alone, David. Stop threatening students.", "next": "downstairs_7"},
    "downstairs_7": {
        "text": [
            "He threatens them with surveillance cameras. So he can spy on everybody... like he spies on all of us here.",
            "Don't start, Chloe.",
            "Yeah, I'm just always starting shit, right? You're a total paranoid, David.",
            "Not now, Chloe.",
            "You used to call me a loser for getting kicked out of Blackwell... So who's the loser now, David? Who haven't you accused or harassed? Between your investigations into Rachel and Kate, what have you done besides get in trouble?"
        ],
        "next": "downstairs_side"
    },
    "downstairs_side": {
        "text": [
            "Listen, we don't know that David did anything and nobody has any proof against him. As far as we know, it's Nathan Prescott who's the real threat so far. I would cut David slack here...",
            "Oh would you? How generous, King Max. So suddenly it doesn't matter how shady David has been acting, or that he keeps all those weird files on your classmates, or how you're always going off on how creepy David—",
            "Enough! I don't want anybody being accused of anything. There's been too much of that crap going on around here lately and I don't want it in my home today.",
            "Well, I agree with that. Now if you all don't mind, I'd like to forget about work and sit down, and eat some of this incredible grub...",
            "I have to take a dump. Are you coming, Max?",
            "Maybe I went too easy on David for Joyce's sake..."
        ],
        "next": "diner_frank1"
    },

    // ===================== Two Whales Diner - Frank =====================
    "diner_frank1": {
        "text": "",
        "next": [
            {"name": "shot_at_frank", "type": "eq", "value": true, "node": "diner_frank1_shot"},
            {"name": "shot_at_frank", "type": "eq", "value": false, "node": "diner_frank1_not"}
        ]
    },
    "diner_frank1_shot": {
        "text": "You show up after almost shooting me? You have serious balls, little girl. But hanging out with Chloe, playing with guns and dressing like Rachel doesn't make you cool or tough. The fuck do you want?",
        "next": "diner_frank1b"
    },
    "diner_frank1_not": {
        "text": "You have serious balls, little girl. But hanging out with Chloe, playing with guns and dressing up like Rachel doesn't make you cool or tough. What the fuck do you want? Take a picture of me and I'll break your fucking camera.",
        "next": "diner_frank1b"
    },
    "diner_frank1b": {
        "text": "How do you know these are Rachel's clothes?",
        "next": "diner_frank1c"
    },
    "diner_frank1c": {
        "text": "",
        "next": [
            {"name": "shot_at_frank", "type": "eq", "value": true, "node": "diner_frank1c_shot"},
            {"name": "shot_at_frank", "type": "eq", "value": false, "node": "diner_frank1c_not"}
        ]
    },
    "diner_frank1c_shot": {"text": "Because she looks beautiful in them and you look like ass. Aiming a gun doesn't make you any sexier.", "next": "diner_frank1d"},
    "diner_frank1c_not": {"text": "Because she looks beautiful in them and you look like ass. You're lucky I just took that gun from you...", "next": "diner_frank1d"},
    "diner_frank1d": {
        "text": [
            "Grab your keys and let's check out your RV...",
            "Let's not. You fucking creep me out.",
            "In other words, Max, no keys. Maybe I could chat up that officer, or even Nathan, and then go all \"Groundhog Day\" on them until I get the info I need..."
        ],
        "next": "diner_frank2"
    },
    "diner_frank2": {
        "text": "What the fuck now?",
        "next": "diner_frank2_choice"
    },
    "diner_frank2_choice": {
        "choices": [
            {
                "name": "Rachel's Photo.",
                "text": [
                    "You know, I saw that photo Rachel gave you.",
                    "Uh... How d'you know about that, huh? Chloe, right?",
                    "She just told me that one of Rachel's favorite pictures was the one she did for you.",
                    "Really? Yeah, I mean that's what I thought. She was just a natural beauty, y'know. Wait—wait let me... lemme find it... here, judge for yourself."
                ],
                "next": "diner_frank2_keys"
            },
            {
                "name": "Saved dogs.",
                "text": [
                    "You act so scary, but... you did save all those dogs...",
                    "One, I'm not acting. Two, who told you about the dogs?",
                    "It's actually a great story. You're an animal lover. Could I pet the doggie? I could go grab him from your RV right now...",
                    "I won't even let you pick up the dog shit.",
                    "Besides, you don't want a leash—you want these keys right here. Look at your eyes dilate. You're worse than a junkie, Max. But no fix for you."
                ],
                "next": "diner_frank2_keys"
            }
        ]
    },
    "diner_frank2_keys": {
        "text": [
            "I'm afraid I'll have to take your keys now, asshole.",
            "You did not just do that...! Give me back my keys, bitch! Give me my keys now!",
            "Key brought, now back to Chloe.",
            "Are you shitting me?!"
        ],
        "next": "diner_alyssa"
    },
    "diner_alyssa": {
        "choices": [
            {"name": "(Warn Alyssa)", "text": ["Alyssa, watch out!", "Quick thinking, Max!"], "next": "rv_1"},
            {"name": "(Don't warn Alyssa)", "text": "I'd love to talk Max, but I'm drowning in puddle scum.", "next": "rv_1"}
        ]
    },

    // ===================== Frank's RV =====================
    "rv_1": {
        "text": [
            "Damn, and I thought my room was a shithole.",
            "You're not a creepy drug dealer.",
            "Frank has issues, but he's not creepy... At least I didn't think so until I saw him with Rachel's bracelet.",
            "Oh, we could cruise everywhere in this bad boy. Can you see us heading down the coast to Big Sur and beyond?"
        ],
        "next": "rv_kiss"
    },
    "rv_kiss": {
        "choices": [
            {
                "name": "(Kissed Chloe)",
                "text": [
                    "Yes, we'd be tearing up the highway.",
                    "And you'd probably want me to kiss you again...",
                    "Chloe, we're on a schedule. We need clues about Rachel."
                ],
                "next": "rv_2"
            },
            {
                "name": "(Didn't kiss Chloe)",
                "text": [
                    "Yes, we'd be tearing up the highway.",
                    "And you'd dare me to drive it like you dared me to kiss you...",
                    "Chloe, we're on a schedule. We need clues about Rachel."
                ],
                "next": "rv_2"
            }
        ]
    },
    "rv_2": {
        "text": [
            "I know. Just daydreaming.",
            "You scope the area while I hack his computer for info.",
            "Frank is almost a made-for-TV hoarder. This place is nasty.",
            "Crappy wi-fi out here. Must take him days to download porn.",
            "Yuck.",
            "Whoa, what the hell is he doing with that dog...",
            "Stop it.",
            "I cannot believe he would wear a collar and a furry mask...",
            "You're dumb!",
            "Max, you didn't tell me you took photos of Frank in action...",
            "I'm seriously ignoring you."
        ],
        "next": "rv_gun"
    },
    "rv_gun": {
        "choices": [
            {
                "name": "LEAVE THE GUN",
                "text": "I might regret this, but I can't let Chloe hurt someone...or get hurt.",
                "next": "rv_3"
            },
            {
                "name": "GIVE THE GUN TO CHLOE",
                "text": [
                    "I have a terrible present for you...",
                    "An ounce of dank bud?",
                    "Oh you so rule, Max. Thank you. I feel so much better now.",
                    "You better bring it back to David right away.",
                    "Yeah, sure, I'm on it.",
                    "I might regret this, but I can't let Frank hurt someone..."
                ],
                "next": "rv_3"
            },
            {
                "name": "(Frank doesn't have the gun)",
                "text": "",
                "next": "rv_3"
            }
        ]
    },
    "rv_3": {
        "text": [
            "Okay, this vent is loose. I need something to pry it open...",
            "This is almost as good as a set of keys.",
            "My blade will open any portal!",
            "Oh man, Rachel and Frank's dog...",
            "I don't know if I should be touched or disturbed...",
            "I'm glad Rachel got to drive this beast. She looks genuinely happy.",
            "Rachel really did hang out with Frank.",
            "I'm learning more about Rachel than I want to know...",
            "Hmm, trouble in paradise.",
            "It makes me ill that Rachel posed like this for Frank... or wrote him love letters... I can't believe she was banging Frank! Rachel straight up lied to my face! Why didn't she say anything?",
            "Because she knew how you would react.",
            "Then she wasn't much of a friend, huh? Just another person who shits all over me. Why does everybody in my life let me down? My dad gets killed, you bail on me for years, my mother gloms onto step-fucker... now Rachel betrays me...",
            "Chloe, Rachel is missing. Nobody betrayed you."
        ],
        "next": "rv_side"
    },
    "rv_side": {
        "choices": [
            {"name": "(Sided with Chloe)", "text": "Bullshit, who hasn't?! Fuck everybody!", "next": "truck_1_intro"},
            {"name": "(Sided with David)", "text": "Bullshit. You totally defended step-stalker! Fuck everybody!", "next": "truck_1_intro"}
        ]
    },

    // ===================== Chloe's Truck =====================
    "truck_1_intro": {
        "text": [
            "Chloe!",
            "Chloe, you can't keep blaming me and everybody for everything wrong in your life. It's so not fair.",
            "I gotta blame somebody. Otherwise it's all my fault. Fuck that."
        ],
        "next": "truck_1"
    },
    "truck_1": {
        "choices": [
            {
                "name": "Grow up.",
                "text": [
                    "Grow up! God, you're not the only one in Arcadia Bay with problems! Kate Marsh almost...",
                    "Yes, Kate Marsh ALMOST killed herself. Such sad, okay?! That doesn't make me feel any better about my fucked-up life, get it?"
                ],
                "next": "truck_2"
            },
            {
                "name": "Nobody's fault.",
                "text": [
                    "It's just life, shit happens, it's nobody's fault, \"blah, blah, blah\", as Mr. Jefferson would say.",
                    "And Kate Marsh...",
                    "Yes, Kate Marsh ALMOST killed herself. Such sad, okay?! That doesn't make me feel any better about my fucked-up life, get it?"
                ],
                "next": "truck_2"
            },
            {
                "name": "Rachel and Frank.",
                "text": [
                    "So now it's Rachel's fault, too?",
                    "Jesus, she was banging that pig Frank! Bitch LIED to my FACE, Max! I can't trust anybody again. Everybody pretends to care until they don't. Even you.",
                    "Chloe Price, you better take that back. Right now.",
                    "Okay, fine... But you just don't understand. It's like I'm being punished by the universe..."
                ],
                "next": "truck_2"
            }
        ]
    },
    "truck_2": {
        "text": [
            "So who do you most want to blame?",
            "My fucking dad of course... hello!?"
        ],
        "next": "truck_blame"
    },
    "truck_blame": {
        "choices": [
            {
                "name": "William?",
                "text": [
                    "You blame William? Really?",
                    "Yes, I do. Damn right. He CHOSE to go out that door and leave me forever."
                ],
                "next": "truck_3"
            },
            {
                "name": "David?",
                "text": [
                    "You blame David?",
                    "I said \"my dad\"! My real father, who got himself killed for nothing! Not that human placeholder for Joyce."
                ],
                "next": "truck_3"
            }
        ]
    },
    "truck_3": {
        "text": [
            "Chloe, your dad didn't \"choose\" to...leave you.",
            "I know that, Max! My mom actually blames herself...just because she wanted a ride home from work. Sometimes...even I blame her.",
            "No, you don't.",
            "Yes, Max, I do. Do you know what it's like to wait for your father to come home when you're a kid...and he never does?",
            "No, of course not. But I was with you that day, it was just a terrible accident!",
            "I wish that made me feel better. But ever since he died, my life has been dipped in shit."
        ],
        "next": "truck_belief"
    },
    "truck_belief": {
        "choices": [
            {
                "name": "You're still here.",
                "text": [
                    "You don't want to hear this, but you're still here. Alive. With me. And that is no accident.",
                    "You're right. I don't wanna hear this."
                ],
                "next": "truck_4"
            },
            {
                "name": "I can tell.",
                "text": [
                    "I can tell... But look at everything that's happened the past week. Your life has changed mine and that's not shit.",
                    "I'd really love to believe that... I'd like to believe in something after what's happened..."
                ],
                "next": "truck_4"
            }
        ]
    },
    "truck_4": {
        "text": "Chloe, I can't do this out on my own. I NEED you with me. And Rachel needs you...",
        "next": "maxroom2"
    },

    // ===================== Max's Room (the photo) =====================
    "maxroom2": {
        "text": [
            "Get a close-up of Max!",
            "Knock it off, Chloe!",
            "Oh, my god. What is happening now?",
            "Yes, girls. Time for a picture.",
            "Cheesecake!",
            "Come on now, say \"pancake\"!",
            "I can't even see!"
        ],
        "next": "focus_1"
    },

    // ===================== 2008 Flashback (Chloe's House - Focus) =====================
    "focus_1": {
        "text": [
            "Someday Dad'll get one of them newfangled computers.",
            "I hope the flash didn't scare you, Max. This is a keeper.",
            "Not until I see it first! You know the rules, Dad! Max, tell him... Whoa, hey, you look totally pale. Are you okay?",
            "Yeah, I just... Uh...yeah, I'm fine...",
            "Okay, Chloe, give me the thumbs-up or thumbs-down...",
            "Well, I might just allow this one into the family album...",
            "You're the boss.",
            "But not the cook? Hint hint, daddy.",
            "Yes, we can't expect your mother to rush home and serve us slackers. Who wants to help me make crêpes?",
            "Now, what is this? William is here! And Chloe is just a kid... Am I that far back in time?",
            "You mean pancakes?",
            "In France they call them crêpes. And a good French chef needs his assistants. If you want to eat breakfast.",
            "I'm 18 years old inside my 13-year-old self... How?",
            "Oui. I volunteer to break the eggs!",
            "Do you remember how many eggs?",
            "Mom said it depends.",
            "That's true.",
            "So, how many eggs?",
            "Don't you dare question the chef.",
            "Right, like you're the real cook here.",
            "I am when your mom's away.",
            "I'll let her know that."
        ],
        "next": "focus_phone"
    },
    "focus_phone": {
        "choices": [
            {
                "name": "(Max didn't unplug the phone)",
                "text": "Hello? Hey, honey! Just making a fabulous breakfast with Chloe and Max. We're all going to work at the Two Whales... What? Oh, I didn't know you had to get groceries. Of course I'll come pick you up. Now I'll have an excuse to get a mocha. Be there shortly. Love you...",
                "next": "focus_2"
            },
            {
                "name": "(Max unplugged the phone)",
                "text": "Hey, honey! I have no idea why the home phone didn't ring just now. I'm just making a fabulous breakfast with Chloe and Max. We're all going to work at the Two Whales... What? Oh, I didn't know you had to get groceries. Of course I'll come pick you up. Now I'll have an excuse to get a mocha. Be there shortly. Love you.",
                "next": "focus_2"
            }
        ]
    },
    "focus_2": {
        "text": [
            "I have to stop William from taking his car today.",
            "Excuse me, ladies, I have to go rescue yonder queen at the Sav-Mart. She doth have many bags of delicious grub for us to feast upon.",
            "You are ridiculous.",
            "You'll be grateful for that someday. Shit, where are my keys?",
            "That's a dollar for the swear jar!",
            "You mean your college fund! Keys, please..."
        ],
        "next": "focus_keys"
    },
    "focus_keys": {
        "choices": [
            {
                "name": "(Don't take the keys — William drives)",
                "text": "Aha! You can't hide from me forever! Now lock up after I leave, play nice, try not to destroy too much of the house.",
                "next": "focus_keys"
            },
            {
                "name": "(Take the keys)",
                "text": [
                    "Score!",
                    "Shit, where are those keys?",
                    "Another dollar for the swear jar!",
                    "You're bankrupting me!"
                ],
                "next": "focus_hide"
            }
        ]
    },
    "focus_hide": {
        "choices": [
            {
                "name": "(Don't hide them — beeper finds them)",
                "text": [
                    "Max, this is not the best time for a prank. Keys, please.",
                    "Uh, I was just—um, are you sure Joyce is ready? Uh, let's just—let's just wait... I, um... Sorry. Here...",
                    "I'll get you back someday."
                ],
                "next": "focus_hide"
            },
            {
                "name": "(Hide them unsuccessfully — beeper finds them)",
                "text": "I knew this thing would come in handy... How did my keys get in here?",
                "next": "focus_hide"
            },
            {
                "name": "(Hide them successfully — window, sink, or back door)",
                "text": [
                    "I know I had those keys right here... I know it... Forgot all about you, little buddy... Release the keys! Of course. Last time I order from SpyGuy Electronics...",
                    "You can take the bus, right? The stop is right down the street!",
                    "This I can do. Good call, Max.",
                    "Oh, yeah, the bus is great! It comes every 15 minutes and there'll be plenty of room for you and Joyce and groceries and it'll save the environment...",
                    "You sold me already. I'm off to yonder bus stop. Joyce will love this.",
                    "Max, you are being so fucking strange. You feel okay?",
                    "Chloe, I am...awesome! We are awesome!"
                ],
                "next": "epilogue"
            }
        ]
    },

    // ===================== Epilogue (alternate timeline) =====================
    "epilogue": {
        "text": [
            "You are such a ho-bag. I knew you'd hook up with that loser.",
            "I'm not paying 150 dollars for a concert.",
            "I heard that the Vortex Club parties are wild.",
            "Dude, the service fee is like 50 percent—",
            "So that's why she was laughing so hard.",
            "All my friends in LA told me that Oregon was gonna be wet and cold every day, but it's like 75 degrees and I haven't seen the rain once since I got here. Is that climate change?",
            "No, it's people in Oregon trying to keep Californians out.",
            "Helloooo? Are you even listening, Maxine?",
            "Max, never Maxine.",
            "I know, sorry, Mad Max. You're not pissed at me, right? Right? Do you wanna go hit the girls' potty and smoke 'em peace pipe?",
            "I think Max is high...",
            "She's acting, like, so weird... You cool, Max?",
            "Nobody listened when I said we shouldn't let her in the Vortex...",
            "Courtney, you don't want anybody in the club.",
            "Like, whatever, bitch.",
            "Warren... He hooked up with Stella?",
            "Oh, no...this is totally fucked up! What else have I changed? Chloe!",
            "Max Caulfield! Taking a break after taking Seattle by storm, huh? Hm... We thought we'd never see you after you left for the big city.",
            "No... I'd never do that to Chloe.",
            "Speaking of...I know she's been dying to see you. Hold on.",
            "Chloe! You have a visitor!"
        ]
    }
};
