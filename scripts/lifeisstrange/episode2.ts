import { Script } from "../../types";

export const script: Script = {
    // ===================== Girls' Dormitories =====================
    "start": {
        "text": [
            "Being a superhero is dirty work. I need a shower.",
            "Okay, Max, let's hit the showers now!"
        ],
        "next": "hallway_bridge"
    },
    "hallway_bridge": {
        "text": [
            "Courtney, seriously, do not forget I need those papers before tonight. Like, now. Thanks, cherie.",
            "Yeah, of course, Victoria. I'll get the tests and papers to you this afternoon. I am so on it. Consider it done.",
            "Ow!",
            "Gross. The Vortex Club are such pigs. I'm glad I pissed them off.",
            "I didn't think Kate was like this... macking on those bros? Ew.",
            "We shouldn't be watching this.",
            "Everybody's seen it by now."
        ],
        "next": "showers_1"
    },

    // ===================== Showers =====================
    "showers_1": {
        "choices": [
            {
                "name": "Took photo",
                "text": [
                    "Max!",
                    "Oh! Uh... Hey, Kate. Sorry about yesterday.",
                    "Yeah, I'm sorry you didn't do anything to help. But you're just like everybody else here...",
                    "That's not true, I wanted to help, but, but--",
                    "Whatever, it's done..."
                ],
                "next": "showers_1_bridge"
            },
            {
                "name": "Intervened",
                "text": [
                    "Hey Max!",
                    "Hey, Kate. How are you doing?",
                    "I'm here. Thanks again for standing up for me yesterday. I needed that.",
                    "Anytime. That guy has issues.",
                    "Doesn't everybody here?"
                ],
                "next": "showers_1_bridge"
            }
        ]
    },
    "showers_1_bridge": {
        "text": [
            "By the way, Max, do you still have my copy of \"The October Country\"?",
            "Oh. Yes, of course. It's great so far. I didn't realize Bradbury was such a poet.",
            "Can you please bring it back to my room this morning? I just need to take some notes for class.",
            "Absolutely. I'll bring it by later.",
            "What's up, Kate?",
            "School.",
            "That's it?",
            "That video of you clubbing didn't look like homework...",
            "Victoria, that wasn't me...",
            "Oh, my God. Right.",
            "Don't be shy. I think it's awesome you set a tongue record on video...",
            "You're going to be sorry someday.",
            "Oh, boohoo, I'm sorry you're a viral slut. I'm sure she had fun.",
            "Looks like it.",
            "I know Nathan hooked her up. And you know he has the good shit.",
            "Preach it, sista.",
            "Yuck. I still have goddamn paint all over my face."
        ],
        "next": "showers_2"
    },
    "showers_2": {
        "choices": [
            {
                "name": "Made fun of Victoria",
                "text": [
                    "\"Max Selfie\" thought she was a badass taking that picture. I shoulda beat her down.",
                    "That was so uncool.",
                    "She's jealous because Mark--Mr. Jefferson knows I'm going to win the \"Everyday Heroes\" contest. He thinks Max is a joke."
                ],
                "next": "showers_2_bridge"
            },
            {
                "name": "Comforted Victoria",
                "text": [
                    "Good thing my faithful minions took their sweet time bringing me a towel...",
                    "We ran all the way--",
                    "Give it a rest, Taylor. Now I know if I'm in an accident I won't rely on you or Courtney for help. You can hang out with Kate...or Max."
                ],
                "next": "showers_2_bridge"
            }
        ]
    },
    "showers_2_bridge": {
        "text": [
            "She's a weirdo with that dumb camera.",
            "I hate that \"I'm so quirky\" crap. Anyway. Let's leave the link to Kate's video so everybody gets a chance to see her in action...",
            "You are such an evil beeatch. I love it!",
            "I better get dressed, then go give back Kate's book.",
            "Hello?! Water!",
            "Sorry, I forgot!",
            "Even if I can stop one person from watching it, it's worth it."
        ],
        "next": "maxroom_return"
    },

    // ===================== Max's Room (return) =====================
    "maxroom_return": {
        "choices": [
            {
                "name": "Reported Nathan and/or made fun of Victoria",
                "text": [
                    "No fucking way! This is not why I came to Blackwell. And I still have to clean all this crap up? After I find Kate's book...",
                    "Ta da! I do love a clean room. Very zen. Except for that bullshit graffiti."
                ],
                "next": "maxroom_return_bridge"
            },
            {
                "name": "Didn't report Nathan or make fun of Victoria",
                "text": "",
                "next": "maxroom_return_bridge"
            }
        ]
    },
    "maxroom_return_bridge": {
        "text": [
            "Maybe I'll just put on a shirt and jeans. Hey, Einstein had the same exact suit for every day of the week. And he couldn't even rewind time.",
            "No book here...",
            "My desk is a pigsty, but...I know it ain't there.",
            "And nothing here.",
            "Of course you just spilled soda on Kate's book. Better fix this fast. Kate needs the book and I don't want to add to her list of problems.",
            "Begone, foul soft drink!",
            "Aha, you sneaky book, you're mine! Now I can finally take this back to Kate before I'm late. As if I have to worry about being late anymore... I do have all the time in the world now.",
            "Kate? You in there?",
            "Yes, I'm here. Come in, Max..."
        ],
        "next": "kateroom_1"
    },

    // ===================== Kate's Room =====================
    "kateroom_1": {
        "choices": [
            {
                "name": "Took photo",
                "text": [
                    "Uh, hey, Kate, I brought your book...",
                    "Max, why didn't you do anything when David harassed me yesterday?"
                ],
                "next": "kateroom_1a"
            },
            {
                "name": "Intervened",
                "text": [
                    "Uh, hey, Kate, I brought your book...",
                    "Max, why did you step in between David and me yesterday?"
                ],
                "next": "kateroom_1b"
            }
        ]
    },
    "kateroom_1a": {
        "choices": [
            {
                "name": "I wanted proof.",
                "text": [
                    "I wanted proof David was in your face.",
                    "I thought he was different. I'm happy to see that somebody cares..."
                ],
                "next": "kateroom_2"
            },
            {
                "name": "I was scared.",
                "text": [
                    "I'm sorry. I was scared. I can be pretty gutless.",
                    "I don't expect you to get in trouble for me. I just feel like nobody cares..."
                ],
                "next": "kateroom_2"
            }
        ]
    },
    "kateroom_1b": {
        "choices": [
            {
                "name": "I hate bullies.",
                "text": [
                    "I hate bullies. David Madsen should know better.",
                    "I was hoping he would. But it's nice to see that you care about me..."
                ],
                "next": "kateroom_2"
            },
            {
                "name": "I had no choice.",
                "text": [
                    "I had no choice. David Madsen is an asshole.",
                    "You had the choice to not get involved. Nobody here seems to care about anybody..."
                ],
                "next": "kateroom_2"
            }
        ]
    },
    "kateroom_2": {
        "text": [
            "Kate, I actually do care. So, what's the story with you and David?",
            "Well... He's a total paranoid ass! He thinks I'm part of the Vortex Club. Yeah, right."
        ],
        "next": "kateroom_3"
    },
    "kateroom_3": {
        "choices": [
            {
                "name": "Did you party with them?",
                "text": [
                    "Did you party with them?",
                    "I went to a Vortex Club party against my better judgment. Not my scene at all."
                ],
                "next": "kateroom_4"
            },
            {
                "name": "What about the video?",
                "text": [
                    "What about this video? And I swear I haven't watched it.",
                    "I can't even watch it, Max..."
                ],
                "next": "kateroom_3b"
            },
            {
                "name": "Why?",
                "text": [
                    "Why does he think that?",
                    "Because he saw the video."
                ],
                "next": "kateroom_4"
            }
        ]
    },
    "kateroom_3b": {
        "choices": [
            {
                "name": "Should I watch it?",
                "text": [
                    "Should I watch it? Just for...posterity?",
                    "Are you kidding?"
                ],
                "next": "kateroom_4"
            },
            {
                "name": "I won't.",
                "text": [
                    "I won't either.",
                    "Thank you, Max."
                ],
                "next": "kateroom_4"
            }
        ]
    },
    "kateroom_4": {
        "text": [
            "Do you know how humiliating this is for me?",
            "I know this sucks, Kate, but...tell me about the video and maybe I can help.",
            "Basically, I went to one Vortex Club party and ended up making out with a bunch of people...and I have no memory of it..."
        ],
        "next": "kateroom_5"
    },
    "kateroom_5": {
        "choices": [
            {
                "name": "Why would you go?",
                "text": [
                    "So, why would you go?",
                    "Lapse of sanity? I just thought I could meet some new people."
                ],
                "next": "kateroom_6"
            },
            {
                "name": "Doesn't sound like you.",
                "text": [
                    "Doesn't sound like you. I can't see you partying with Victoria...",
                    "I didn't."
                ],
                "next": "kateroom_6"
            },
            {
                "name": "That's awful...",
                "text": [
                    "That's awful. So, how did that happen?",
                    "It's a long story. I'm still trying to sort it all out..."
                ],
                "next": "kateroom_6"
            }
        ]
    },
    "kateroom_6": {
        "text": [
            "You have to tell me more than that. What happened at the party? Did you drink?",
            "I swear to God I had one sip of red wine. And then I drank water."
        ],
        "next": "kateroom_7"
    },
    "kateroom_7": {
        "choices": [
            {
                "name": "Are you sure?",
                "text": "Are you sure it was just one sip?",
                "next": "kateroom_8"
            },
            {
                "name": "Not enough to get wasted.",
                "text": [
                    "Not enough to get wasted, is it?",
                    "I don't get wasted. Ever."
                ],
                "next": "kateroom_8"
            }
        ]
    },
    "kateroom_8": {
        "text": [
            "I take a sip at church and I don't end up on a viral video, okay?",
            "Did somebody drug you?",
            "I remember...I remember getting sick and dizzy...",
            "Go on...",
            "Then Nathan Prescott said he would take me to the hospital..."
        ],
        "next": "kateroom_9"
    },
    "kateroom_9": {
        "choices": [
            {
                "name": "Did you go?",
                "text": [
                    "Did you go?",
                    "Definitely not. I'm not sure where I went...",
                    "What do you remember about that?"
                ],
                "next": "kateroom_10"
            },
            {
                "name": "Nathan Prescott!",
                "text": [
                    "Nathan Prescott? Oh, shit!",
                    "He was being nice for a change when he offered to help me.",
                    "He's the opposite of nice. What next?"
                ],
                "next": "kateroom_10"
            },
            {
                "name": "How sick were you?",
                "text": [
                    "How sick were you?",
                    "Sick enough to need a doctor. I thought I was dying, Max.",
                    "So, Nathan didn't take you to the ER?"
                ],
                "next": "kateroom_10"
            }
        ]
    },
    "kateroom_10": {
        "text": [
            "All I recall is driving for a long time...then I woke up in a room...I thought it was a hospital because it was so white and bright...",
            "Go on, I'm listening.",
            "Somebody was talking to me in a soft voice...I thought it was a doctor...until I heard Nathan and felt a sharp sting in my neck...and...and..."
        ],
        "next": "kateroom_11"
    },
    "kateroom_11": {
        "choices": [
            {
                "name": "And?",
                "text": "And?",
                "next": "kateroom_12"
            },
            {
                "name": "Are you sure?",
                "text": [
                    "Are you sure?",
                    "Of course--you think I'm making this crap up? Why?",
                    "No, I'm just...being deductive. As usual. Then what happened?"
                ],
                "next": "kateroom_12"
            }
        ]
    },
    "kateroom_12": {
        "text": [
            "That's all I remember! I don't know what happened... I woke up outside my dorm room the next day. I didn't have any marks or bruises, but I felt gross.",
            "So, who took the video of you at the party?",
            "I have no idea. Probably Victoria. She was there being her mean self.",
            "Jesus, Kate, I'm sorry. This is serious shit.",
            "How do I get a viral video taken down? I know it's already spreading--what if my church sees that? I need to know what to do...",
            "Kate, we'll figure it out. I'll check back later, okay?",
            "Thanks, Max... You can put my book here, near my bag.",
            "So, Max, can I ask you a question? And please be honest.",
            "Absolutely, Kate. Anything.",
            "I need to find out if Nathan Prescott helped me...or hurt me after that party. Should I go to the police?"
        ],
        "next": "kateroom_13"
    },
    "kateroom_13": {
        "choices": [
            {
                "name": "GO TO THE POLICE",
                "text": [
                    "Yes, you should definitely go to the police, Kate. I totally believe every word you say. Nathan Prescott is truly dangerous.",
                    "Bless you, Max. I will go to the police...and also Principal Wells. With you as my back-up witness, they'll have to take us seriously now.",
                    "Back-up witness? Well, I mean, I believe you and everything, but...we're still just spoiled punk students to the cops and faculty... I just think we need to be very careful here...",
                    "Why? Careful of what?",
                    "Nothing...except the Prescotts are a powerful family. I hope this won't backfire on us, that's all. Even though that rich bastard has earned some serious bad karma. He'll get it...",
                    "Time out, Max. You actually told Kate to go to the police and the Principal...after getting a scary text threat. Now the police will definitely drag you into this shit."
                ],
                "next": "dorm_warren_1"
            },
            {
                "name": "LOOK FOR PROOF",
                "text": [
                    "If you do that, they won't believe you. You're on video grabbing at all those guys and they'll use that against you. Bad.",
                    "But I know I was drugged--",
                    "That's what you have to prove. Not them. I'm just telling you how the cops and school will look at this. The video doesn't exactly back you up...",
                    "You make me feel so hopeless--",
                    "No, no, Kate. I just don't want you to get hurt any more...",
                    "That seems impossible at this point. So that's your answer?",
                    "I think we should wait. There are other things going on that might help you.",
                    "But not right now. So I can walk down the halls with people calling me a viral slut. Thanks, Max.",
                    "Good job, Dr. Max. She didn't like what I had to say, but we need more proof of what happened."
                ],
                "next": "dorm_warren_1"
            }
        ]
    },

    // ===================== Dormitories (Warren) =====================
    "dorm_warren_1": {
        "text": [
            "What up, Max? How are you?",
            "Warren, what are you doing here?",
            "Oh, nothing--waiting. For a call? I mean, I already took the call... Anyway, I wanted to rap about that action yesterday."
        ],
        "next": "dorm_warren_2"
    },
    "dorm_warren_2": {
        "choices": [
            {
                "name": "Thank you!",
                "text": "By the way, thank you for stepping in. You were pretty badass, Warren. I owe you.",
                "next": "dorm_warren_2_bridge"
            },
            {
                "name": "That was intense!",
                "text": "That was intense. Everything happened so fast. I owe you.",
                "next": "dorm_warren_2_bridge"
            }
        ]
    },
    "dorm_warren_2_bridge": {
        "text": [
            "Oh, yes, you do. I got knocked on my ass by that dick. I'm some personal superhero.",
            "You're a real \"Everyday Hero.\" You stood up to a bully and it was awesome.",
            "Even though you left me with said bully and ran off with that girl... She's pretty punk rock, how do you know her?"
        ],
        "next": "dorm_warren_3"
    },
    "dorm_warren_3": {
        "choices": [
            {
                "name": "Chloe Price.",
                "text": "An old friend. Chloe Price? We haven't seen each other in a while.",
                "next": "dorm_warren_3_bridge"
            },
            {
                "name": "Just a pirate.",
                "text": "Just a pirate I used to know.",
                "next": "dorm_warren_3_bridge"
            }
        ]
    },
    "dorm_warren_3_bridge": {
        "text": "I bet you were glad to see her blast up in that truck like a rock star. Which begs the question--why is Nathan Prescott getting psycho on you?",
        "next": "dorm_warren_4"
    },
    "dorm_warren_4": {
        "choices": [
            {
                "name": "I busted him.",
                "text": "I busted him in the bathroom yesterday with a gun.",
                "next": "dorm_warren_4a"
            },
            {
                "name": "Don't get involved.",
                "text": "He's dangerous. I don't want you to get involved. You got me there, but lay low, Nathan Prescott will get his karma soon.",
                "next": "dorm_warren_5"
            }
        ]
    },
    "dorm_warren_4a": {
        "choices": [
            {
                "name": "Reported Nathan",
                "text": "I'll give you the story later. Principal Wells is taking care of it now, I hope.",
                "next": "dorm_warren_5"
            },
            {
                "name": "Hid the truth",
                "text": "I was too scared to tell Principal Wells. Please don't say anything. I'll give you more info later.",
                "next": "dorm_warren_5"
            }
        ]
    },
    "dorm_warren_5": {
        "text": "Weird fucking week. Like that bizarro snowfall yesterday. Speaking of dystopia, that drive-in is having a 70's \"Planet of the Apes\" marathon. Let's \"Go Ape\"!",
        "next": "dorm_warren_6"
    },
    "dorm_warren_6": {
        "choices": [
            {
                "name": "Yes.",
                "text": [
                    "Yes, that's exactly what I need. I love those old-school ape films.",
                    "Well, that was easier than I thought. Cool. I'll text you the info."
                ],
                "next": "diner_bridge"
            },
            {
                "name": "No.",
                "text": [
                    "No, I don't think I can concentrate on going out to the movies. I just feel like escaping.",
                    "Fine. Be a damned dirty human. I'll \"Go Ape\" myself."
                ],
                "next": "diner_bridge"
            }
        ]
    },

    // ===================== Two Whales Diner =====================
    "diner_bridge": {
        "text": [
            "David talking to Nathan cannot be a good thing. This has something to do with Kate...or Rachel...",
            "Talk about going back in time...the diner looks exactly the same.",
            "Yep. I'm ready to cash my lottery ticket.",
            "Glad somebody is...",
            "Don't try to take it from me. It's mine.",
            "I wouldn't dream of it.",
            "I'm going to be a millionaire. Hope nobody steals my lottery ticket. Can't wait to be rich. Yep."
        ],
        "next": "junkyard_1"
    },

    // ===================== American Rust Junkyard =====================
    "junkyard_1": {
        "choices": [
            {
                "name": "Answered Kate's call",
                "text": [
                    "Is this a race?",
                    "Keep up.",
                    "How many times are you going to get pissed at me this week?",
                    "That depends on you. And how well you do in this phase of the test..."
                ],
                "next": "junkyard_1_bridge"
            },
            {
                "name": "Didn't answer Kate's call",
                "text": [
                    "Wait up, Speedy!",
                    "Dude, this is going to be so cool!",
                    "Slow down, wait for me to get your present.",
                    "You can just back time up...We'll have to test you now to make sure!"
                ],
                "next": "junkyard_1_bridge"
            }
        ]
    },
    "junkyard_1_bridge": {
        "text": [
            "Welcome to American Rust, my home away from hell.",
            "Raw and rough. It suits you...",
            "Max, do you know how awesome this is? I get my best friend back, and she's also supersized?",
            "We don't know for how long.",
            "Exactly why it's time to have fun."
        ],
        "next": "junkyard_2"
    },
    "junkyard_2": {
        "choices": [
            {
                "name": "Chloe showed Max the gun yesterday",
                "text": [
                    "Are you kidding? After yesterday, I'm kinda over guns, Chloe. It freaks me out that you have one.",
                    "Don't you trust me?",
                    "Yes, but not that gun.",
                    "You have more power than an army. Don't be scared of my little toy. Besides, we need it for the test..."
                ],
                "next": "junkyard_2_bridge"
            },
            {
                "name": "Didn't show the gun",
                "text": [
                    "David might be a douche, but you did steal his gun... Is everybody armed in Arcadia Bay now?",
                    "Only the ones who shouldn't be. Like step-dildo. Until now.",
                    "I'm not in the revolution yet, Che.",
                    "You are the revolution, Max. So we should figure out how to best use and abuse your power with a test."
                ],
                "next": "junkyard_2_bridge"
            }
        ]
    },
    "junkyard_2_bridge": {
        "text": [
            "Drink?",
            "Yuck.",
            "You are so cute. You haven't changed a bit. Okay, let's do this. Can you find five bottles while I prep the shooting range?",
            "Beer and guns? Nice combo.",
            "You can handle it. Now go find us five bottles? Pretty please?",
            "Break time!"
        ],
        "next": "railroad_1"
    },

    // ===================== Railroad =====================
    "railroad_1": {
        "choices": [
            {
                "name": "Tried to shoot Frank",
                "text": [
                    "I still can't believe you pulled a gun on Frank. That was epic.",
                    "It felt awful... I'm glad there was no bullets in there--",
                    "You can just rewind time in your hand and stick that barrel right up Frank's ass! You have the power!",
                    "You're gross. Don't fall."
                ],
                "next": "railroad_1_bridge"
            },
            {
                "name": "Didn't try to shoot Frank",
                "text": [
                    "I can't believe you basically gave him my gun. \"Here ya go, Frank.\"",
                    "You can't keep getting mad at me. Especially for stupid shit.",
                    "I'm not mad. It adds up in my mind as people letting me down. And I just liked having that gun, man.",
                    "Now you have me to protect you."
                ],
                "next": "railroad_1_bridge"
            }
        ]
    },
    "railroad_1_bridge": {
        "text": [
            "I'm just glad you were here.",
            "Me too...I think. Chloe, why the hell are you hanging around scary losers like Frank? It's weird.",
            "Let's take a break and I'll talk.",
            "Feels like a different world, huh? I wish we could stay forever...",
            "Can we build another pirate fort and keep the world out?",
            "We need a new secret hangout... At least Frank wouldn't find us... Are you okay, Max?"
        ],
        "next": "railroad_2"
    },
    "railroad_2": {
        "choices": [
            {
                "name": "I'm freaked out.",
                "text": "I'm still freaked out about what happened... That was awful, Chloe.",
                "next": "railroad_2_bridge"
            },
            {
                "name": "Frank?",
                "text": "Seriously, Chloe, this is scary. What if Frank tries to track us down?",
                "next": "railroad_2_bridge"
            }
        ]
    },
    "railroad_2_bridge": {
        "text": "I'm sorry. But Frank isn't as hardcore as he fronts. All he cares about is his cash, stash, and mangy dog.",
        "next": "railroad_3"
    },
    "railroad_3": {
        "choices": [
            {
                "name": "Tried to shoot Frank",
                "text": "Chloe, did you see what just happened? I almost shot him! I know I could rewind, but, Chloe, this is not playtime. No more guns.",
                "next": "railroad_3_bridge"
            },
            {
                "name": "Didn't try to shoot Frank",
                "text": "Chloe, are you for reals? Frank just took your gun and threatened us! He's armed and clearly dangerous.",
                "next": "railroad_3_bridge"
            }
        ]
    },
    "railroad_3_bridge": {
        "text": [
            "Max, I know. Crazy shit is the new normal for me. That's why I planned to leave Arcadia Bay without paying Frank off...",
            "Now, tell me exactly what's going on between you and Frank--does he have a last name?"
        ],
        "next": "railroad_4"
    },
    "railroad_4": {
        "choices": [
            {
                "name": "Stayed hidden",
                "text": "Frank Bowers. Obviously don't get my pot from you, remember? Anyway, Frank and I kind of hung out.",
                "next": "railroad_5"
            },
            {
                "name": "Took the blame",
                "text": "Frank Bowers. He's just a dealer. Where I get my weed. The one in your joint, remember? Anyway, Frank and I kind of hung out.",
                "next": "railroad_5"
            }
        ]
    },
    "railroad_5": {
        "choices": [
            {
                "name": "Hung out?",
                "text": [
                    "Hung out? You don't mean you...",
                    "No, we didn't have sex. Gross, man. He never even tried. I just made the mistake of borrowing money so Rachel and I could bail outta here..."
                ],
                "next": "railroad_6"
            },
            {
                "name": "Bad boy?",
                "text": [
                    "Is this your \"bad boy\" phase?",
                    "No, it's my \"trying to scrounge some quick cash so Rachel and I could get the hell out of here\" phase. Frank had quick cash. That's all."
                ],
                "next": "railroad_6"
            }
        ]
    },
    "railroad_6": {
        "text": [
            "That's it?",
            "No. I want to know how Frank got Rachel's bracelet... What do you think?"
        ],
        "next": "railroad_7"
    },
    "railroad_7": {
        "choices": [
            {
                "name": "Be careful.",
                "text": "I think we have to be careful. And keep an eye on this guy. Without him eyeballing us, okay?",
                "next": "railroad_7_bridge"
            },
            {
                "name": "My brain is fried.",
                "text": "I don't know anymore. My brain is so fried from all this. I need a mental enema.",
                "next": "railroad_7_bridge"
            }
        ]
    },
    "railroad_7_bridge": {
        "text": "It's so weird talking to you about this insane crap. We haven't hung out this much since we were tweens...and it's like no time has passed. I wish Rachel was here to meet you.",
        "next": "railroad_8"
    },
    "railroad_8": {
        "choices": [
            {
                "name": "Rachel and I?",
                "text": "Do you think that Rachel and I would have been friends?",
                "next": "railroad_8_bridge"
            },
            {
                "name": "Why?",
                "text": "Why? I bet she would hate me.",
                "next": "railroad_8_bridge"
            }
        ]
    },
    "railroad_8_bridge": {
        "text": [
            "You're not that different. She had--has a great eye for images and for art. Plus, she's a smartass like you. We would all be hella best friends forever.",
            "I know she must be as cool as you are. I have no doubt we'll meet soon.",
            "Railroad tracks always make me feel better...I have no idea why...",
            "Kerouac knew. It's the romance of travel and movement...the sound of the train whistle at night...",
            "Look at the beat poet here.",
            "I'd rather be a good photographer...",
            "You are. You just have to stop being afraid...",
            "Perfect...",
            "Max!",
            "Max? Help! I'm stuck!",
            "Hold on, Chloe!",
            "What's that noise? The train...oh, shit!"
        ],
        "next": "railroad_trapped"
    },
    "railroad_trapped": {
        "text": [
            "Come on, Max! Hurry!",
            "Please get me outta here!",
            "Max!",
            "The train is coming! Max, please!",
            "Please!",
            "Please...",
            "PLEASE!!!",
            "Damn, I missed something. I better rewind!",
            "Get me outta here Max!",
            "Find something! Free me!",
            "I don't wanna die here!"
        ],
        "next": "railroad_puzzle"
    },
    "railroad_puzzle": {
        "text": [
            "I can definitely use this bad boy!",
            "Score!",
            "Now I can pull a total MacGyver!",
            "Awesome, it's not locked!",
            "But which wire to cut?"
        ],
        "next": "railroad_wire"
    },
    "railroad_wire": {
        "choices": [
            {
                "name": "Green Wire",
                "text": "Stupid light. No go. Shit.",
                "next": "railroad_wire"
            },
            {
                "name": "Yellow Wire",
                "text": "Whoa—short circuit city!",
                "next": "railroad_wire"
            },
            {
                "name": "Red Wire",
                "text": "Now that's the right cable!",
                "next": "railroad_lever"
            }
        ]
    },
    "railroad_lever": {
        "text": "Yes! I did it!",
        "next": "railroad_rescue"
    },
    "railroad_rescue": {
        "choices": [
            {
                "name": "Damaged the train tracks",
                "text": [
                    "Damn, that was close.",
                    "You saved me again! Crazy. Now we're totally bonded for life!",
                    "You okay?",
                    "I've got splinters in my ass and leg, so I wish there was a less violent way for you to save me...And now the trains can't get to the lumber mill...Oops."
                ],
                "next": "railroad_end"
            },
            {
                "name": "Didn't damage the train tracks",
                "text": [
                    "You okay?",
                    "You saved me again! Crazy. Now we're totally bonded for life!",
                    "Damn, that was close."
                ],
                "next": "railroad_end"
            }
        ]
    },
    "railroad_end": {
        "text": [
            "Aren't you glad I took you away to a nice quiet, desolate spot?",
            "It was cool to spend time in your lair, but...I have to get back to school before my next class...",
            "Since you're the mysterious superhero, I'll be your faithful chauffeur and companion.",
            "My powers might not last, Chloe...",
            "That's okay—we will. Forever."
        ],
        "next": "campus_1"
    },

    // ===================== Main Campus - Before Class =====================
    "campus_1": {
        "text": [
            "Thanks for the ride, Chloe. Right on time for my art lesson.",
            "Thanks for coming with me. Sorry to be so boring...",
            "Nothing exciting ever happens to us, right?",
            "Listen, your rewind power has to be connected to that snow yesterday. That might explain your tornado vision..."
        ],
        "next": "campus_2"
    },
    "campus_2": {
        "choices": [
            {
                "name": "Explain what?",
                "text": "Explain what? Snow equals a ginormous twister that takes out Arcadia Bay? You're high.",
                "next": "campus_2_bridge"
            },
            {
                "name": "I doubt it...",
                "text": "I don't see how. It's so friggin' random...",
                "next": "campus_2_bridge"
            }
        ]
    },
    "campus_2_bridge": {
        "text": "Wake up, Max. You saved my life twice now. You altered the course of my destiny, yours, and whoever! Do you know about Chaos Theory?",
        "next": "campus_3"
    },
    "campus_3": {
        "choices": [
            {
                "name": "What do you know?",
                "text": [
                    "What do you know about Chaos Theory, Miss \"I Hate Math\"?",
                    "Five years ago, asswipe. Some people change...and your situation is the perfect storm for quantum physics."
                ],
                "next": "campus_3_bridge"
            },
            {
                "name": "Uh...",
                "text": [
                    "Uh...it means \"shit happens,\" right?",
                    "No, \"crazy shit happens.\" Because it can. And will."
                ],
                "next": "campus_3_bridge"
            }
        ]
    },
    "campus_3_bridge": {
        "text": [
            "Why me? I'm just a geek girl in some small town...",
            "A perfect example of \"strange attractors.\" Don't they teach you kids anything at Blackwell? We have a tornado, rewind power, and freak snow...hello, Armageddon! So let's party with your power, rock star!",
            "Like you said, Professor Price: a superhero needs a sidekick.",
            "How can it be such a shitty week and yet one of the best of my life?",
            "Because we're back in action again!"
        ],
        "next": "hallway2_1"
    },

    // ===================== Hallway (before class) =====================
    "hallway2_1": {
        "text": [
            "I have a little time before Mr. Jefferson's class, so...I can do some wandering.",
            "So, are you going to that Vortex Club party?",
            "Like I'd miss it! I have the sweetest outfit...",
            "That snow was so insane!",
            "Seriously. Hello, climate change!"
        ],
        "next": "david_1"
    },
    "david_1": {
        "choices": [
            {
                "name": "Talked to David",
                "text": "Excuse me, Mr. Madsen?",
                "next": "david_2"
            },
            {
                "name": "Tried to go through the doors",
                "text": "Max, can we talk?",
                "next": "david_2"
            }
        ]
    },
    "david_2": {
        "choices": [
            {
                "name": "Stayed hidden/Blamed Chloe",
                "text": "Do you mind if we talk about what happened yesterday with Chloe?",
                "next": "david_2a"
            },
            {
                "name": "Took the blame for Chloe/came out of hiding to intervene",
                "text": "I know things got a little heated yesterday in Chloe's room... Was that really your reefer?",
                "next": "david_2b"
            }
        ]
    },
    "david_2a": {
        "choices": [
            {
                "name": "You hit Chloe.",
                "text": "You hit Chloe.",
                "next": "david_2a2"
            },
            {
                "name": "I don't think so.",
                "text": "I don't think so. And you hit Chloe.",
                "next": "david_2a2"
            }
        ]
    },
    "david_2a2": {
        "choices": [
            {
                "name": "(Stayed hidden)",
                "text": "I'm sure she told you why. Did she mention...she probably stole one of my guns?",
                "next": "david_3"
            },
            {
                "name": "(Didn't hide)",
                "text": "She got in my face and called me a \"pig.\" And I was still wrong. I'll make it up to Chloe. And I'm sorry.",
                "next": "david_3"
            }
        ]
    },
    "david_2b": {
        "choices": [
            {
                "name": "Yes.",
                "text": "Yes, it was. You know that marijuana is almost legal in Oregon. I can get it at Blackwell.",
                "next": "david_2b2"
            },
            {
                "name": "No.",
                "text": "No, it belonged to a friend of mine.",
                "next": "david_2b2"
            }
        ]
    },
    "david_2b2": {
        "text": [
            "Are you going to bust me now, Mr. Madsen?",
            "Even I'm not that much of an asshole... And I am sorry about yesterday. I was wrong, but upset. Cannabis is not a big deal to you, but it has been to Chloe."
        ],
        "next": "david_3"
    },
    "david_3": {
        "text": [
            "You're a combat veteran. She's no threat to you.",
            "If I didn't care about her, I wouldn't care at all. When I was her age, I was out raising a lot more hell. She's better than that. All you kids are. So is Kate Marsh."
        ],
        "next": "david_4"
    },
    "david_4": {
        "choices": [
            {
                "name": "Took a photo",
                "text": "",
                "next": "david_4a_sub"
            },
            {
                "name": "Intervened",
                "text": "",
                "next": "david_4b_sub"
            }
        ]
    },
    "david_4a_sub": {
        "choices": [
            {
                "name": "You treat Kate bad.",
                "text": "But you treat Kate pretty bad...",
                "next": "david_4a_resp"
            },
            {
                "name": "What about Kate?",
                "text": "What about Kate?",
                "next": "david_4a_resp"
            }
        ]
    },
    "david_4a_resp": {
        "text": [
            "I shouldn't have said anything... You know about that video going around.",
            "Is that why you hassled Kate yesterday? I took a photo of that moment for surveillance sake.",
            "Soldier, you don't have the facts. You think I'm a hypocrite because I want cameras around here for the safety of the students?"
        ],
        "next": "david_5"
    },
    "david_4b_sub": {
        "choices": [
            {
                "name": "You treat Kate bad.",
                "text": "But you treat Kate pretty bad...",
                "next": "david_4b_resp"
            },
            {
                "name": "What about Kate?",
                "text": "What about Kate?",
                "next": "david_4b_resp"
            }
        ]
    },
    "david_4b_resp": {
        "text": [
            "You stepped between us at a pretty bad time. She's another matter entirely.",
            "Kate hasn't done anything wrong.",
            "Max, this isn't just about Kate Marsh. My concern is for the safety of all Blackwell students. Including you."
        ],
        "next": "david_5"
    },
    "david_5": {
        "text": [
            "That'll take more than surveillance cameras.",
            "It will take more than Ms. Grant and her petition to find missing students.",
            "Isn't that your responsibility as head of security? Unless you know something about Rachel Amber that nobody else does...",
            "I don't want to fight with you anymore. I don't want to fight with anyone anymore... That's all, Max."
        ],
        "next": "hallway2_2"
    },
    "hallway2_2": {
        "text": [
            "I still have time...I could go see Warren playing mad scientist in the lab.",
            "I saw Victoria and her friends shopping for the party.",
            "That reminds me, I have to score some weed from Nathan..."
        ],
        "next": "sciencelab_1"
    },

    // ===================== Science Lab =====================
    "sciencelab_1": {
        "text": [
            "Think, big brain, think...",
            "This can't be that hard...",
            "Yes, I am a scientist. Fuck..."
        ],
        "next": "jeff_1"
    },

    // ===================== Jefferson's Class =====================
    "jeff_1": {
        "text": [
            "You have to talk to me, Kate.",
            "Why? It's all over... like me.",
            "Knock off this martyr crap.",
            "What do you want from me?",
            "I want you to be honest.",
            "Nobody believes me anyway…",
            "Stop acting so brittle!",
            "Being on a viral video does that...",
            "Maybe this is your way of getting attention...",
            "That's really mean, Mr. Jefferson. You just don't get it... Just leave me alone!",
            "So you can't help me?",
            "I'm trying. But you have to understand my position...",
            "Why? You don't understand mine. Nobody does...nobody..."
        ],
        "next": "jeff_2"
    },
    "jeff_2": {
        "choices": [
            {
                "name": "Talked to Jefferson",
                "text": [
                    "Sorry to bother you, Mr. Jefferson.",
                    "I'm only bothered when you avoid turning in photos. But you know this. So, what can I do for you, Max?"
                ],
                "next": "jeff_3"
            },
            {
                "name": "Tried to enter classroom after Kate leaves",
                "text": [
                    "Excuse me, Max...can you come over here?",
                    "Sure.",
                    "You look worried...is everything okay?"
                ],
                "next": "jeff_3"
            }
        ]
    },
    "jeff_3": {
        "text": "Just between you and me, I'm worried about Kate Marsh.",
        "next": "jeff_4"
    },
    "jeff_4": {
        "choices": [
            {
                "name": "Took photo",
                "text": "You're not the only one. Do you have something you want to tell me?",
                "next": "jeff_4a"
            },
            {
                "name": "Intervened",
                "text": "That's no secret. Word on the street is that you and Kate had a little confrontation with our security chief yesterday.",
                "next": "jeff_4b"
            }
        ]
    },
    "jeff_4a": {
        "choices": [
            {
                "name": "Saw David and Kate.",
                "text": [
                    "I saw David Madsen harassing Kate yesterday. He was scaring her.",
                    "Mr. Madsen confuses fear with security. I'm sorry Kate had to be a target of his paranoia. If you had proof, I could talk to Principal Wells...",
                    "Oh, yes. I have an actual photograph, for once.",
                    "Let me see that photo after class. You're already thinking like a real photographer. And, Max, I promise this matter is being discussed by the faculty."
                ],
                "next": "jeff_5"
            },
            {
                "name": "Nevermind.",
                "text": [
                    "Not exactly. Nevermind, sorry. I have to go and work...on my photo.",
                    "You can talk to me anytime. And, Max, can I talk to you about Kate?"
                ],
                "next": "jeff_5"
            }
        ]
    },
    "jeff_4b": {
        "choices": [
            {
                "name": "David Madsen.",
                "text": [
                    "I stepped in between David Madsen barking all up in Kate's face about something... She doesn't deserve that.",
                    "Of course not. Mr. Madsen isn't the most gentle soul. Do you have proof he instigated the situation?",
                    "My word isn't good enough? The one time I choose not to take a picture...",
                    "Always take the shot. My number one rule of photography. And, Max, I promise this matter is being discussed by the faculty."
                ],
                "next": "jeff_5"
            },
            {
                "name": "Nevermind.",
                "text": [
                    "Not exactly. Nevermind, sorry. I have to go and work...on my photo.",
                    "You can talk to me anytime. And, Max, can I talk to you about Kate?"
                ],
                "next": "jeff_5"
            }
        ]
    },
    "jeff_5": {
        "text": "I assume you know about this viral video?",
        "next": "jeff_6"
    },
    "jeff_6": {
        "choices": [
            {
                "name": "Everybody knows.",
                "text": "Everybody knows. That's why I wanted to see you. Kate is being humiliated daily.",
                "next": "jeff_6_bridge"
            },
            {
                "name": "Kate is freaked out.",
                "text": "Kate is freaked out by all of this... She can't do homework while she's being tormented on a daily basis.",
                "next": "jeff_6_bridge"
            }
        ]
    },
    "jeff_6_bridge": {
        "text": "What if Kate brought this on herself? She means well, but maybe she doth protest too much... She seems like she's holding back the truth. Have you talked to her?",
        "next": "jeff_7"
    },
    "jeff_7": {
        "choices": [
            {
                "name": "Yes. (answered Kate's call)",
                "text": "Yes, I talked to her on the phone today. She needs friends and support now.",
                "next": "jeff_8"
            },
            {
                "name": "Yes. (ignored Kate's call)",
                "text": "Yes, I talked to her this morning. She needs friends and support now.",
                "next": "jeff_8"
            },
            {
                "name": "Missed call.",
                "text": "I will. She's mad I missed her call today.",
                "next": "jeff_8"
            },
            {
                "name": "No.",
                "text": "No...",
                "next": "jeff_8"
            }
        ]
    },
    "jeff_8": {
        "text": [
            "I just don't want Kate Marsh to be the next Rachel Amber...",
            "Rachel Amber? What does she have to do with Kate?",
            "With all her \"Missing Persons\" posters around, it's hard not to think of her..."
        ],
        "next": "jeff_9"
    },
    "jeff_9": {
        "choices": [
            {
                "name": "Reported Nathan",
                "text": "I miss Rachel, too. But think about yourself, Max. Principal Wells told me about what you said happened in the bathroom...",
                "next": "jeff_9a"
            },
            {
                "name": "Hid the truth",
                "text": "Rachel was nothing like Kate. Principal Wells said you had something on your mind you wouldn't tell him. You care to share?",
                "next": "jeff_9b"
            }
        ]
    },
    "jeff_9a": {
        "choices": [
            {
                "name": "Nathan Prescott.",
                "text": [
                    "It did happen. Nathan Prescott had a gun in the girls' bathroom yesterday.",
                    "This is a serious accusation, Max.",
                    "So, you don't believe me? I would never make something like this up."
                ],
                "next": "jeff_9_trust"
            },
            {
                "name": "That was private.",
                "text": [
                    "That was a private conversation. Not that I wouldn't tell you...",
                    "This is a serious accusation, Max.",
                    "So, you don't believe me? I would never make something like this up."
                ],
                "next": "jeff_9_trust"
            }
        ]
    },
    "jeff_9b": {
        "choices": [
            {
                "name": "Nathan with a gun.",
                "text": [
                    "I saw Nathan with a gun in the girls' bathroom yesterday... I was too scared to go to Principal Wells.",
                    "This is a serious accusation, Max.",
                    "So, you don't believe me? I would never make something like this up."
                ],
                "next": "jeff_9_trust"
            },
            {
                "name": "Not now.",
                "text": [
                    "Not right now. I'll tell you everything as soon as I figure it out...",
                    "I'd like to believe that, Max. It just seems like there's a lot of drama around you this week."
                ],
                "next": "jeff_10"
            }
        ]
    },
    "jeff_9_trust": {
        "choices": [
            {
                "name": "Stayed hidden/blamed Chloe",
                "text": "I'd like to believe that, Max. It just seems like there's a lot of drama around you this week.",
                "next": "jeff_10"
            },
            {
                "name": "Took the blame/came out of hiding to intervene",
                "text": "I hope so, Max. But it's easy to point fingers. If Mr. Madsen claims you might be a pot dealer as he did, should I believe him?",
                "next": "jeff_10"
            }
        ]
    },
    "jeff_10": {
        "text": [
            "Listen, should I--?",
            "Excuse me, Max.",
            "Hello? Yes? Uh...hold on. I have to take this, so just go into class and I'll be there soon.",
            "Yes...",
            "Mm-hm...",
            "Uh-huh...",
            "Sure, okay...",
            "Listen, I do have a class I have to teach, I have to go...",
            "Mm-hmm. Okay, I'll do that...",
            "Oh, I know. That makes sense...",
            "Huh?",
            "Seriously, I have to hang up now...",
            "Let's talk about this later...",
            "We'll talk later okay? I have to go...",
            "Because I can't have this conversation with you right now, okay?",
            "Would you please just hang up the phone?",
            "Okay."
        ],
        "next": "jeff_11"
    },
    "jeff_11": {
        "text": [
            "Make me beautiful, Hayden.",
            "Vogue...vogue...vogue...",
            "Dana, you are out of control. Turn left, then right. Show me the love...",
            "How do I look, Taylor?",
            "You look like ass.",
            "Do you think Max will be pissed we're sitting at her desk?",
            "Oh, I'm sure she'll report us to the principal. Like I give a flying fuck.",
            "Or she'll run to Mr. Jefferson. Like he gives a shit.",
            "Like anybody does. Max is such a little--",
            "Shh! I think she can hear us."
        ],
        "next": "jeff_12"
    },
    "jeff_12": {
        "choices": [
            {
                "name": "Reported Nathan",
                "text": "Better be quiet, Victoria. We have a master snitch and liar here.",
                "next": "jeff_12a"
            },
            {
                "name": "Hid the truth",
                "text": "Here comes the mysterious Max. Disguised as a pixie hipster.",
                "next": "jeff_12b"
            }
        ]
    },
    "jeff_12a": {
        "choices": [
            {
                "name": "Made fun of Victoria",
                "text": [
                    "And paparazzi. I want that photo, whore. Or I get nasty.",
                    "Too late.",
                    "Oh, burn! Max is so fearless when she has backup.",
                    "Right. Can I sit at my table now?",
                    "Don't get cocky. This isn't over.",
                    "In fact, shit's just starting, Max."
                ],
                "next": "jeff_13"
            },
            {
                "name": "Comforted Victoria",
                "text": [
                    "Did you think we were best friends forever or something?",
                    "Not at all, Victoria.",
                    "Max is such an attention-whore.",
                    "You would know. Can I sit down now?",
                    "Oh, please do. Take a selfie of this moment.",
                    "Yeah, Max. So I won't forget you."
                ],
                "next": "jeff_13"
            }
        ]
    },
    "jeff_12b": {
        "choices": [
            {
                "name": "Made fun of Victoria",
                "text": [
                    "Or paparazzi. I want that photo, whore. Or I get nasty.",
                    "Too late.",
                    "Meow! Bring out the claws. I love seeing chicks fight.",
                    "Can I sit down, please?",
                    "I don't know...can you?",
                    "Let her have the desk. That's all she's got..."
                ],
                "next": "jeff_13"
            },
            {
                "name": "Comforted Victoria",
                "text": [
                    "Like all the other precious twee artists here.",
                    "You really nailed me.",
                    "Meow! Bring out the claws. I love seeing chicks fight.",
                    "Right. Can I sit at my table now?",
                    "Max thought we were going to be buds. Fucking haha."
                ],
                "next": "jeff_13"
            }
        ]
    },
    "jeff_13": {
        "text": [
            "Assholes.",
            "Okay, why is David taking photos of Kate? Now, this is so wrong. And weird...",
            "What up, Max?",
            "Hey, Warren!",
            "I saw Kate earlier and her eyes were puffy from crying.",
            "Kate has a lot on her plate...",
            "I didn't know what to say, and she didn't tell me anything...",
            "Okay, I know you love me, but if you're not in this class, beat it. Everybody else, please sit down.",
            "Maybe I'll see you later?",
            "We have a lot to cover today, and so little time, as usual. I see all the usual suspects here... Anybody seen Kate Marsh?",
            "I think everybody has seen Kate Marsh by now.",
            "She's...not feeling good.",
            "Sounds like you're giggling about a video gone viral. Maybe it involves a student or a friend. I wonder how it would feel to have false images of yourself shot out all over the world for people to judge..."
        ],
        "next": "jeff_14"
    },
    "jeff_14": {
        "text": [
            "Usually people need something to judge so they never take a good look at themselves. We can thank reality TV for some of that. In the end, we can only blame ourselves for participating... Speaking of participation, there are a few souls here who have yet to enter a photo in the contest. Like Max Caulfield, for example. Who I know can't wait to enter, right? I'm sure you read the syllabus like it was a Harry Potter book, so you must know today we're studying chiaroscuro; that beautiful word about the contrast between light and dark, the shadowplay that gives photography such...visual power. It's basic yin and yang. Black and white images are effective precisely because of their contrast. Although we don't technically \"see\" in monochrome--",
            "Yo, some crazy shit is going down at the girls' dorm! Check it!",
            "Zachary, do not come into my class like that ever again--",
            "Listen! Everybody remain seated--",
            "Dismissed..."
        ],
        "next": "dorm2_bridge"
    },

    // ===================== Dormitories (Kate on the roof) =====================
    "dorm2_bridge": {
        "text": [
            "Did you see that?",
            "Is this for real?",
            "Bitch flipped out!",
            "I didn't think she was that messed up...",
            "Oh, my God!",
            "Who is that up there?",
            "Oh, no! Is that Kate?",
            "I hope not.",
            "Holy shit! That chick is right on the ledge!",
            "If she jumps, she might not die...",
            "Yes, she will.",
            "I cannot believe this, Brooke...",
            "No! No!",
            "How long has she been up there?",
            "Long enough.",
            "Don't! Come down! Get down!",
            "Poor Kate. That fucking viral video.",
            "Man, this is so not why I came to Blackwell!",
            "Kate! No! Oh, God, I have to do something to help her!",
            "She can't die. She can't!",
            "Not again...not now...",
            "I have to try something...I won't be able to rewind again and again...",
            "Keep...going...Max... You...can...do it...",
            "Yes..."
        ],
        "next": "roof_intro"
    },

    // ===================== Dormitory Roof =====================
    "roof_intro": {
        "text": [
            "What are you doing here, Max?",
            "Stop! Don't come near me!",
            "Not now... It won't work... I don't have any power... Now I have to do this by myself...?"
        ],
        "next": "roof_1"
    },
    "roof_1": {
        "choices": [
            {
                "name": "Took photo",
                "text": "Did you come to get another Pulitzer shot like yesterday, Max?",
                "next": "roof_1_photo"
            },
            {
                "name": "I've been bullied, too.",
                "text": [
                    "I've been bullied too, Kate. And even when I got picked on, I stood up for myself.",
                    "I know you only stand up for yourself. That's why you let David get in my face. Like everybody here...",
                    "That's not true. People want to help you.",
                    "Yes, they want to help kill me. And they can get their wish..."
                ],
                "next": "roof_2"
            },
            {
                "name": "I was scared.",
                "text": [
                    "I'm so sorry, Kate. I thought I could help, but not by taking a picture. I'm ashamed...",
                    "I know you're scared of David. He's scary. And I know you only want to help...",
                    "I let you down and I'm sorry. I only want to help you.",
                    "I wish you could... It's too late now... There's nothing for me here anymore..."
                ],
                "next": "roof_2"
            },
            {
                "name": "I had no idea.",
                "text": [
                    "I had no idea what was going on between you and David...",
                    "Really? So you took a picture to find out?",
                    "How else would I find out?",
                    "You'll find out if I jump right now... Everybody will...",
                    "Kate, don't! Please!",
                    "Get out of here, Max, you can't change my mind. My life sucks and I want it over. Now."
                ],
                "next": "roof_2"
            },
            {
                "name": "Intervened",
                "text": [
                    "Max, seriously, don't come near me. I will jump.",
                    "Okay, okay. I'm right here. Kate, please...",
                    "Oh, Max, I know you want to help me... I love that you stepped up to David, but it doesn't matter now. Nothing matters."
                ],
                "next": "roof_2"
            }
        ]
    },
    "roof_1_photo": {
        "text": [
            "I only wanted proof that David was harassing you!",
            "More like you wanted another shot for the Max Caulfield scrapbook. You want another now? Huh?",
            "No! Please, Kate, you know me better than that...and I know you don't want to jump.",
            "But I do. My life is already over..."
        ],
        "next": "roof_2"
    },
    "roof_2": {
        "choices": [
            {
                "name": "Things will get better.",
                "text": "Don't worry, Kate, things will get better. I promise.",
                "next": "roof_end"
            },
            {
                "name": "You matter, not just to me.",
                "text": "You matter. And not just to me.",
                "next": "roof_end"
            }
        ]
    },
    "roof_end": {
        "text": "I do want to believe that...",
        "next": "roof_outcome"
    },
    "roof_outcome": {
        "choices": [
            {
                "name": "(Saved Kate)",
                "text": "",
                "set": {
                    "name": "saved_kate",
                    "type": "set",
                    "value": true
                },
                "next": "principal_1"
            },
            {
                "name": "(Couldn't save Kate)",
                "text": "",
                "set": {
                    "name": "saved_kate",
                    "type": "set",
                    "value": false
                },
                "next": "principal_1"
            }
        ]
    },

    // ===================== Principal's Office =====================
    "principal_1": {
        "text": "",
        "next": [
            { "name": "saved_kate", "type": "eq", "value": true, "node": "principal_1_saved" },
            { "name": "saved_kate", "type": "eq", "value": false, "node": "principal_1_notsaved" }
        ]
    },
    "principal_1_saved": {
        "text": [
            "Now, I know today was difficult for everybody, but I'm so proud of the way Blackwell pulled together to save a young girl's life. Of course, you're quite the hero for getting Kate to come down, Max.",
            "I didn't do much...",
            "She's modest. Like a real hero.",
            "Yeah. \"Real hero.\""
        ],
        "next": "principal_2"
    },
    "principal_1_notsaved": {
        "text": "I know this isn't pleasant for any of us, but we have to go over what happened before Miss Marsh...before she did what she did. Officer Berry will be taking notes for the official police inquiry. I'm sure you'll give him your full cooperation. Such a tragedy...but there must be a reason for everything. We need to find out why Kate Marsh would be driven to such desperate action.",
        "next": "principal_2"
    },
    "principal_2": {
        "text": "As principal of Blackwell Academy, I take my duties seriously. I take the well-being of every student more seriously. What happened today should never happen in a hall of wisdom and knowledge. Mr. Madsen, as our head of security here, those roof doors should always be locked. That's just standard operating procedure. They were not. And that is indeed your responsibility. Mr. Jefferson, I know you can't be expected to know what your students are going through, but Kate has assisted you in class, so you should've known something was amiss. Mr. Prescott, since you are responsible for the Vortex Club parties, and since Miss Marsh did attend your last party, you'll have to answer some more questions. Miss Caulfield, why exactly were you on the roof with Kate Marsh? Did she tell you her plan? Or anything at all? Please, tell us everything.",
        "next": "principal_3"
    },
    "principal_3": {
        "choices": [
            {
                "name": "NATHAN DOSED HER",
                "text": [
                    "All I know is that Kate was at a party and Nathan dosed her. She got wasted and kissed some boys on a viral video without a clue.",
                    "I dosed her? Without a clue? Have you seen the video? Whatever. Kate was loaded and playing the field—",
                    "You're a liar. You told Kate you took her to the emergency room!",
                    "I said I was going to take her to the ER. She sobered up eventually.",
                    "Bullshit! Something happened to her, and you know it. How about we talk about you waving a gun in the girls' bathroom—",
                    "Hey, that's total slander! I could sue you and this school so fast!...I already have a personal lawyer."
                ],
                "next": "principal_A_nested"
            },
            {
                "name": "DAVID BULLIED HER",
                "text": [
                    "Mr. Madsen was bullying Kate.",
                    "Oh, grow up...",
                    "Excuse me, I was there! I saw you getting in her face!",
                    "You have no idea what you saw. Kate Marsh was involved with a bad crowd. I was trying to find out who...",
                    "Kate had a double life. I was super shocked when I found out.",
                    "No, you were part of the crowd. And like I said, I personally saw David physically harass Kate Marsh.",
                    "You lying little..."
                ],
                "next": "principal_B_nested"
            },
            {
                "name": "JEFFERSON MADE HER CRY",
                "text": [
                    "I saw Mr. Jefferson talking to Kate right before our class... then she ran off crying...",
                    "Mark, I do know that Miss Marsh has assisted you on class events.",
                    "Kate... Miss Marsh... has been very withdrawn lately. And I assume this awful video was the cause. I hated seeing the students laugh at her."
                ],
                "next": "principal_C_nested"
            }
        ]
    },

    // --- Branch A: Nathan dosed her ---
    "principal_A_nested": {
        "choices": [
            {
                "name": "Reported Nathan",
                "text": [
                    "Careful, Mr. Prescott. I have been told of this alleged gun incident. And I have to admit that the video in question was sent to me by multiple sources.",
                    "Including me.",
                    "And since Mr Prescott does appear prominently in the video and was responsible for the party, I have no choice but to suspend him until further notice.",
                    "Whatever. See you in court."
                ],
                "next": "principal_break"
            },
            {
                "name": "Hid the truth",
                "text": "Wait, Max. You told me that nothing happened yesterday. Are you just making things up? How can I trust you?",
                "next": "principal_A_hid"
            }
        ]
    },
    "principal_A_hid": {
        "choices": [
            {
                "name": "Blamed Chloe/Stayed hidden",
                "text": [
                    "I was afraid yesterday, but I have to tell the truth.",
                    "I do understand that. And since Mr Prescott does appear prominently in the video and was responsible for the party, I have no choice but to suspend him until further notice."
                ],
                "next": "principal_break"
            },
            {
                "name": "Took the blame/Came out to intervene",
                "text": [
                    "You can't. She's smoking and selling dope, not saving lives!",
                    "No, I'm not and that has nothing to do with Kate Marsh!",
                    "I'll have to investigate to see if this accusation is true. Therefore Max, I'm obliged to contact your parents and suspend you for a few days."
                ],
                "next": "principal_break"
            }
        ]
    },

    // --- Branch B: David bullied her ---
    "principal_B_nested": {
        "choices": [
            {
                "name": "Blamed Chloe/Stayed hidden",
                "text": "Are you going to take this troublemaker's word over your security officer?",
                "next": "principal_B_a"
            },
            {
                "name": "Took the blame/Came out to intervene",
                "text": [
                    "Are you going to take this junkie's word over your security officer? I know she smokes and deals... marijuana.",
                    "What? That has nothing to do with Kate!"
                ],
                "next": "principal_B_b"
            }
        ]
    },
    "principal_B_a": {
        "choices": [
            {
                "name": "Took photo",
                "text": [
                    "Except I have proof.",
                    "Here's a photo I took of David and Kate yesterday.",
                    "That's not—not proof.",
                    "Hold on, this isn't a courtroom. But I feel it would be in the best interest of Blackwell and this situation to put you on temporary leave... We will continue this conversation later."
                ],
                "next": "principal_photo_wells"
            },
            {
                "name": "Intervened",
                "text": [
                    "And he should take the word of somebody who harasses students?",
                    "Max, I'm afraid this won't be solved here without proof and a thorough investigation. Now, if you have anything else to say..."
                ],
                "next": "principal_break"
            }
        ]
    },
    "principal_B_b": {
        "choices": [
            {
                "name": "Took photo",
                "text": [
                    "Here's a photo I took of David and Kate yesterday.",
                    "That's not—not proof.",
                    "Hold on, this isn't a courtroom. But I feel it would be in the best interest of Blackwell and this situation to put you on temporary leave... We will continue this conversation later."
                ],
                "next": "principal_photo_wells"
            },
            {
                "name": "Intervened",
                "text": "",
                "next": "principal_B_b_intervened"
            }
        ]
    },
    "principal_B_b_intervened": {
        "choices": [
            {
                "name": "Reported Nathan",
                "text": "Max, falsely accusing other people seems to be a habit with you... I trust my security officer. I'll have to investigate to see if this accusation is true. Therefore Max, I'm obliged to contact your parents and suspend you for a few days.",
                "next": "principal_break"
            },
            {
                "name": "Hid the truth",
                "text": "Max, I'm afraid this won't be solved here without proof and a thorough investigation. Now, if you have anything else to say...",
                "next": "principal_break"
            }
        ]
    },
    "principal_photo_wells": {
        "text": "",
        "next": [
            { "name": "saved_kate", "type": "eq", "value": true, "node": "principal_photo_saved" },
            { "name": "saved_kate", "type": "eq", "value": false, "node": "principal_photo_notsaved" }
        ]
    },
    "principal_photo_saved": {
        "text": [
            "Hopefully with Miss Marsh when she's out of the hospital.",
            "Are you fucking kidding me? This is major bullshit! I led troops into battle and you're letting this punk lead you?",
            "No. I am sorry, David..."
        ],
        "next": "principal_break"
    },
    "principal_photo_notsaved": {
        "text": [
            "When the police finish their own investigation.",
            "Are you fucking kidding me? This is major bullshit! I led troops into battle and you're letting this punk lead you?",
            "No. I am sorry, David..."
        ],
        "next": "principal_break"
    },

    // --- Branch C: Jefferson made her cry ---
    "principal_C_nested": {
        "choices": [
            {
                "name": "Answered Kate's phone call",
                "text": "She told me Max was the only one who believed her, would take her calls and actually listen to her.",
                "next": "principal_C_2"
            },
            {
                "name": "Ignored Kate's phone call",
                "text": "She was upset Miss Caulfield didn't return her calls. She felt rejected by the school...",
                "next": "principal_C_2"
            }
        ]
    },
    "principal_C_2": {
        "text": [
            "She shouldn't have asked to be on video macking with some dudes...",
            "You ass. She didn't ask for any of this...",
            "No, on the contrary. Max was right to bring this up. Now, I wanted to help, but I guess I was too late...",
            "Well now, this is problematic. The publicity is rising and perhaps... you shouldn't represent Blackwell at the \"Everyday Heroes\" contest in San Francisco...",
            "Are you serious?",
            "I am. We don't need any negative press about that event. And we need to involve the Academy in possible disciplinarian measures for you.",
            "I understand. There are bigger things at stake than me. The life of a young girl for one..."
        ],
        "next": "principal_C_david"
    },
    "principal_C_david": {
        "choices": [
            {
                "name": "Told Jefferson about David",
                "text": [
                    "Maybe you should investigate other staff members? Max told me she knew things about Mr. Madsen...",
                    "Let Max speak for herself. Everything we talked about here will be looked into."
                ],
                "next": "principal_sign"
            },
            {
                "name": "(Said nothing)",
                "text": "",
                "next": "principal_sign"
            }
        ]
    },

    // --- Shared: break, then sign ---
    "principal_break": {
        "text": "Excuse me, I think Max and Nathan need a break before we grill them further.",
        "next": [
            { "name": "saved_kate", "type": "eq", "value": true, "node": "principal_break_saved" },
            { "name": "saved_kate", "type": "eq", "value": false, "node": "principal_break_notsaved" }
        ]
    },
    "principal_break_saved": {
        "text": [
            "A friend and student just tried to kill herself... They don't need this forum right now.",
            "Yes, I'm kinda devastated right now. I'd like to be with my family."
        ],
        "next": "principal_sign"
    },
    "principal_break_notsaved": {
        "text": [
            "A friend and fellow student is dead... They don't need this forum right now.",
            "Yes, I'm kinda devastated right now. I'd like to be with my family."
        ],
        "next": "principal_sign"
    },
    "principal_sign": {
        "text": [
            "All right, Miss Caulfield, please sign here to confirm what you've told us. I'll continue this investigation from there.",
            "My head is killing me, but I think I can use my power again.",
            "Well, I think we know less now than when we started. We'll be assisting the police with further inquiries. I know this has been a stressful day... I wish I had the power to change it all for the better... So, thank you for coming in."
        ],
        "next": "warren_end_1"
    },

    // ===================== Main Campus - With Warren =====================
    "warren_end_1": {
        "text": "",
        "next": [
            { "name": "saved_kate", "type": "eq", "value": true, "node": "warren_end_saved" },
            { "name": "saved_kate", "type": "eq", "value": false, "node": "warren_end_notsaved" }
        ]
    },
    "warren_end_saved": {
        "text": [
            "I couldn't even believe it was happening. It was literally slow motion as I grabbed her hand...and then I could feel her grabbing mine...",
            "Max, that was the greatest thing I've ever seen! Ever! You reached out, she reached out...hugs, tears, applause! Like a superhero!",
            "Not quite. Look at me, I'm a mess.",
            "You're glowing. Seriously! A human halo. I'm pretty sure you earned your wings today.",
            "I'm still worried about Kate. She did try to kill herself. All over a video...",
            "\"Viral\" is the right word. Like a disease.",
            "So, you watched it?",
            "Just one...and a half times..."
        ],
        "next": "warren_end_2"
    },
    "warren_end_notsaved": {
        "text": [
            "I just...can't believe it. It's like it wasn't even real...watching her drop like a weight... I really thought I could save her...like a superhero...",
            "Come on, Max. Do not for a second blame yourself. Kate was on that roof for her reasons, not yours.",
            "My hand just reached out...",
            "Stop it. You were the only one with balls enough to run to the roof. You were the only one who cared.",
            "Yeah, I sure made a big fucking difference. Maybe if more people cared...better people than me...",
            "You're the best person around...",
            "Warren, I screwed up today.",
            "That makes no logical sense."
        ],
        "next": "warren_end_2"
    },
    "warren_end_2": {
        "text": [
            "Warren, I don't mean to sound weird, but there's something ominous going on at Blackwell...",
            "Today proves that.",
            "And I'm working on proof that Kate Marsh is connected to Rachel Amber...somehow. Along with Nathan and Mr. Madsen.",
            "I'm not a big conspiracy guy, but I wouldn't doubt it. Nathan did scare me yesterday and Madsen is a straight-up dickhead. So...what do you think is really happening?",
            "What the hell is this...?",
            "The weather confirms this weird day... Feel that chill...",
            "Max, there was no eclipse scheduled today... I would know. I would.",
            "I believe you, Warren... I'll believe anything this week..."
        ],
        "next": "epilogue"
    },

    // ===================== Epilogue =====================
    "epilogue": {
        "text": [
            "Sorry about Kate. I hope you're ok.",
            "This eclipse freaks me out...",
            "Let's find out what's going on!",
            "Together!"
        ]
    }
};
