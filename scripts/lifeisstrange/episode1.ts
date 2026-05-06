import { Script } from "../../types";

export const script:Script = {
    "start": {
        "choices": [
            {
                "name": "You're asking me?",
                "text": "You're asking me? Let me think... Um...",
                "next": "jefferson_1"
            },
            {
                "name": "I did know...",
                "text": "I did know! ...But I kinda forgot.",
                "next": "jefferson_1"
            }
        ]
    },
    "jefferson_1": {
        "choices": [
            {
                "name": "(Max initiates the conversation)",
                "text": [
                    "Excuse me, Mr. Jefferson, can I talk to you for a moment?",
                    "Yes, excuse you.",
                    "No, Victoria, excuse us."
                ],
                "next": "jefferson_2"
            },
            {
                "name": "(Max tries to leave)",
                "text": [
                    "I see you, Max Caulfield. Don't even think about leaving here until we talk about your entry.",
                ],
                "next": "jefferson_2"
            }
        ]
    },
    "jefferson_2": {
        "choices": [
            {
                "name": "Do I have to?",
                "text": "Do I have to? I just don't think it's that big a deal.",
                "next": "jefferson_3"
            },
            {
                "name": "I didn't have any time...",
                "text": "I didn't have any time... Way too much homework.",
                "next": "jefferson_3"
            }
        ]
    },
    "jefferson_3": {
        "choices": [
            {
                "name": "I feel sick.",
                "text": "I'm sorry, I feel sick. May I be excused?",
                "next": "jefferson_4"
            },
            {
                "name": "I have to use the bathroom.",
                "text": "I'm sorry, but I really have to use the bathroom.",
                "next": "jefferson_4"
            }
        ]
    },
    "jefferson_4": {
        "choices": [
            {
                "name": "(Max initiates the conversation)",
                "text": [
                    "Excuse me, Mr. Jefferson, can I talk to you for a moment?",
                    "Yes, excuse you.",
                    "No, Victoria, excuse us."
                ],
                "next": "jefferson_5"
            },
            {
                "name": "(Max tries to leave)",
                "text": [
                    "I see you, Max Caulfield. Don't even think about leaving here until we talk about your entry.",
                ],
                "next": "jefferson_5"
            }
        ]
    },
    "jefferson_5": {
        "choices": [
            {
                "name": "I'm not avoiding.",
                "text": [
                    "I'm not avoiding, just...",
                    "Biding time, waiting for the elusive 'right moment'?",
                    "Exactly."
                ],
                "next": "wells_1"
            },
            {
                "name": "Not sure if I have one.",
                "text": [
                    "Uh, yeah. I'm not sure I have one.",
                    "Given your selfie output, I'm sure you must have about a thousand pics by now?",
                    "It'll take a long time to find a good one."
                ],
                "next": "wells_1"
            }
        ]
    },
    "wells_1": {
        "choices": [
            {
                "name": "REPORT NATHAN",
                "text": [
                    "I just saw Nathan Prescott waving a gun around...in the girls' room.",
                    "Nathan Prescott. You sure?",
                    "Yes. He was in the bathroom talking to himself with a gun. I saw everything! He was babbling like crazy—",
                    "Okay, slow down, slow down. So now you saw this... Without him seeing you?",
                    "I was hiding behind a stall. I have the right to be there. It's the girls' room—",
                    "I know, I know. I just want to be completely clear what happened. Mr. Prescott happens to be from the town's most distinguished family. And one of Blackwell's most honored students. So it's hard for me to see him brandishing a weapon in the girls' bathroom. So what happened next?",
                    "Then...then he left. I ran out here wondering what to do. Are you going to bust him?",
                    "This is a serious charge. I'll look into the matter personally. Thank you for bringing it to my attention.",
                    "That's it? After what I told you—",
                    "We'll continue this discussion, later, in my office. Please go outside with the rest of your class now, Miss Caulfield."
                ],
                "set": {
                    "name": "reported_nathan",
                    "type": "set",
                    "value": true
                },
                "next": "victoria_1"
            },
            {
                "name": "HIDE THE TRUTH",
                "text": [
                    "I just got sick in class... Um, female trouble—",
                    "Except you're wandering around like a zombie. And do you think it's the first time a student has used that line on me?",
                    "It's the truth. I felt dizzy in Mr. Jefferson's class—",
                    "Just tell me what you're hiding. You can trust me.",
                    "There's nothing to hide. I got sick. It happens, you know—",
                    "There's that teen 'tude again. You know, I've heard enough. Don't think I don't know what goes on around here. You've only been here for three weeks and you're already causing conflict. I don't think your parents will approve when they find out. Now get outside with the class. Please."
                ],
                "set": {
                    "name": "reported_nathan",
                    "type": "set",
                    "value": false
                },
                "next": "victoria_1"
            }
        ]
    },
    "victoria_1": {
        "choices": [
            {
                "name": "MAKE FUN OF",
                "text": [
                    "Don't... don't say a word, Max.",
                    "Oh, wait, hold that pose! And no filter needed before I post this. Now please move. I've had a messed up day and I'm going to my room.",
                    "You do that... I know where you live... So does Nathan..."
                ],
                "set": {
                    "name": "made_fun_of_victoria",
                    "type": "set",
                    "value": true
                },
                "next": "juliet_1"
            },
            {
                "name": "COMFORT",
                "text": [
                    "I am sorry. That's an awesome cashmere coat...",
                    "It was. But there will be another.",
                    "Well, you always seem to know how to pick the right outfits.",
                    "I do have some talent. Mr. Jefferson told me-",
                    "I've seen your pictures. You have a great eye. Richard Avedon-esque.",
                    "He's one of my heroes... Thanks, Max. I hope those sluts get me a towel before they hang a sign on me. You deserve a better shot. Sorry about blocking you and... and the 'go fuck your selfie'.",
                    "That was mean... but pretty funny.",
                    "Just one of those days, you know?",
                    "I know exactly what you mean, Victoria. I'll see you later.",
                    "Au revior."
                ],
                "set": {
                    "name": "made_fun_of_victoria",
                    "type": "set",
                    "value": false
                },
                "next": "juliet_1"
            }
        ]
    },
    "juliet_1": {
        "choices": [
            {
                "name": "What did she do?",
                "text": [
                    "What did she do?",
                    "What didn't she do? Dana's been sexting with my boyfriend.",
                    "Ouch. How did you find out?",
                    "Uh, why do you care? Why are you even asking me? You never talk, just zone out with your camera.",
                    "That's why I'm talking to you now.",
                    "What's my last name?"
                ],
                "next": "juliet_2"
            },
            {
                "name": "She's your friend.",
                "text": [
                    "She's your friend.",
                    "Friends don't sext with their best friend's boyfriend...",
                    "No, probably not... How did you find out?",
                    "Uh, why do you care? Why are you even asking me? You never talk, just zone out with your camera.",
                    "That's why I'm talking to you now.",
                    "What's my last name?"
                ],
                "next": "juliet_2"
            }
        ]
    },
    "juliet_2": {
        "choices": [
            {
                "name": "Juliet Patson.",
                "text": [
                    "Juliet Pats...Juliet Patson.",
                    "That was truly sad. Thanks for your concern, \"Max Caulfield\". By the way, Juliet Watson."
                ],
                "next": "juliet_2"
            },
            {
                "name": "Juliet Mason.",
                "text": [
                    "Uh. Juliet...Mason.",
                    "That was truly sad. Thanks for your concern, \"Max Caulfield\". By the way, Juliet Watson."
                ],
                "next": "juliet_2"
            },
            {
                "name": "Juliet Olson.",
                "text": [
                    "Juliet...Juliet...Olson.",
                    "That was truly sad. Thanks for your concern, \"Max Caulfield\". By the way, Juliet Watson."
                ],
                "next": "juliet_2"
            },
            {
                "name": "Juliet Watson.",
                "text": [
                    "Juliet Watson. Duh!",
                    "I'm flattered. I didn't even think you knew my name at all.",
                    "Of course I do. Just because I don't talk a lot doesn't mean I don't care. So, how did you find out about them?",
                    "According to Victoria, Dana would do anything to date a quarterback.",
                    "According to Victoria? Oh...",
                    "She saw the sext. And Zachary won't answer his phone. Once Dana admits it, she can go. Straight to hell."
                ],
                "next": "kate_1"
            }
        ]
    },
    "kate_1": {
        "choices": [
            {
                "name": "TAKE A PHOTO",
                "text": [
                    "...you can't fool me. I know everything about this school. I cover the waterfront. So you better figure out what side you're on...",
                    "Please, leave me alone!",
                    "Hope you enjoyed the show. Thanks for nothing, Max."
                ],
                "set": {
                    "name": "took_photo_of_kate",
                    "type": "set",
                    "value": true
                },
                "next": [
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": true,
                        "node": "warren_made_fun_of_victoria_1"
                    },
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": false,
                        "node": "warren_made_fun_of_victoria_1"
                    }
                ]
            },
            {
                "name": "INTERVENE",
                "text": [
                    "Hey, why don't you leave her alone?",
                    "Excuse us, this is official campus business—",
                    "Excuse me, you shouldn't be yelling at students. Or bullying them.",
                    "Hey, hey, nobody is bullying anybody. I'm doing my job.",
                    "No, you're not.",
                    "You're part of the problem, missy. I will remember this conversation.",
                    "Oh, Max, that was great. I think you scared him for once... I have to go, but thank you. It means a lot.",
                    "Anytime, Kate."
                ],
                "set": {
                    "name": "took_photo_of_kate",
                    "type": "set",
                    "value": true
                },
                "next": [
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": true,
                        "node": "warren_made_fun_of_victoria_1"
                    },
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": false,
                        "node": "warren_made_fun_of_victoria_1"
                    }
                ]
            }
        ]
    },
    "warren_made_fun_of_victoria_1": {
        "text": "Man, I saw that Victoria didn't take down that pic of you on Facebook... Major bitch move.",
        "next": "warren_made_fun_of_victoria_2"
    },
    "warren_made_fun_of_victoria_2": {
        "choices": [
            {
                "name": "No worries.",
                "text": [
                    "No worries, Warren. I took a sweet shot of Victoria I can't wait to share...",
                    "Oh, score one for Team Max! It will be so karmic to see her ass clown face all over the interwebs...",
                    "I guess she does deserve it for all the shitty things she's done to people here."
                ],
                "next": "warren_1"
            },
            {
                "name": "I don't want to talk.",
                "text": [
                    "I don't want to talk about it.",
                    "Geez, you're Little Miss Sensitive today...",
                    "I wouldn't push your luck, Warren. Not in the mood today."
                ],
                "next": "warren_1"
            }
        ]
    },
    "warren_comforted_victoria_1": {
        "text": "I bet. I heard Victoria got a faceful of paint... I'd pay money to see a photo of that...",
        "next": "warren_comforted_victoria_2"
    },
    "warren_comforted_victoria_2": {
        "choices": [
            {
                "name": "Really?",
                "text": [
                    "Really? I wish I would have known...",
                    "You probably could have raised a Kickstarter fund just for that one image of her covered in paint.",
                    "Had I known that... Anyway, Victoria took down my photo. So that drama ended well."
                ],
                "next": "warren_1"
            },
            {
                "name": "I don't want to talk.",
                "text": [
                    "I don't want to talk about it.",
                    "Geez, you're Little Miss Sensitive today...",
                    "I wouldn't push your luck, Warren. Not in the mood today."
                ],
                "next": "warren_1"
            }
        ]
    },
    "warren_1": {
        "choices": [
            {
                "name": "Yeah, thanks.",
                "text": [
                    "Yeah, thanks. You had some cool shit on there, from Akira to Twilight Zone. Which seems apropos today...",
                    "I consider myself a pop...cultural pirate connoisseur.",
                    "That does sound better than 'thief'."
                ],
                "next": "warren_2"
            },
            {
                "name": "I've been busy.",
                "text": [
                    "No, I've been way too busy with class...and life.",
                    "Damn, girl, you had it like a year.",
                    "Or a week. I did browse through all the titles, drama queen."
                ],
                "next": "warren_2"
            }
        ]
    },
    "warren_2": {
        "choices": [
            {
                "name": "Seen it.",
                "text": [
                    "Seen it. I was more disturbed by all those emo-vampire movies in there.",
                    "Can't a sensitive high school boy love sensitive vampires too?"
                ],
                "next": "warren_3"
            },
            {
                "name": "No fucking way.",
                "text": [
                    "No fucking way will I watch that. My mind is twisted enough...",
                    "I laughed my ass off."
                ],
                "next": "warren_3"
            }
        ]
    },
    "warren_3": {
        "choices": [
            {
                "name": "How so?",
                "text": [
                    "How so?",
                    "Sensitive usually means 'won't be having sex with you.'",
                    "Oh, god! You need a sensitive woman to kick your ass."        
                ],
                "next": "warren_4"
            },
            {
                "name": "Faster, Pussycat! Kill! Kill!",
                "text": [
                    "No, I was impressed you had Faster, Pussycat. Kill! Kill!",
                    "Russ Meyer was a genius of black and white. Plus, babes with breasts.",
                    "Who would beat your sensitive ass down."
                ],
                "next": "warren_4"
            },
            {
                "name": "Not at all.",
                "text": [
                    "Not at all. Sensitive is good, unless you're a pushover. You have hip taste and a quick mind.",
                    "Thanks for noticing, Max.",
                    "The right girl will too..."
                ],
                "next": "warren_4"
            }
        ]
    },
    "warren_4": {
        "choices": [
            {
                "name": "I need to talk.",
                "text": [
                    "I need to talk to somebody...just to get it out of my system...",
                    "Dr. Warren Graham is in da house. I won't even prescribe you any meds... Tell me everything."
                ],
                "next": "nathan_1"
            },
            {
                "name": "Don't want to speak about it.",
                "text": [
                    "I don't wanna speak about it. This is kind of a crazy day for me. I mean, I literally think I'm going crazy...",
                    "I may be a pest, but...I'm a good listener."
                ],
                "next": "nathan_1"
            }
        ]
    },
    "nathan_1": {
        "text": "Whatthefuckever. I know you like to take pictures, especially when you're hiding out in the bathrooms.",
        "next": [
            {
                "name": "reported_nathan",
                "type": "eq",
                "value": true,
                "node": "nathan_reported_nathan_1"
            },
            {
                "name": "reported_nathan",
                "type": "eq",
                "value": false,
                "node": "nathan_hid_truth_1"
            }
        ]
    },
    "nathan_reported_nathan_1": {
        "choices": [
            {
                "name": "I told him the truth.",
                "text": [
                    "I told him the truth. A student had a gun.",
                    "No, you told him I had a gun. That's why he dragged me into his office.",
                    "And did what? Gave you a stern lecture?",
                    "Nobody...nobody lectures me. Everyone tries though... They try...",
                    "You should talk to somebody, Nathan..."
                ],
                "next": "nathan_2"
            },
            {
                "name": "What are you talking about?",
                "text": [
                    "What are you talking about?",
                    "I know you're new here, but don't even play stupid with me.",
                    "I'm not new. I've lived here for years.",
                    "Then you should know the Prescotts own this shithole.",
                    "Then you don't have to worry about me... Worry about yourself."
                ],
                "next": "nathan_2"
            }
        ]
    },
    "nathan_hid_truth_1": {
        "choices": [
            {
                "name": "What are you talking about?",
                "text": [
                    "What are you talking about?",
                    "I know you're new here, but don't even play stupid with me.",
                    "I'm not new. I've lived here for years.",
                    "Then you should know the Prescotts own this shithole.",
                    "Then you don't have to worry about me... Worry about yourself."
                ],
                "next": "nathan_2"
            },
            {
                "name": "Nothing.",
                "text": [
                    "Nothing but a butterfly.",
                    "You're full of shit! I'd respect you more if you told me the truth.",
                    "I don't need your respect.",
                    "You're clueless. You have no idea who I am or what I can do!",
                    "Actually, I have a pretty good idea of who you are."
                ],
                "next": "nathan_2"
            },
        ]
    },
    "nathan_2": {
        "choices": [
            {
                "name": "Take a step back.",
                "text": [
                    "Take a step back, Nathan Prescott.",
                    "Oh, man, you're telling me what to do?"
                ],
                "next": "chloe_1"
            },
            {
                "name": "I could call the police.",
                "text": [
                    "I could call the police.",
                    "Do it. The Prescotts own the pigs here."
                ],
                "next": "chloe_1"
            }
        ]    
    },
    "chloe_1": {
        "choices": [
            {
                "name": "Hopefully nothing.",
                "text": [
                    "Hopefully nothing after today. So, how do you know Nathan?",
                    "He's just another Arcadia asshole... Your friend really took a beatdown for you."
                ],
                "next": "chloe_2"
            },
            {
                "name": "I have no idea.",
                "text": [
                    "I have no idea. I know he's a Prescott.",
                    "And an asshole. Your friend really stood up for you..."
                ],
                "next": "chloe_2"
            }
        ]
    },
    "chloe_2": {
        "choices": [
            {
                "name": "I guess.",
                "text": [
                    "I guess. It was cool, but...I felt kinda lonely, out of my league.",
                    "I would think you'd fit right in with the art school hipsters...",
                    "Right. You look like the cover of Hipster Girl dot com.",
                    "At least you're still a smartass.",
                    "That's why I'm here."
                ],
                "next": "chloe_3"
            },
            {
                "name": "No.",
                "text": [
                    "No, it felt like a real city for artists, big and bright. Great for taking pictures.",
                    "Yeah, must be hard coming back to a hick town like Arcadia again...",
                    "Not after seeing you."
                ],
                "next": "chloe_3"
            }
        ]
    },
    "chloe_3": {
        "choices": [
            {
                "name": "Of course.",
                "text": [
                    "Of course. It's one of the best photography programs in the country...and my favorite teacher, Mark Jefferson.",
                    "So you came back to Arcadia for a teacher...not your best friend."
                ],
                "next": "chloe_4"
            },
            {
                "name": "Only for Mark Jefferson.",
                "text": [
                    "Only for Mark Jefferson. He was a pretty famous photographer in the '90s... I've always loved his work.",
                    "Those that can't do, teach. I'm glad you found a good reason to come back."
                ],
                "next": "chloe_4"
            }
        ]
    },
    "chloe_4": {
        "choices": [
            {
                "name": "I wanted to.",
                "text": [
                    "I wanted to. I was just so tripped out over leaving Arcadia...",
                    "Oh, please. I'm sure your phone and laptop were frozen in time.",
                    "You're merciless."
                ],
                "next": "chloe_5"
            },
            {
                "name": "Give me a break.",
                "text": [
                    "Give me a break. I was going through changes...like you.",
                    "I guess those changes included dumping me from your life.",
                    "That's not true, Chloe.",
                    "Bullshit. You thought you'd hook up with all these art pricks in Seattle. Didn't happen, though.",
                    "You're merciless."
                ],
                "next": "chloe_5"
            },
            {
                "name": "I'm sorry...",
                "text": [
                    "I'm sorry. I know things were tough on you when I left.",
                    "How do you know? You weren't even here.",
                    "I didn't order my parents to move specifically to fuck you over, Chloe."
                ],
                "next": "chloe_5"
            }
        ]
    },
    "chloe_5": {
        "choices": [
            {
                "name": "That's Rachel Amber...",
                "text": [
                    "That's Rachel Amber... Her missing person posters are all over Blackwell.",
                    "Yeah, I put them up... She was my angel."
                ],
                "next": "chloe_6"
            },
            {
                "name": "So who is she?",
                "text": [
                    "So, who is she? Do you mind talking about her?",
                    "Rachel Amber. She was my... angel."
                ],
                "next": "chloe_6"
            }
        ]
    },
    "chloe_6": {
        "choices": [
            {
                "name": "So Rachel took my place.",
                "text": "So, Rachel took my place... I'm glad she was there for you.",
                "next": "chloe_7"
            },
            {
                "name": "I never forgot.",
                "text": "I never forgot. Even if I was an asshole and didn't keep in touch. But you had Rachel...",
                "next": "chloe_7"
            }
        ]
    },
    "chloe_7": {
        "choices": [
            {
                "name": "So what happend?",
                "text": [
                    "So, what happened? Did your folks, your mom, try to stop you?",
                    "My mom was too busy hooked up with Sergeant Shithead."
                ],
                "next": "chloe_8"
            },
            {
                "name": "I see why...",
                "text": [
                    "I see why... I bet your mom was not too happy...",
                    "She was happy enough to marry a Nazi. Reason number 356 to escape."
                ],
                "next": "chloe_8"
            },
            {
                "name": "What about your mom?",
                "text": [
                    "What about your mom? What did Joyce think about all this?",
                    "She couldn't wait to get re-hitched. Step-dick is one reason I wanted to bail."
                ],
                "next": "chloe_8"
            }
        ]
    },
    "chloe_8": {
        "choices": [
            {
                "name": "How do you know?",
                "text": [
                    "How do you know she disappeared? Maybe she wanted to start a totally new life...",
                    "Unlike you, she would've told me, okay? Something happened to her.",
                    "I believe you. I'm just trying to get all deductive..."
                ],
                "next": [
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": true,
                        "node": "chloe_made_fun_of_victoria"
                    },
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": false,
                        "node": "chloe_took_photo_of_kate"
                    }
                ]
            },
            {
                "name": "What about her parents?",
                "text": [
                    "What about her parents? Are they looking for her?",
                    "They're in denial. Max, I know she's missing.",
                    "I assume you know more than that..."
                ],
                "next": [
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": true,
                        "node": "chloe_made_fun_of_victoria"
                    },
                    {
                        "name": "made_fun_of_victoria",
                        "type": "eq",
                        "value": false,
                        "node": "chloe_took_photo_of_kate"
                    }
                ]
            }
        ]
    },
    "chloe_made_fun_of_victoria": {
        "text": "Booyah, you skank! Karma is a bitch. Nice framing too.",
        "next": [
            {
                "name": "took_photo_of_kate",
                "type": "eq",
                "value": true,
                "node": "chloe_took_photo_of_kate"
            },
            {
                "name": "took_photo_of_kate",
                "type": "eq",
                "value": false,
                "node": "chloe_9"
            }
        ]
    },
    "chloe_took_photo_of_kate": {
        "text": "Are you shitting me? That asshole is everywhere.",
        "next": "chloe_9"
    },
    "chloe_9": {
        "choices": [
            {
                "name": "I was there...",
                "text": [
                    "I was there... Hiding in the corner.",
                    "Damn. You're a ninja.",
                    "A ninja would have cut Nathan's head off. I just took a butterfly photo..."
                ],
                "next": "chloe_10"
            },
            {
                "name": "I wasn't there...",
                "text": [
                    "I wasn't there...",
                    "Come on! Even after five years I can still tell when you're lying.",
                    "Okay, I was there, Sherlock."
                ],
                "next": "chloe_10"
            }
        ]
    },
    "chloe_10": {
        "choices": [
            {
                "name": "I wasn't sure.",
                "text": [
                    "I wasn't sure...",
                    "I know I look a lot different.",
                    "I was scared, too. I couldn't see straight.",
                    "I don't blame you, Max."
                ]
            },
            {
                "name": "Not at all.",
                "text": [
                    "Not at all. Your hair and clothes are so different...",
                    "I hope so. I'm sure this is all so weird to you after coming back."
                ]
            }
        ]
    }

};