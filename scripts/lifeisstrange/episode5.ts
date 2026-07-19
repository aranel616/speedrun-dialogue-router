import {Script} from "../../types";

export const script: Script = {
    // ============ Inherited decisions (set once at episode start) ============
    // Carry in from Episodes 1-4; constant for the whole path so occurrences
    // route consistently. In a full-game run these get driven by prior episodes.
    "start": {
        "choices": [
            {"name": "(Saved Kate)", "text": "", "set": {"name": "saved_kate", "type": "set", "value": true}, "next": "setup5_blame"},
            {"name": "(Didn't save Kate)", "text": "", "set": {"name": "saved_kate", "type": "set", "value": false}, "next": "setup5_blame"}
        ]
    },
    "setup5_blame": {
        "choices": [
            {"name": "(Blamed Nathan)", "text": "", "set": {"name": "blamed_who", "type": "set", "value": "nathan"}, "next": "setup5_warren"},
            {"name": "(Blamed David)", "text": "", "set": {"name": "blamed_who", "type": "set", "value": "david"}, "next": "setup5_warren"},
            {"name": "(Blamed Jefferson)", "text": "", "set": {"name": "blamed_who", "type": "set", "value": "jefferson"}, "next": "setup5_warren"}
        ]
    },
    "setup5_warren": {
        "choices": [
            {"name": "(Warren beat up Nathan)", "text": "", "set": {"name": "warren_beat_nathan", "type": "set", "value": true}, "next": "setup5_vic"},
            {"name": "(Max stopped Warren)", "text": "", "set": {"name": "warren_beat_nathan", "type": "set", "value": false}, "next": "setup5_vic"}
        ]
    },
    "setup5_vic": {
        "choices": [
            {"name": "(Victoria was kidnapped)", "text": "", "set": {"name": "victoria_kidnapped", "type": "set", "value": true}, "next": "setup5_reported"},
            {"name": "(Victoria wasn't kidnapped)", "text": "", "set": {"name": "victoria_kidnapped", "type": "set", "value": false}, "next": "setup5_reported"}
        ]
    },
    "setup5_reported": {
        "choices": [
            {"name": "(Reported Nathan)", "text": "", "set": {"name": "reported_nathan", "type": "set", "value": true}, "next": "setup5_dhit"},
            {"name": "(Hid the truth)", "text": "", "set": {"name": "reported_nathan", "type": "set", "value": false}, "next": "setup5_dhit"}
        ]
    },
    "setup5_dhit": {
        "choices": [
            {"name": "(David hit Chloe)", "text": "", "set": {"name": "david_hit_chloe", "type": "set", "value": true}, "next": "setup5_sided"},
            {"name": "(David didn't hit Chloe)", "text": "", "set": {"name": "david_hit_chloe", "type": "set", "value": false}, "next": "setup5_sided"}
        ]
    },
    "setup5_sided": {
        "choices": [
            {"name": "(Sided with Chloe)", "text": "", "set": {"name": "sided_with_chloe", "type": "set", "value": true}, "next": "setup5_altchloe"},
            {"name": "(Sided with David)", "text": "", "set": {"name": "sided_with_chloe", "type": "set", "value": false}, "next": "setup5_altchloe"}
        ]
    },
    "setup5_altchloe": {
        "choices": [
            {"name": "(Accepted alternate Chloe's request)", "text": "", "set": {"name": "accepted_alt_chloe", "type": "set", "value": true}, "next": "setup5_frank"},
            {"name": "(Refused alternate Chloe's request)", "text": "", "set": {"name": "accepted_alt_chloe", "type": "set", "value": false}, "next": "setup5_frank"}
        ]
    },
    "setup5_frank": {
        "choices": [
            {"name": "(Chloe killed Frank)", "text": "", "set": {"name": "chloe_killed_frank", "type": "set", "value": true}, "next": "setup5_kchloe"},
            {"name": "(Chloe didn't kill Frank)", "text": "", "set": {"name": "chloe_killed_frank", "type": "set", "value": false}, "next": "setup5_kchloe"}
        ]
    },
    "setup5_kchloe": {
        "choices": [
            {"name": "(Kissed Chloe)", "text": "", "set": {"name": "kissed_chloe", "type": "set", "value": true}, "next": "setup5_kwarren"},
            {"name": "(Didn't kiss Chloe)", "text": "", "set": {"name": "kissed_chloe", "type": "set", "value": false}, "next": "setup5_kwarren"}
        ]
    },
    "setup5_kwarren": {
        "choices": [
            {"name": "(Kissed Warren)", "text": "", "set": {"name": "kissed_warren", "type": "set", "value": true}, "next": "setup5_romance"},
            {"name": "(Didn't kiss Warren)", "text": "", "set": {"name": "kissed_warren", "type": "set", "value": false}, "next": "setup5_romance"}
        ]
    },
    "setup5_romance": {
        "choices": [
            {"name": "(High romance score)", "text": "", "set": {"name": "romance_high", "type": "set", "value": true}, "next": "setup5_djeff"},
            {"name": "(Low romance score)", "text": "", "set": {"name": "romance_high", "type": "set", "value": false}, "next": "setup5_djeff"}
        ]
    },
    "setup5_djeff": {
        "choices": [
            {"name": "(David killed Jefferson)", "text": "", "set": {"name": "david_killed_jefferson", "type": "set", "value": true}, "next": "focus1_intro"},
            {"name": "(David didn't kill Jefferson)", "text": "", "set": {"name": "david_killed_jefferson", "type": "set", "value": false}, "next": "focus1_intro"}
        ]
    },
    // ===================== First Focus (Dark Room) =====================
    "focus1_intro": {
        "text": [
            "This angle highlights your purity, see? The slightly unconscious model is often the most open and honest. No vanity or posing just...pure expression.",
            "Oh Christ... Look at that perfect face.",
            "Hold that stare there! Stay still!",
            "Oh, Max! You fucked up my shot! But please don't worry, we have all the time in the world. For now. I knew you were special the second I saw your first...\"selfie\". Yes, I still hate that word. But I love the purity of your own image. Not like Rachel, who was always looking in the wrong places. Poor Rachel.",
            "Chloe...",
            "Chloe, right. Yeah, I'm sorry I killed—that Nathan killed her in self-defense. But she had a troubled history like most Arcadia Bay dropouts. Nobody will be surprised...or care. Though I promise...people will care when you die tonight, Max.",
            "No, no... No...",
            "Now don't move, or this will...hurt...much.",
            "Stupid bitch! You just don't listen, do you? In fact, you never did hear much in my class; if you had, you might have seen all this coming.",
            "Goddamn, you are a fighter, though.",
            "No...",
            "Remember my number one rule. Always...take...the shot.",
            "Oh, Jesus... I can't believe that happened. So sick."
        ],
        "next": "focus1_victoria"
    },

    "focus1_victoria": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "focus1_victoria_yes"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "focus1_victoria_no"}
        ]
    },
    "focus1_victoria_yes": {"text": [
        "Now I know what Kate had to go through...and I almost killed her...",
        "Shh. No, you didn't. Don't think about that now."
    ], "next": "focus1_bridge"},
    "focus1_victoria_no": {"text": [
        "Now I know what Kate had to go through...and I helped kill her.",
        "You didn't know anything. Don't think about that now."
    ], "next": "focus1_bridge"},
    "focus1_bridge": {
        "text": [
            "God, I was so fucking stupid...",
            "Please, get us out of here!",
            "I will... Just try to be calm...",
            "Victoria, nobody is dying in here. We will escape. I promise.",
            "He drugged me for his fucked up binders...just to take photos...",
            "I could try another photo... It makes me sick just thinking about him...",
            "I can still get out of this and save Chloe... I have to.",
            "Whoa... I—I'm definitely more awake in this photo... I could try this one.",
            "This might work. Please work..."
        ],
        "next": "focus2_1"
    },

    // ===================== Second Focus =====================
    "focus2_1": {
        "text": [
            "I'm getting some spectacular images here, Max. Yes, Victoria would kill to be in your place, but...she doesn't understand our...connection. You're the winner, Max. I choose you...your portrait.",
            "Fuck you.",
            "You're trying too hard. I know you're scared... You all have the same doe-eyed look when you wake up here. Replaced by fear as you realize what's about to happen.",
            "Mr. Jefferson, why are you doing this?",
            "Oh, Max... I'm so glad you asked that question. Simply put, I'm obsessed with the idea of capturing that moment innocence evolves into corruption. Most models are cynical. They...lose that naiveté. However, some Blackwell students carry their hope and...optimism with them like...an aura. And those lucky few become my models...my subjects.",
            "Yes, you're a psychopath. And this is your last session.",
            "Au contraire, Max. I'm so sane, that nobody knows what's happening to you right now.",
            "And don't get me started on your late partner. I had enough of those faux-punk sluts in my Seattle days."
        ],
        "next": "focus2_chloe"
    },
    "focus2_chloe": {
        "choices": [
            {
                "name": "You killed Chloe.",
                "text": [
                    "You killed Chloe! You murdered my best friend.",
                    "She had a loaded weapon. This was clearly self-defense; but that's what happens when you play with guns...or try to fuck with me. It's better when they don't know...like pure...sweet...Kate."
                ],
                "next": "focus2_2"
            },
            {
                "name": "Go to hell.",
                "text": [
                    "Go to hell. You will, for everybody you've hurt.",
                    "Unlike pure, sweet Kate Marsh, I don't believe in that bullshit. She could have been my masterpiece. The world is what an artist makes it...and my muse—"
                ],
                "next": "focus2_2"
            }
        ]
    },
    "focus2_2": {
        "choices": [
            {
                "name": "Blah blah blah.",
                "text": [
                    "Blah, blah, blah... God, I hate your voice now.",
                    "You might as well savor it, considering it's the last you'll hear. Oh... That struck a nerve. Your face changed color...beautiful."
                ],
                "next": "focus2_3"
            },
            {
                "name": "Kate survived. (Kate is alive)",
                "text": [
                    "Kate believed, and she survived. You failed to break her. She's stronger than ever. And she'll outlive you.",
                    "She'll certainly outlive you. Who knows? Maybe I'll pay Kate a visit soon and test her faith again..."
                ],
                "next": "focus2_3"
            },
            {
                "name": "Artists don't kill. (Kate is dead)",
                "text": [
                    "Artists don't drive teenagers to suicide for any bullshit muse. You trained Nathan to drug Kate...to take photos of her. That's why she's dead.",
                    "Which makes me sad, Max. I will miss her... Kate had such a strong spirit...it was very satisfying to break it down."
                ],
                "next": "focus2_3"
            }
        ]
    },
    "focus2_3": {
        "text": "You will not get away with this. I want you to know that.",
        "next": "focus2_blame"
    },

    "focus2_blame": {
        "text": "",
        "next": [
            {"name": "blamed_who", "type": "eq", "value": "jefferson", "node": "focus2_blame_jefferson"},
            {"name": "blamed_who", "type": "eq", "value": "david", "node": "focus2_blame_david"},
            {"name": "blamed_who", "type": "eq", "value": "nathan", "node": "focus2_blame_nathan"}
        ]
    },
    "focus2_blame_jefferson": {"text": "When you told the principal that I made Kate cry, I thought you almost had me. It's good our esteemed Principal Wells is like most administrators...a closet drunk.", "next": "focus2_nathan"},
    "focus2_blame_david": {"text": "Then why did you blame David Madsen for stalking Kate? Of course, he was the only person who was about to find out the truth. Irony.", "next": "focus2_nathan"},
    "focus2_blame_nathan": {"text": "Too bad you already made a convincing argument against Nathan in the Principal's office. Thank you so much for setting him up for me.", "next": "focus2_nathan"},
    "focus2_nathan": {
        "text": "I do know that the Prescotts are going to have a major scandal when the town finds out what their elite son has been doing for homework...",
        "next": "focus2_nathan_choice"
    },
    "focus2_nathan_choice": {
        "choices": [
            {
                "name": "You used Nathan.",
                "text": [
                    "You used Nathan.",
                    "I prefer the term \"manipulated.\" Like with an image... Nathan's was easy to twist around."
                ],
                "next": "focus2_5"
            },
            {
                "name": "He's as sick as you.",
                "text": [
                    "He's as sick as you.",
                    "Don't...judge people, Max. But that's why Nathan never should have been at Blackwell..."
                ],
                "next": "focus2_sick"
            }
        ]
    },
    "focus2_sick": {
        "choices": [
            {
                "name": "You didn't care.",
                "text": [
                    "You didn't care about him.",
                    "You're wrong again. He was genuinely talented. And his father is a serious asshole, as you might know...",
                    "I know."
                ],
                "next": "focus2_5"
            },
            {
                "name": "That makes two.",
                "text": [
                    "That makes two of you.",
                    "I helped Nathan realize his vision... So few people get that chance...",
                    "You brainwashed him!"
                ],
                "next": "focus2_5"
            }
        ]
    },
    "focus2_5": {
        "text": [
            "I became a sort of...father figure for Nathan. It happens often in teacher/student relationships. It was kind of...touching, for a while.",
            "Did you tell him everything about your plans at Blackwell?",
            "Don't be stupid, Max. I told him what he needed to hear. In return, I had access...to the Prescott fortune; who do you think paid for this glorious dark room and equipment?",
            "Rachel Amber was your victim, not your \"subject\".",
            "Oh...Rachel Amber... That's the real tragedy. Nathan thought he could be an artist like me...instead, the dumbass gave her an overdose."
        ],
        "next": "focus2_rachel"
    },
    "focus2_rachel": {
        "choices": [
            {
                "name": "Why Rachel?",
                "text": [
                    "Why Rachel?",
                    "I don't have time to tell you everything. But she... was special. A human chameleon... So many visual possibilities... We had a real connection."
                ],
                "next": "focus2_rachel_sub"
            },
            {
                "name": "Chloe and Rachel.",
                "text": [
                    "Chloe and Rachel...you killed both of them!",
                    "They're fucking together in heaven right now. Is that what you wanna hear?",
                    "Why? Why?!",
                    "Start listening to me, you dumb c*nt! I'm sorry, Max. That was not cool."
                ],
                "next": "focus2_6"
            }
        ]
    },
    "focus2_rachel_sub": {
        "choices": [
            {
                "name": "She let you take pictures?",
                "text": [
                    "Did she let you... take pictures of her?",
                    "Rachel was in love with me. That's not my ego. Just look at our sessions. Not that I'll let you. Nobody loved having their picture taken more."
                ],
                "next": "focus2_6"
            },
            {
                "name": "Did you know Frank?",
                "text": [
                    "Did you know she also had a connection with Frank?",
                    "Let's be honest, she was doing the classic \"bad boy\" thing. She was over Frank before it began. He just didn't know."
                ],
                "next": "focus2_6"
            }
        ]
    },
    "focus2_6": {
        "text": [
            "Anyway, Rachel is dead. But no tears, Los Angeles would've killed her anyway, so, look at this as a favor.",
            "You're evil."
        ],
        "next": "focus2_warren"
    },

    "focus2_warren": {
        "text": "",
        "next": [
            {"name": "warren_beat_nathan", "type": "eq", "value": false, "node": "focus2_warren_no"},
            {"name": "warren_beat_nathan", "type": "eq", "value": true, "node": "focus2_warren_yes"}
        ]
    },
    "focus2_warren_no": {"text": ["Oh, I see; you're \"good\" because you stopped your friend from beating Nathan up.", "Yes, yes we are."], "next": "focus2_7"},
    "focus2_warren_yes": {"text": ["Oh, I see... You and your friends almost beat Nathan to death. You see, we're not so different.", "Yes, yes we are."], "next": "focus2_7"},
    "focus2_7": {
        "text": [
            "I cared more about Nathan than you did.",
            "No! You didn't. It's just too bad he fell in lust with Rachel; he actually thought he could mimic what I do with a camera and subject; like father, but not like son.",
            "Where is Nathan now?",
            "Dead and buried. After what he did to Rachel, I knew I couldn't keep him as a protégé for much longer. Now the police will never find his body... Do you finally get it now, Max?",
            "You are an amateur. Look at the trail of death you've left behind. You're gonna die, motherfucker! For Chloe, and Rachel, and everybody else!",
            "I do love your spirit, Max, but you brought yourself here, by your own choice. Anyway, I like my models to be seen and not heard...so I have to make sure...there's nothing left behind...of you.",
            "Okay. Now, let's see how these shots came out.",
            "Sorry. This is not art...",
            "If I talk to him... distract him... maybe he'll give up a photo.",
            "I have all those photos in my diary... This could be a way out.",
            "Wait! Please, Mr. Jefferson...",
            "Max... I would love to talk shop, but I really need to go over these pictures. Especially while they're fresh in my mind... I think our session...was a career high for me..."
        ],
        "next": "focus2_request"
    },
    "focus2_request": {
        "choices": [
            {
                "name": "Let me go.",
                "text": [
                    "Let me go and I'll help you. Let me help you, please...",
                    "Don't beg! Never beg. I hate that. Anyway, let's enjoy our final moment, before I have to end our memorable session, with your death."
                ],
                "next": "photolab_class"
            },
            {
                "name": "Show me the photos.",
                "text": [
                    "Could you... Could you show me the photos?",
                    "That's the first time one of my models down here has asked me that. Of course you would... But I love that the last thing you'll ever see is yourself...through my camera eye. Too perfect."
                ],
                "next": "photolab_class"
            },
            {
                "name": "What are you going to do?",
                "text": [
                    "What... What are you going to do to me?",
                    "I'm going to make you live forever in my photographs. That's all that will be left of Maxine Caulfield. They won't even find your bag..."
                ],
                "next": "photolab_class"
            },
            {
                "name": "My diary.",
                "text": [
                    "You...you still have my diary.",
                    "Don't worry...nobody's going to read it. Thanks for reminding me.",
                    "There's nothing more innocent than a teenager's diary. Oh...look at your selfies. What a waste of talent.",
                    "Look at that shot, Max... You can do so much better."
                ],
                "next": "photolab_class"
            }
        ]
    },

    // ===================== Photography Lab (Monday, again) =====================
    "photolab_class": {
        "text": [
            "I'm back... Right back where I started this insane week... And nobody is going to hurt Chloe ever again...",
            "...the photo portrait has been popular since the early 1800s. Now, Max, since you've captured our interest and clearly want to join the conversation, can you please tell us the name of the process that gave birth to the first self-portraits?"
        ],
        "next": "photolab_q"
    },
    "photolab_q": {
        "choices": [
            {
                "name": "A real visionary.",
                "text": [
                    "The Daguerreian Process. He was a real visionary...not a hypocrite.",
                    "What do you mean by that?",
                    "I mean that he actually created something. He didn't just take pictures of models and pretend they were art.",
                    "I'm not sure I get the connection, but... yes. Max has...clearly read more into them than...I have."
                ],
                "next": "photolab_warn"
            },
            {
                "name": "Daguerreian Process.",
                "text": [
                    "The Daguerreian Process.",
                    "Oh. Well...that was easy, Max.",
                    "Was it? Okay.",
                    "Well...uh... Okay, then. Obviously...Max has read them."
                ],
                "next": "photolab_warn"
            },
            {
                "name": "Not \"capturing.\"",
                "text": [
                    "I'm not into \"capturing\" your interest. That's kind of sick, isn't it?",
                    "I guess somebody hasn't had their coffee... Do you wanna try again?",
                    "Okay, okay, the Daguerreian Process. Blah, blah, blah."
                ],
                "next": "photolab_warn"
            },
            {
                "name": "Who cares?",
                "text": [
                    "Who cares? This class is hella bullshit.",
                    "I'll pretend you didn't say that, and let you try to answer one more...",
                    "Sorry, there's no time left. I mean, your class is almost over.",
                    "Oh... Well, uh... Thanks for the warning, Max. Clearly, Max doesn't have the, uh...time."
                ],
                "next": "photolab_warn"
            }
        ]
    },
    "photolab_warn": {
        "text": [
            "Time to change time...",
            "First, let's make it real easy to capture Mark Jefferson.",
            "Bastard. I have to warn David about Jefferson and the Dark Room.",
            "I should be able to track down David's number from the school pamphlet.",
            "Found you!",
            "For once, David...I'm praying you'll overreact to this as much as everything else...and take Jefferson down fast.",
            "Mr. Madsen. You're after Rachel Amber. Mark Jefferson is guilty. His Dark Room is under the Prescotts' farmhouse. You know the location. He's sick and dangerous. Stop him.",
            "You wanted me to enter the contest, asshole.",
            "So maybe I'll be going to San Francisco. And, Jefferson...you'll be going to prison.",
            "The past within the past... Am I pushing myself too hard?",
            "Mr. Jefferson? We need to talk.",
            "Can you see I'm talking to Mr. Jefferson now?"
        ],
        "next": "photolab_vic"
    },

    "photolab_vic": {
        "text": "",
        "next": [
            {"name": "victoria_kidnapped", "type": "eq", "value": true, "node": "photolab_vic_yes"},
            {"name": "victoria_kidnapped", "type": "eq", "value": false, "node": "photolab_vic_no"}
        ]
    },
    "photolab_vic_yes": {"text": [
        "Yes, I see. But maybe you shouldn't...",
        "Uh, and why not?",
        "Hold on, Victoria. Are you okay, Max?",
        "I will be when Victoria realizes that hiding behind a screen, posting videos of people is incredibly cruel and unfair. I just want you to think about how much it would hurt if somebody did that to you. You can always make the right choice, Victoria. I know you've got a good heart.",
        "Listen...I...I didn't...",
        "You don't have to explain. Wouldn't it be better to lift people up than to bring them down? You could inspire people...",
        "Okay, I don't know what you're talking about now... Then I guess I'm done talking.",
        "And that's okay too.",
        "That was kind of random, Max. What did you mean?"
    ], "next": "photolab_submit"},
    "photolab_vic_no": {"text": [
        "I can see you're kissing ass again. Nothing new.",
        "What did you just say?!",
        "Hold on, Victoria. Are you okay, Max?",
        "Not until Victoria knows that hiding behind a screen and posting videos of people is totally fucked up. Are you proud of yourself? If you have any feelings left, you should think about your actions.",
        "Listen... I—I didn't...",
        "Of course you did! You're so insecure, you can't even be happy with your own talent.",
        "Okay, I do not have to listen to this bullshit... Then I guess I'm...done talking.",
        "I sure hope so.",
        "I'm not going to say I didn't enjoy that, but...why?"
    ], "next": "photolab_submit"},
    "photolab_submit": {
        "text": [
            "Here's my photograph for the \"Everyday Heroes\" contest.",
            "Oh, uh... That was easy.",
            "No... It wasn't easy at all.",
            "Well, I, uh... I—I can't pre-judge yet, but I'm very...happy you decided to enter. That means a lot to me...and Blackwell.",
            "Or guilty.",
            "Well... Thanks...for the photo. Maybe both of us will be jet-setting to San Francisco this Friday.",
            "Or maybe only one of us will be going.",
            "Don't be so modest, Max. Anything can happen in a week...",
            "As you're going to find out, Mr. Jefferson."
        ],
        "next": "plane_wells"
    },

    // ===================== Plane / Zeitgeist Gallery =====================
    "plane_wells": {
        "text": [
            "Whoa!",
            "Okay... You're okay, Max... You're safe...on a plane. I hope I did everything right this time.",
            "Good work, David.",
            "HOLY SHIT YOU RULE MAX!!!!!",
            "i am so proud of my superstar",
            "Chloe... Oh, you're alive... Oh, you're alive. I did it... I fixed everything. Wowser.",
            "Ah, I don't think so. I'm hoping these airline seats get smaller so I won't have to fly at all anymore.",
            "How did you sleep?",
            "Hope I wasn't snoring out loud, Max...",
            "Just a bit.",
            "It's...been a tough week at Blackwell, so I hope you'll forgive me. Between Mr. Jefferson and the Prescotts, things have been...hectic, to say the least.",
            "I totally get it, Principal Wells.",
            "That's a smart way of telling me to stop whining. We are proud of you for representing Blackwell at the \"Everyday Heroes\" contest.",
            "I already am, and we're not even there.",
            "Christ! Another nosebleed? Max...you're not just screwing around with time..."
        ],
        "next": "gallery"
    },
    "gallery": {
        "text": [
            "San Francisco is so cool...and this gallery is huge!",
            "So is the buffet. If an event skimps on the food, you know it's a bad event.",
            "This is your day, Max. You can do whatever you want. I hope you take advantage of your status and talk to as many influential people here as possible. Work the room.",
            "I don't know... I feel so weird, like I'm a little kid hanging with the adults.",
            "Max, after this week, you are certainly not a little kid anymore. Now, you have to start acting like the photographer you want to be. Better get in there and start schmoozing.",
            "Come on, Max... After everything that's happened, this should be the least scary thing you've ever done.",
            "Wowser, Max... You did it. Somehow... I went from the Dark Room...to this gallery. I've been through so many realities in one week. Life is...weird.",
            "You did it, Max... You're a real artist. At least...for today...",
            "Max!",
            "Chloe!",
            "Hey, are you okay? We lost you there for a second...",
            "Uh, your nose!",
            "I'm okay... Uh, jet lag... High altitude...",
            "You left the ringer off, idiot!",
            "Come on... Please answer...",
            "Max! Holy shit, man! Your vision! It's...it's true! Y—you saw the tornado, it's coming!",
            "What?! Oh, no... Chloe, where are you?",
            "I'm so fucking scared! I'm...I'm by the beach, I—I'm stuck in the t—ah—!",
            "Chloe! Can you hear me? Hello? Hello?!",
            "Oh, my god, the tornado was real! Oh, I didn't fix shit! Chloe will die... Arcadia Bay is gonna be destroyed... There has to be a way to stop this...for good!",
            "I literally do not have the time to deal with everybody...",
            "Focus, Max! Chloe needs you now!",
            "Zen, Max, zen... There's nobody here but you...nobody...",
            "Oh, shit! Oh, my head...",
            "What is going on now? I—It feels like reality is...breaking apart... What am I doing to time?",
            "I just have to make one simple change...so I won't end up in San Francisco. Simple...",
            "Sorry, San Francisco... Chloe comes first."
        ],
        "next": "darkroom_back"
    },

    // ===================== Dark Room (back again) =====================
    "darkroom_back": {
        "text": [
            "Oh, fuck! God, no... I'm back here again?! I thought I fixed everything!",
            "What did you say, Max?",
            "What?! Jefferson should be in jail, not here...",
            "Jesus. It's like you're back in my class. You're still...spacing...out. It might be cool if you took one of your patented selfies now...",
            "Anyway, answer my question, please."
        ],
        "next": "darkroom_insult"
    },
    "darkroom_insult": {
        "choices": [
            {"name": "Eat shit and die.", "text": "Eat shit and die.", "next": "darkroom_vic"},
            {"name": "Fuck you.", "text": "Fuck you.", "next": "darkroom_vic"}
        ]
    },

    "darkroom_vic": {
        "text": "",
        "next": [
            {"name": "victoria_kidnapped", "type": "eq", "value": true, "node": "darkroom_vic_yes"},
            {"name": "victoria_kidnapped", "type": "eq", "value": false, "node": "darkroom_vic_no"}
        ]
    },
    "darkroom_vic_yes": {"text": [
        "Good answer, good answer.",
        "Hey...your nose is bleeding. Probably gave you too big a dose. Sorry about that, Max.",
        "Oh. I had to let Victoria Chase go.",
        "You let her...?",
        "Don't be stupid, okay?! She's exactly where she deserves to be.",
        "No..."
    ], "next": "darkroom_2"},
    "darkroom_vic_no": {"text": [
        "Good answer, good answer.",
        "Hey...your nose is bleeding. Probably gave you too big a dose. Sorry about that, Max. But considering you're about to die, a nosebleed is a first-world problem."
    ], "next": "darkroom_2"},
    "darkroom_2": {
        "text": [
            "Your iris... Too bad you pissed away your gift. You could have won the contest, but you destroyed your own beautiful photograph. What a waste. Sorry. I burned all your stuff. I got a little carried away.",
            "Fuck! He burned my diary! That's why I'm still here.",
            "Especially since you've developed from nerd to hero within a week. There's something...weird going on with you.",
            "Whoa! Did you see how crazy it is outside? Like I said...something weird... It's an honor working with you on these final sessions. At least...that's the last lecture you'll ever have to hear from me.",
            "Wait! Hold on! Can I...can I please ask you for one last...request?",
            "Oh, you got me, Max. How can I deny that face?"
        ],
        "next": "darkroom_request"
    },
    "darkroom_request": {
        "choices": [
            {
                "name": "Some water?",
                "text": [
                    "Uh...excuse me, but my throat is scratchy... Can I please have some water?",
                    "Of course. I don't want you to be uncomfortable.",
                    "I promise. This final dose won't hurt. What?"
                ],
                "next": "darkroom_david"
            },
            {
                "name": "Turn off the lights?",
                "text": [
                    "And would you mind turning off the lights? They make me squint, so I won't look good for the shot.",
                    "Now, you're thinking like a real photographer... And I don't want your last memory to be bad lighting...",
                    "I promise. This final dose won't hurt. What?"
                ],
                "next": "darkroom_david"
            },
            {
                "name": "One last picture?",
                "text": [
                    "Would you...take one last picture of me? I...I want to be your best subject.",
                    "I almost don't believe that, but I think you've finally learned from me.",
                    "I promise. This final dose won't hurt. What?"
                ],
                "next": "darkroom_david"
            },
            {
                "name": "Play some music?",
                "text": [
                    "Could you please at least play some music...so I can drift away?",
                    "Even at the end you're still a dreamer, Max... That's a nice trait...",
                    "Hold it!"
                ],
                "next": "darkroom_request"
            }
        ]
    },
    "darkroom_david": {
        "text": [
            "David!",
            "No, David! No!",
            "No gun...no balls...",
            "Jefferson! It's over!",
            "You are not going to stop me!"
        ],
        "next": "darkroom_weapon"
    },
    "darkroom_weapon": {
        "choices": [
            {
                "name": "(Jefferson's gun)",
                "text": [
                    "He's hiding a gun over there!",
                    "Sorry, Madsen. Okay... Déjà vu."
                ],
                "next": "darkroom_weapon"
            },
            {
                "name": "(Bottle)",
                "text": [
                    "Grab that bottle!",
                    "Sorry, Madsen. You should have stuck to harassing students. Okay..."
                ],
                "next": "darkroom_weapon"
            },
            {
                "name": "(David's gun)",
                "text": [
                    "Grab your gun now!",
                    "Got it...",
                    "Oh, Christ! David Madsen, you are one stupid son of a bitch, so don't blame me."
                ],
                "next": "darkroom_weapon"
            },
            {
                "name": "(Table)",
                "text": [
                    "David! Kick that table!",
                    "Yes, sir!",
                    "David Madsen... I always hated that mustache..."
                ],
                "next": "darkroom_weapon"
            },
            {
                "name": "(Cable)",
                "text": "",
                "next": "darkroom_freed"
            }
        ]
    },
    "darkroom_freed": {
        "text": [
            "Oh, Lord, Max...are you okay? Are you alright? Can you move?",
            "Yes... Thank you, David...thank you...",
            "Don't thank me... You brought me here.",
            "Let's wrap up this son of a bitch first.",
            "He won't be going anywhere when he wakes up.",
            "Except you are going to prison forever. Or worse.",
            "Mr. Jefferson? Now it's your turn to be captured in a moment... Save Chloe...",
            "He burned everything...including all of my photos... Warren! Yes! I can use that picture he took of us!",
            "Shit! No signal.",
            "Thanks, Mr. Jefferson, but...you won't need this anymore.",
            "I better go outside and call Warren... Please answer..."
        ],
        "next": "david_1"
    },

    // ===================== Conversation with David =====================
    "david_1": {
        "choices": [
            {"name": "(Max initiates the conversation)", "text": ["David?", "Are you okay?", "Look at this place...it feels like hell."], "next": "david_vic"},
            {"name": "(David initiates the conversation)", "text": "Hold on, Max. So, where is Chloe?", "next": "david_truth"}
        ]
    },

    "david_vic": {
        "text": "",
        "next": [
            {"name": "victoria_kidnapped", "type": "eq", "value": true, "node": "david_vic_yes"},
            {"name": "victoria_kidnapped", "type": "eq", "value": false, "node": "david_vic_no"}
        ]
    },
    "david_vic_yes": {"text": ["Jefferson was...was going to kill me...like he did to Victoria Chase...", "Oh, no..."], "next": "david_suspect"},
    "david_vic_no": {"text": ["Jefferson was going to kill me... You got here just in time.", "I'm glad..."], "next": "david_suspect"},
    "david_suspect": {
        "choices": [
            {
                "name": "I never did...",
                "text": [
                    "I never did...until too late.",
                    "You shouldn't have to suspect your teacher.",
                    "He wasn't a real teacher. He just...wanted to lecture. It was part of his sick plans."
                ],
                "next": "david_blame"
            },
            {
                "name": "You suspected everybody.",
                "text": [
                    "You kind of suspected everybody...",
                    "Yes, and this is what I get for wasting all those hours on the Prescotts... I set my sights too wide, lack of focus.",
                    "I know the feeling."
                ],
                "next": "david_blame"
            }
        ]
    },

    "david_blame": {
        "text": "",
        "next": [
            {"name": "blamed_who", "type": "eq", "value": "nathan", "node": "david_blame_nathan"},
            {"name": "blamed_who", "type": "eq", "value": "david", "node": "david_blame_david"},
            {"name": "blamed_who", "type": "eq", "value": "jefferson", "node": "david_blame_jefferson"}
        ]
    },
    "david_blame_nathan": {"text": "I wasn't surprised when you accused Nathan of drugging Kate Marsh. I thought so, too.", "next": "david_kate"},
    "david_blame_david": {"text": "I guess I looked just as suspicious when you told Principal Wells that I was...harassing Kate Marsh...and I don't blame you.", "next": "david_kate"},
    "david_blame_jefferson": {"text": "Well, you still had the right idea to tell the principal that Jefferson acted shady around Kate Marsh.", "next": "david_kate"},

    "david_kate": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "david_kate_yes"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "david_kate_no"}
        ]
    },
    "david_kate_yes": {"text": "And, Max...I treated Kate like shit... I know she's a good person, but I'm not. I hope I get to tell her that soon.", "next": "david_kate_a"},
    "david_kate_no": {"text": "And, Max, I'll never forgive myself for what happened to Kate. I feel like I helped push her off that roof...", "next": "david_kate_b"},
    "david_kate_a": {
        "choices": [
            {"name": "Me too.", "text": "Me too. I think that would make her very happy.", "next": "david_3"},
            {"name": "Kate was bullied.", "text": "Kate was bullied up to that roof...but it was still Nathan and Jefferson who put her there.", "next": "david_3"}
        ]
    },
    "david_kate_b": {
        "choices": [
            {"name": "Not your fault.", "text": "Don't blame yourself...Nathan and Jefferson are the ones who put her up there...", "next": "david_3"},
            {"name": "Kate was bullied.", "text": "Kate was bullied up to that roof...but it was still Nathan and Jefferson who put her there.", "next": "david_3"}
        ]
    },
    "david_3": {
        "text": [
            "I knew Nathan Prescott was a threat. I just waited too long to neutralize him.",
            "Jefferson already did. They had some weird father-son thing going on. But...Nathan killed Rachel, and Jefferson had to use him as a scapegoat.",
            "That pervert was pulling all this shit right under my nose, too... I could've stopped him and Nathan if only...I wasn't so stupid."
        ],
        "next": "david_reported"
    },

    "david_reported": {
        "text": "",
        "next": [
            {"name": "reported_nathan", "type": "eq", "value": true, "node": "david_reported_yes"},
            {"name": "reported_nathan", "type": "eq", "value": false, "node": "david_reported_no"}
        ]
    },
    "david_reported_yes": {"text": "No... I told Principal Wells Nathan had a gun and...almost used it. But he didn't wanna believe me. I should've been more loud.", "next": "david_learned"},
    "david_reported_no": {"text": "No. I should've told Principal Wells Nathan had a gun and...almost used it. I put the school in danger.", "next": "david_learned"},
    "david_learned": {
        "text": "We all make decisions we regret. But I have to admit, I'm impressed by you...and Chloe, and your investigation. I had all the high-tech toys, while you had each other.",
        "next": "david_learned_choice"
    },
    "david_learned_choice": {
        "choices": [
            {
                "name": "She learned from you.",
                "text": [
                    "Maybe she learned from you.",
                    "I think she only learned how to hate my guts."
                ],
                "next": "david_hit"
            },
            {
                "name": "We're a great team.",
                "text": [
                    "We...we are a great team.",
                    "That's one of my problems... I'm not good at teamwork. Never was. Even in the service.",
                    "I can't even imagine what you went through..."
                ],
                "next": "david_5"
            }
        ]
    },

    "david_hit": {
        "text": "",
        "next": [
            {"name": "david_hit_chloe", "type": "eq", "value": false, "node": "david_hit_no"},
            {"name": "david_hit_chloe", "type": "eq", "value": true, "node": "david_hit_yes"}
        ]
    },
    "david_hit_no": {"text": "You both had a tough start. I know it wasn't easy.", "next": "david_5"},
    "david_hit_yes": {"text": ["I'm sure you know I... I hit her the other day.", "I know you're sorry."], "next": "david_5"},
    "david_5": {
        "text": "I'm not gonna make any excuses for my behavior. I tried to be a good soldier, but...I wasn't so great. I tried to be a good father, too...",
        "next": "david_sided"
    },

    "david_sided": {
        "text": "",
        "next": [
            {"name": "sided_with_chloe", "type": "eq", "value": true, "node": "david_sided_yes"},
            {"name": "sided_with_chloe", "type": "eq", "value": false, "node": "david_sided_no"}
        ]
    },
    "david_sided_yes": {"text": "But...when Joyce kicked me out...I had nothing.", "next": "david_sided_a"},
    "david_sided_no": {"text": "But...you saw how that went.", "next": "david_sided_b"},
    "david_sided_a": {
        "choices": [
            {"name": "I'm sorry.", "text": ["I'm so sorry about that... I didn't want that to happen...", "I should never have set up those surveillance cams. Or kept all those files..."], "next": "david_6"},
            {"name": "I was pissed off.", "text": ["I was pissed off and wanted to rage.", "Yeah, I know the feeling. Too much."], "next": "david_6"}
        ]
    },
    "david_sided_b": {
        "choices": [
            {"name": "You tried.", "text": ["You tried. It's obvious you care, even if your methods are...", "Fucked up. I know."], "next": "david_6"},
            {"name": "Chloe is tough.", "text": ["Chloe is tough...just like you.", "I'm glad we have something in common."], "next": "david_6"}
        ]
    },
    "david_6": {
        "text": [
            "I try not to use my service as an excuse, but... It's hard to come home after war. Most people don't know or care what it's like...except Joyce. She gave me hope. A new life.",
            "And you saved mine. Chloe, she...she would be proud of you.",
            "I just wanna see her safe with her mother. I promised Joyce I would go see a family counselor...and I'll start by apologizing to Chloe. So, where is Chloe?"
        ],
        "next": "david_truth"
    },
    "david_truth": {
        "choices": [
            {
                "name": "TELL THE TRUTH",
                "text": [
                    "David... Chloe is...is dead...",
                    "This isn't happening... It can't... No, God... Not Chloe... Max, are you sure? Are you...",
                    "Yes, I... I saw her, I...I saw Jefferson kill her in the junkyard...last night...",
                    "I promised Joyce that I would protect her and Chloe... You killed my wife's child, you sick fucker?!",
                    "David, wait!",
                    "Max... I'm sorry...I'm sorry you had to see that. What have I done? All that time I wasted with surveillance... I... Chloe...I'm sorry... Joyce...I failed you...",
                    "You didn't fail. You did your best.",
                    "Max...you better get outside. You've seen enough of this room.",
                    "David...thank you, for saving me."
                ],
                "next": "jeff_car"
            },
            {
                "name": "HIDE THE TRUTH",
                "text": [
                    "David, um... She was pretty stressed out, so, um... She went to go, um...medicate before I ended up in here. So, she's okay.",
                    "Oh, thank god. For once I'm happy Chloe's a stoner.",
                    "David, I have to go outside and get some real air...and use my phone.",
                    "Of course. Go on, Max. You're a brave soldier. I'm glad Chloe has a best friend like you. Go on, now. You've seen enough of this room."
                ],
                "next": "jeff_car"
            }
        ]
    },

    // ===================== Jefferson's Car / Street =====================
    "jeff_car": {
        "text": [
            "Freedom... Holy shit! The storm is real. I need to find Warren...",
            "Yes! Warren! Can you hear me?",
            "Max?! Damn, where are you?",
            "Nevermind... Listen, do you have that photo you took last night in the parking lot?",
            "Uh, yeah, but why? It wasn't that great a shot...",
            "Yes, it is and I want it! Where are you?",
            "I'm at the Two Whales Diner. Pretty much trapped in here with Joyce, thanks to this armageddon weather.",
            "I'm on my way.",
            "Come on, that's crazy! Seriously, Max, stay wherever you are. I'm kinda scared.",
            "That's okay, me too! But it's not over yet, Warren. So, hold on!",
            "I told you. I, Truss Limpbow, have been warning you people for years that our culture of sin and entitlement would lead to God striking us down!",
            "Max, it's...it's Nathan. I...I just wanted to say...I'm sorry. I didn't wanna hurt Kate, or Rachel, or—or...didn't wanna hurt anybody. Everybody...used me! Mr. Jefferson...is coming for ME now. All this shit will be over soon. Watch out, Max... He wants to hurt you next. Sorry.",
            "Warren is at the Two Whales Diner, so hurry up!",
            "Hey, that guy is trapped! I have to help everybody I can."
        ],
        "next": "warren_1"
    },

    // ===================== Conversation with Warren =====================
    "warren_1": {
        "text": [
            "I hate to say I'm glad to see you, but I'm so glad to see you.",
            "That's okay. The important thing is that you're safe... and I know you can take care of yourself, after Nathan.",
            "I can't believe you actually drove down here in the middle of a fucking E6 tornado, just for one photograph... I mean, I know you didn't come for me.",
            "Warren, I came for all of you. Just tell me you do have the photograph.",
            "I just want...",
            "Now shut up and listen.",
            "Oh yeah, you're finally going to tell me what you never did in the parking lot...",
            "I wish I would have. So I'm just going to tell you without any explanation. Trust me, okay?",
            "I always do. You should probably tell me quick...",
            "I had a vision in Jefferson's class of a tornado destroying Arcadia Bay. I went to the bathroom and saw my best friend Chloe get shot by Nathan Prescott...You with me so far?",
            "Where else could I be? Go on!",
            "Then I found out that I could rewind time... And, long story short, Mark Jefferson is insane and dangerous.",
            "Whoa... Is that all?"
        ],
        "next": "warren_storm"
    },
    "warren_storm": {
        "choices": [
            {"name": "I started the storm.", "text": ["I think that this storm started... everything started... when I found out I could rewind time... There's no way this is just a coincidence, right?", "Max, not only the storm but the eclipse, the birds, the whales... everything!"], "next": "warren_2"},
            {"name": "He killed Chloe.", "text": ["I have to go back in time. Jefferson already ki—killed Chloe... I can't let that happen... I have to do something, Warren!", "Max, going back in time is what caused the storm!"], "next": "warren_2"}
        ]
    },
    "warren_2": {
        "text": [
            "All because... because of me? How?",
            "I'm not a real scientist, even though I play one at school, but this seems like pure cause and effect, maybe Chaos Theory... Uh, what happened with Jefferson? Did... Did he hurt you?"
        ],
        "next": "warren_hurt"
    },
    "warren_hurt": {
        "choices": [
            {
                "name": "He dosed me.",
                "text": [
                    "He used Nathan to get drugs and money for him. Jefferson tied me up and... dosed me with some drug and took sick photos of me... It was so horrible...",
                    "Max... I'm so sorry you had to go through all that... You're the bravest person I've ever known. Now, I want to kill that son of a bitch! Where is he?"
                ],
                "next": "warren_jeff_status"
            },
            {
                "name": "Rachel was killed.",
                "text": "Nathan accidentally killed Rachel Amber trying to impress Jefferson...",
                "next": "warren_jeff_status2"
            }
        ]
    },

    "warren_jeff_status": {
        "text": "",
        "next": [
            {"name": "david_killed_jefferson", "type": "eq", "value": true, "node": "warren_jeff_status_yes"},
            {"name": "david_killed_jefferson", "type": "eq", "value": false, "node": "warren_jeff_status_no"}
        ]
    },
    "warren_jeff_status_yes": {"text": ["Dead.", "History. Which I need to change fast to make it right again... Is that bad?"], "next": "warren_3"},
    "warren_jeff_status_no": {"text": ["Busted.", "History. Which I need to change fast to make it right again... Is that bad?"], "next": "warren_3"},

    "warren_jeff_status2": {
        "text": "",
        "next": [
            {"name": "david_killed_jefferson", "type": "eq", "value": true, "node": "warren_jeff_status2_yes"},
            {"name": "david_killed_jefferson", "type": "eq", "value": false, "node": "warren_jeff_status2_no"}
        ]
    },
    "warren_jeff_status2_yes": {"text": ["He just needed mental help... Now... they're both dead.", "Jesus, Max! I want the whole story, but... I guess we really are out of time.", "But I can still change things. What do you think will happen?"], "next": "warren_3"},
    "warren_jeff_status2_no": {"text": ["Nathan just needed mental help... Now he's dead... and Jefferson is done.", "Jesus, Max! I want the whole story, but... I guess we really are out of time.", "But I can still change things. What do you think will happen?"], "next": "warren_3"},
    "warren_3": {
        "text": "For every action, there's... there's a reaction... Whenever you reversed or altered time, maybe you caused a chain reaction... even in the environment.",
        "next": "warren_believe"
    },
    "warren_believe": {
        "choices": [
            {"name": "You believe me?", "text": ["You're my friend, Warren. You believe me, right?", "I know I can be a pain in the ass... I told you before that I'll always believe you...", "I just wish I could trust my powers..."], "next": "warren_4"},
            {"name": "This is my fault?", "text": ["All this destruction... is my fault?", "Give me a break. You sure the hell didn't give yourself time travel powers..."], "next": "warren_4"},
            {"name": "More time together.", "text": ["Warren, I know this all sounds insane... but you're the only other person who I can count on now... I wish we had more time together... Do you believe me?", "Max, of course I believe you. You're the most amazing person I've ever met... and I'm glad you trust me.", "Always. I just wish I could trust my powers..."], "next": "warren_4"}
        ]
    },
    "warren_4": {
        "text": [
            "I guess we'll never know if it's magic or science...",
            "Even if it's from a wizard or a wormhole... You're part of something bigger. I don't believe in fate or destiny, but after this week, I realize I don't know shit.",
            "That makes both of us, Warren...",
            "I do know you're here for a reason... and I guess it's up to you to find out why. But I have total faith that you'll do the right thing when the time comes. I'm so proud of you, Max. So thank you for trusting me.",
            "Thanks for being here. Always.",
            "Hey... Be careful out there."
        ],
        "next": "warren_goodbye"
    },
    "warren_goodbye": {
        "choices": [
            {
                "name": "LEAVE",
                "text": [
                    "Watch out for Joyce... and everybody else.",
                    "I got this, Max. Go on.",
                    "I'm going to make the right choices from now on... I swear.",
                    "That's why you're Super Max."
                ],
                "next": "parking_1"
            },
            {
                "name": "HUG",
                "text": [
                    "I could use a hug before I do this...",
                    "Me too.",
                    "You better go before I get pathetic and tell you not to.",
                    "You're not pathetic. You're one of my heroes... And I'm going to make the right choices from now on... I swear.",
                    "That's why you're Super Max."
                ],
                "next": "parking_1"
            },
            {
                "name": "KISS",
                "text": [
                    "For luck.",
                    "Just in case we don't get out of this... I wanted to say...",
                    "I know, Warren...",
                    "Of course you do.",
                    "I'm going to make the right choices from now on... I swear.",
                    "That's why you're Super Max."
                ],
                "next": "parking_1"
            }
        ]
    },

    // ===================== Blackwell Parking Lot =====================
    "parking_1": {
        "text": [
            "Chloe!",
            "Jesus, dude... what is up with you?",
            "I'm just glad we're here together.",
            "I guess you need to talk. No worries... It's all good.",
            "I'm glad you're with me, too. What's going on, Max? We have to find Nathan right now.",
            "Sorry, Warren…",
            "He's going to fucking pay for what he did to Rachel... Let's go, now.",
            "Chloe, wait! Listen!",
            "I can walk and listen, okay?",
            "Stop and listen for once!",
            "Fine, Max. I'm listening.",
            "Chloe, you can't go in that party. You're gonna… you're gonna die if you do.",
            "You used your powers, right? And you fucked around with time, and I died.",
            "Not like that…",
            "You're supposed to back me up. So there's no way that punk-ass bitch Nathan Prescott is taking me down.",
            "You're right, he won't. Mark Jefferson killed you... and others.",
            "Jefferson, the art teacher? That's bullshit! Nathan is the fucking serial killer! We saw the proof! Now, excuse me, I'm going to that party to make sure he never hurts anybody again. Are you coming?"
        ],
        "next": "parking_danger"
    },
    "parking_danger": {
        "choices": [
            {
                "name": "Too dangerous.",
                "text": [
                    "Chloe, you can't get revenge if you're dead!",
                    "It doesn't matter. I have to make Nathan pay for what he did to Rachel... and I know you've got my back.",
                    "Chloe!"
                ],
                "next": "parking_danger"
            },
            {
                "name": "Nathan is dead.",
                "text": [
                    "Nathan is dead... and you're in danger.",
                    "That fucker is already dead? How do you know that?",
                    "Because... I was there.",
                    "Will you please tell me exactly what happened? Please?"
                ],
                "next": "parking_explain"
            }
        ]
    },
    "parking_explain": {
        "choices": [
            {
                "name": "Jefferson hurt me.",
                "text": [
                    "Chloe... Jefferson drugged and kidnapped me. I was tied up in his bunker. You have no idea what hell I went through to get back here… but I couldn't let you die. You brought me back here, and I can't lose you again. I won't!",
                    "Oh... Max. I'm... I'm so sorry... I was the one who dragged you into all this shit... Now we have to stop Jefferson... with one bullet."
                ],
                "next": "parking_realities"
            },
            {
                "name": "Jefferson killed him.",
                "text": [
                    "Jefferson kidnapped Rachel and some other girls. He was also manipulating Nathan, and… he killed him.",
                    "Then it's Jefferson's turn to die now. I understand why you don't want to do this, and I won't blame you for not coming with me.",
                    "Chloe!"
                ],
                "next": "parking_explain"
            },
            {
                "name": "Jefferson is a psychopath.",
                "text": [
                    "Mark Jefferson turned out to be a psychopath...",
                    "Okay, Max. Let's go in there as a team and take his ass out right now!"
                ],
                "next": "parking_psych"
            }
        ]
    },
    "parking_psych": {
        "choices": [
            {
                "name": "Jefferson hurt me.",
                "text": [
                    "Chloe... Jefferson drugged and kidnapped me. I was tied up in his bunker. You have no idea what hell I went through to get back here… but I couldn't let you die. I can't lose you again. I won't!",
                    "Oh... Max. I'm... I'm so sorry... Now we have to stop Jefferson... with one bullet."
                ],
                "next": "parking_realities"
            },
            {
                "name": "Let the past go.",
                "text": [
                    "Chloe, I know this isn't easy, but it's time for you... and me... to let the past go. We have to focus on our future, while we still have one.",
                    "That's so easy for you to say. You don't know what my life has been these past five years.",
                    "Come on, of course I... but at some point you have to move forward...",
                    "I have to do this... So I guess I'm on my own... again.",
                    "Chloe!"
                ],
                "next": "parking_psych"
            },
            {
                "name": "Don't leave me.",
                "text": [
                    "Chloe! I should never have run away from you like I did when we left Arcadia Bay. I know I hurt you… Please, don't run away from me…",
                    "Max, I'm not running from you! This is when I need you the most. With your power and my gun... nothing in the universe can stop us now, Max!"
                ],
                "next": "parking_realities"
            }
        ]
    },
    "parking_realities": {
        "text": [
            "No! Not this way! Chloe, I… I can't keep fixing everything, if all I'm gonna do is just break it, over and over again. I'm afraid I'm fucking up all these alternate realities.",
            "Wait... alternate realities? What do you mean, Max? What did you do?"
        ],
        "next": "parking_reality_choice"
    },
    "parking_reality_choice": {
        "choices": [
            {
                "name": "Terrible choice.",
                "text": [
                    "Chloe, I'm... I'm going to tell you the truth, no matter what. I changed your past and I had to make a terrible choice, and I... I...",
                    "Max. Please tell me... I won't be mad at you...",
                    "I was able to go back in time... to the last day William was alive. I stopped him from leaving, but... But you ended up in a car crash instead.",
                    "You saw my dad again?",
                    "You... you were completely paralyzed. And you were in pain. You were slowly dying, and you… you asked me to… end your life."
                ],
                "next": "parking_alt"
            },
            {
                "name": "I fucked up.",
                "text": [
                    "I fucked up, Chloe. I wanted to make things right, but everything turned out wrong.",
                    "Max, what the hell are you talking about?"
                ],
                "next": "parking_backintime"
            },
            {
                "name": "Nothing...",
                "text": [
                    "Uh... nothing. I mean, whenever I use my rewind, I create new timelines, new destinies...",
                    "Then you can't be sure of anything! That's why I'm going to take out Jefferson... and that will be our reality.",
                    "No, no... Chloe, hold on! Chloe!"
                ],
                "next": "parking_reality_choice"
            }
        ]
    },
    "parking_backintime": {
        "choices": [
            {
                "name": "Back in time.",
                "text": [
                    "I was able to go back in time... to the last day William was alive. I stopped him from leaving, but... But you ended up in a car crash instead.",
                    "You saw my dad again?",
                    "You... you were completely paralyzed. And you were in pain. You were slowly dying, and you… you asked me to… end your life."
                ],
                "next": "parking_alt"
            },
            {
                "name": "Nothing.",
                "text": [
                    "Uh... nothing. I mean, whenever I use my rewind, I create new timelines, new destinies...",
                    "Then you can't be sure of anything! That's why I'm going to take out Jefferson...",
                    "No, no... Chloe, hold on! Chloe!"
                ],
                "next": "parking_reality_choice"
            }
        ]
    },

    "parking_alt": {
        "text": "",
        "next": [
            {"name": "accepted_alt_chloe", "type": "eq", "value": true, "node": "parking_alt_yes"},
            {"name": "accepted_alt_chloe", "type": "eq", "value": false, "node": "parking_alt_no"}
        ]
    },
    "parking_alt_yes": {"text": [
        "And I did... for you. I didn't want you to suffer in any other timeline or reality... I couldn't bear the thought of you in any more pain...",
        "God, Max... That must have been... That must have been awful for you... I'm so sorry I had to ask you that...",
        "Of course I do. The important thing is that we're together again."
    ], "next": "parking_join"},
    "parking_alt_no": {"text": [
        "But Chloe, there was no way I could do that... I had to return to this timeline... to see you again. I had to...",
        "God, Max... That must have been awful for you... I'm so sorry I had to ask you that...",
        "Of course I do. The important thing is that we're together again."
    ], "next": "parking_join"},
    "parking_join": {
        "text": [
            "You're right. That's why you should come with me so we can stay together... and stay alive.",
            "I hear you, Max... but do you think we should let Jefferson get away with torture and murder?",
            "Of course not! If we tell David, he'll believe us and he can actually stop him... right?"
        ],
        "next": "parking_david"
    },

    "parking_david": {
        "text": "",
        "next": [
            {"name": "sided_with_chloe", "type": "eq", "value": true, "node": "parking_david_yes"},
            {"name": "sided_with_chloe", "type": "eq", "value": false, "node": "parking_david_no"}
        ]
    },
    "parking_david_yes": {"text": "I don't get it... Why do you trust him, after you totally reamed him the other day? He's not even at our house anymore.", "next": "parking_david2"},
    "parking_david_no": {"text": "Is that why you stuck up for him? Because you think he can help us? Really?", "next": "parking_david2"},
    "parking_david2": {
        "choices": [
            {
                "name": "David cares about you.",
                "text": [
                    "Chloe, no matter how much of a douche he's been, David truly cares about you.",
                    "Are you serious? I can't see him showing any feeling... except towards my mom..."
                ],
                "next": "parking_plan"
            },
            {
                "name": "David saved me.",
                "text": [
                    "Chloe, David saved me from Jefferson... If he didn't track down the Dark Room... I'd be dead right now.",
                    "Max... I had no clue... I should have been the one to save you, but... I'm so grateful David was there."
                ],
                "next": "parking_plan"
            },
            {
                "name": "David was ahead of us.",
                "text": [
                    "David was already investigating Jefferson. He was way ahead of us...",
                    "Except that he was actually investigating everybody, Max... Sorry, but I still don't trust him. It's up to us, Max.",
                    "No, no, listen to me... wait, Chloe! Chloe!"
                ],
                "next": "parking_david2"
            }
        ]
    },
    "parking_plan": {
        "text": [
            "So what's your plan?",
            "We tell him everything, including that Victoria is in danger.",
            "Okay. You've been through so much... I believe you, Max. After all, I'm still your faithful companion.",
            "Yes, you are. So, listen... In a few minutes, I won't know any of this happened... nothing. We absolutely have to stay in your room and do nothing. Then we explain everything to David, and we finally let him do his job.",
            "Will you believe me?",
            "I'll always believe you, Chloe."
        ],
        "next": "beach"
    },

    // ===================== Beach =====================
    "beach": {
        "text": [
            "Oh, Chloe!",
            "I see that the real Max is back... So, how was your time trip, dude?",
            "Shut up. Oh, you're alive! You're alive, oh... Both of us! I did so much to bring you back, Chloe... and it worked. It actually worked. You're with me again.",
            "It looks like even fate doesn't want us apart. And... you traveled through multiple realities just to... save my ungrateful ass over and over.",
            "Come on. I'm the official Drama King and Queen of Arcadia Bay this week. Just look at what my powers have caused in... just a short time.",
            "You're Max-fucking-Caulfield, Time Warrior. Nobody could have a better best friend... You need to accept how awesome you are.",
            "Then for whatever scientific, mystical reason, that we'll obviously never figure out... We were meant to be together at this exact moment in history.",
            "Chloe, look! The storm is getting bigger now. It's coming closer. I... I can't even believe this is real, but this is happening because of me.",
            "Stop it! Stop beating yourself up, okay? The lighthouse is out of the way of the tornado. Come on!",
            "Oh... What... Chloe...",
            "I've got your back, Max."
        ],
        "next": "nightmare_photolab"
    },

    // ===================== Nightmare =====================
    "nightmare_photolab": {
        "text": [
            "I'm back in class... What the hell?",
            "I have to listen to this Jefferson lecture again? This might be Hell...",
            "Okay, this is messed up... Am I stuck in a time loop?",
            "Everybody's gone now... Have I totally fucked up time?",
            "Holy shit. Look at all these dead birds... This can't be real...",
            "I see you, Max Caulfield. Don't even think about leaving here until we talk about your entry.",
            "I just wanted to know if... you'd like to spend the rest of your life in my Dark Room? Your purity inspires me so much... and we could be so happy together... Who needs selfies, when I can give you portraiture?",
            "There's no way I'm saying that... No way."
        ],
        "next": "nightmare_jeff_choice"
    },
    "nightmare_jeff_choice": {
        "choices": [
            {
                "name": "I love you, Mr. Jefferson.",
                "text": [
                    "I've been dreaming of the day when you would finally tell me... I love you, Mr. Jefferson.",
                    "Call me Mark. We need to play catch-up on all the time we've... wasted. Especially since there's nobody left in your life... I love you too, Max."
                ],
                "next": "nightmare_kate"
            },
            {
                "name": "Our dark room.",
                "text": [
                    "I like to think of it as... our Dark Room. It's the only place I truly feel safe and protected from the storm.",
                    "Of course, Max. I can capture you over and over... You can be my model for life... and death. Just make sure you stay pure... I won't like it if you get dirty like Rachel or Chloe."
                ],
                "next": "nightmare_kate"
            },
            {
                "name": "My selfies are shit.",
                "text": [
                    "My selfies are shit... I need to be framed by a real artist. I'm just a poser...",
                    "Yes, you will be posing... for me. I hope you don't mind needles or duct tape..."
                ],
                "next": "nightmare_kate"
            },
            {
                "name": "Thanks for killing Chloe.",
                "text": [
                    "It's about time somebody finally killed Chloe... It's like you're doing both of us an awesome favor!",
                    "Chloe can never appreciate you the way I will... Maxine. And yes, I insist on calling you Maxine... forever."
                ],
                "next": "nightmare_kate"
            }
        ]
    },

    "nightmare_kate": {
        "text": "",
        "next": [
            {"name": "saved_kate", "type": "eq", "value": true, "node": "nightmare_kate_yes"},
            {"name": "saved_kate", "type": "eq", "value": false, "node": "nightmare_kate_no"}
        ]
    },
    "nightmare_kate_yes": {"text": [
        "Max, why did you stop me from jumping? What kind of friend are you? You never understood me... Now my family will never leave me alone... And that means I'll always be alone... thanks to you.",
        "Kate, that's not true! I've always been your friend..."
    ], "next": "nightmare_darkroom"},
    "nightmare_kate_no": {"text": [
        "Max, how could you let me jump off a roof? You were the only person I trusted here... Now I'm never going to Heaven... Instead you've stuck me in Hell... Alone forever...",
        "No, Kate, I was only trying to save you..."
    ], "next": "nightmare_darkroom"},
    "nightmare_darkroom": {
        "text": [
            "This hall never ends... I better find something.",
            "How long will this nightmare go on?",
            "I think you'd be perfect for my new photo series on retro-grunge... You have the same qualities that I loved in Rachel Amber... but not Max...",
            "Max is a fucking child...",
            "Oh Christ, I know... and she never shuts up, does she?",
            "I'm so over her hipster bullshit.",
            "I think everyone at Blackwell is over Max... Let's prove it."
        ],
        "next": "nightmare_warren"
    },

    "nightmare_warren": {
        "text": "",
        "next": [
            {"name": "kissed_chloe", "type": "eq", "value": true, "node": "nightmare_warren_c"},
            {"name": "kissed_chloe", "type": "eq", "value": false, "node": "nightmare_warren_noc"}
        ]
    },
    "nightmare_warren_c": {
        "text": "",
        "next": [
            {"name": "kissed_warren", "type": "eq", "value": true, "node": "nightmare_warren_both"},
            {"name": "kissed_warren", "type": "eq", "value": false, "node": "nightmare_warren_onlychloe"}
        ]
    },
    "nightmare_warren_noc": {
        "text": "",
        "next": [
            {"name": "kissed_warren", "type": "eq", "value": true, "node": "nightmare_warren_onlywarren"},
            {"name": "kissed_warren", "type": "eq", "value": false, "node": "nightmare_warren_neither"}
        ]
    },
    "nightmare_warren_onlychloe": {"text": ["Booyah, Warren! I thought you were all over Max's shit...", "She's not all that... so who cares if she doesn't kiss me?", "You should have seen her make a move on me in my room... Hella lame.", "Max should see me make a move on you... Come here..."], "next": "diner_1"},
    "nightmare_warren_onlywarren": {"text": ["Booyah, Warren! I thought you were all over Max's shit...", "Not after she kissed me... her breath was ass and no tongue...", "I hear that. I'm not into... nerds but you're pretty cute...", "I'm not into Max, anyway. So let's bust a move..."], "next": "diner_1"},
    "nightmare_warren_neither": {"text": ["Booyah, Warren! I thought you were all over Max's shit...", "She's sure the hell not into me at all... who cares?", "I guess we're \"not her type\"... like Max has a fucking type?", "But she does... She's into Mr. Jefferson... Now come here..."], "next": "diner_1"},
    "nightmare_warren_both": {"text": ["Holy shit, Warren! Max is trying to play us both!", "I guess she's not as innocent as she acts...", "Not when she's trying to hook up with both of us...", "I only want to go ape with you, Chloe... Come here..."], "next": "diner_1"},

    // ===================== Two Whales Diner (nightmare) =====================
    "diner_1": {
        "text": [
            "I'll be so grateful if this is the last digicode...",
            "Great. Numbers are all over the place. How will I find the right code?",
            "I'm going to make the designers pay for all these bullshit code puzzles!",
            "Don't kill us, Max.",
            "Max, I hope you do the right thing. I hope...",
            "Honey, I always thought of you like a daughter... and now you're going to take me away from my family...",
            "Max, you're exactly the kind of soldier I'd want by my side in a war.",
            "I wish we had been friends, Max. But please... don't let me die like this... I'm still a teenager...",
            "Max, I'm... truly... I truly am sorry for being such a bastard. You would have been cool to hang out with. I just don't want everybody else to suffer like me.",
            "Please, Max. Don't kill me, so we can finally have our tea session.",
            "Max, I want you to know how much confidence you gave me... Nobody ever did that for me."
        ],
        "next": "altmax_1"
    },

    // ===================== Conversation with Alternate Max =====================
    "altmax_1": {
        "text": [
            "Who... Who are you?",
            "Holy shit, are you cereal? I'm you, dumbass. Or I'm one of many Maxes you've left behind...",
            "Can you get me out of here?",
            "Oh, so you want help? Thought you could control everybody and everything, huh? Twist time around your fingers?"
        ],
        "next": "altmax_choice1"
    },
    "altmax_choice1": {
        "choices": [
            {"name": "Wasn't my choice...", "text": "It wasn't my choice. I didn't ask to rewind time!", "next": "altmax_david"},
            {"name": "I tried to help...", "text": ["I tried to help... I only wanted to do the right thing.", "No, you only wanted to be popular. And once you got these amazing powers, your big plan was to trick people into thinking you give a rat's ass."], "next": "altmax_care"}
        ]
    },

    "altmax_david": {
        "text": "",
        "next": [
            {"name": "david_killed_jefferson", "type": "eq", "value": true, "node": "altmax_david_yes"},
            {"name": "david_killed_jefferson", "type": "eq", "value": false, "node": "altmax_david_no"}
        ]
    },
    "altmax_david_yes": {"text": "Stop playing innocent. You've left a trail of death behind you. You even let that stalker Madsen kill Jefferson... That's sick! You're way more of a cold-blooded killer than him or Nathan.", "next": "altmax_selfdef"},
    "altmax_david_no": {"text": "No, but you were happy to use it to get people to like you. As if you cared about them.", "next": "altmax_care"},
    "altmax_selfdef": {
        "choices": [
            {"name": "Self-defense.", "text": ["Bullshit! That was self-defense! I never set out to kill anybody.", "That doesn't make you any less of a murderer."], "next": "altmax_2"},
            {"name": "I'm a survivor.", "text": ["No. I'm a survivor. I did what I had to.", "Oh, the jury will love to hear about your mad time travel skills."], "next": "altmax_2"}
        ]
    },
    "altmax_care": {
        "choices": [
            {"name": "I do care.", "text": ["I do care! That's why I was trying to make friends...", "By telling people what they want to hear? You were just looking for a shortcut, because you can't make friends on your own.", "That's not true. I have great friends. And I've used my powers for good."], "next": "altmax_2"},
            {"name": "That's true.", "text": ["That's true... I wasted my power on trying to be friends with everybody.", "About time you admitted that. But it's way too late after everything you've done...", "But... I still have great friends. And my power helped some."], "next": "altmax_2"}
        ]
    },
    "altmax_2": {
        "text": [
            "That was not my fault, you son of a bitch...",
            "Don't you dare talk about our mom that way... ha!"
        ],
        "next": "altmax_frank"
    },

    "altmax_frank": {
        "text": "",
        "next": [
            {"name": "chloe_killed_frank", "type": "eq", "value": true, "node": "altmax_frank_yes"},
            {"name": "chloe_killed_frank", "type": "eq", "value": false, "node": "altmax_frank_no"}
        ]
    },
    "altmax_frank_yes": {"text": "And what about Frank? That bullet in him wasn't your fault?", "next": "altmax_worth"},
    "altmax_frank_no": {"text": "What about the crap that was your fault?", "next": "altmax_worth"},
    "altmax_worth": {
        "choices": [
            {"name": "We all are.", "text": ["We all are. This isn't about Chloe... or even me anymore.", "Gosh, you're so selfless now, Mahatma Max. It's too bad you pissed your power away on high school drama."], "next": "altmax_3"},
            {"name": "My best friend.", "text": ["Of course. She's my best friend.", "Oh yeah, you ignored your \"best friend\" for five years while she went through hell... Some friend."], "next": "altmax_3"},
            {"name": "Destiny.", "text": ["This has to be my destiny to save her... I wouldn't be trapped in here if I didn't believe that...", "No kidding. Chloe trapped you with her drama. Guns, drugs, Rachel... She's just using you, dude."], "next": "altmax_3"}
        ]
    },
    "altmax_3": {
        "text": [
            "Chloe does a better job of guilt-tripping me than you do.",
            "Because you let her bully you. It's called \"Stockholm Syndrome.\" But you didn't do that homework... so you'll have to learn the hard way. Like Rachel...",
            "Just shut up. You're not scaring me anymore.",
            "I'd be more worried about Chloe killing us than Jefferson..."
        ],
        "next": "altmax_kiss"
    },

    "altmax_kiss": {
        "text": "",
        "next": [
            {"name": "kissed_chloe", "type": "eq", "value": true, "node": "altmax_kiss_yes"},
            {"name": "kissed_chloe", "type": "eq", "value": false, "node": "altmax_kiss_no"}
        ]
    },
    "altmax_kiss_yes": {"text": "Max, do you really think she has any feelings for us? You're just another puppet...", "next": "altmax_end"},
    "altmax_kiss_no": {"text": "Max, do you really think she's our friend? That she respects us in any way?", "next": "altmax_end"},
    "altmax_end": {
        "text": [
            "Man, you are so stupid. I'm embarrassed to have the same name... And someday Chloe will destroy—",
            "Oh hell, speak of the devil...",
            "Dude, do not even fuck with her head! She knows what we went through together this week and you don't! There's no way you can break up our team! This is reality!"
        ],
        "next": "course_1"
    },

    // ===================== Course of events / Cliff =====================
    "course_1": {
        "text": [
            "After five years you're still Max Caulfield.",
            "I am seriously glad to see you.",
            "Welcome home, Max. Fasten your seatbelt.",
            "I, uh... know it was your birthday last month... This was my real father's camera... I want you to have it.",
            "Yes, of course it's cool! Thank you... This camera is so sweet.",
            "You were here today, Max. You saved me! I'm still tripping on that... Seeing you after all these years feels like—",
            "Destiny?",
            "You can rewind time, Max. That's fucking insane. We have to play! You need a sidekick to guide you.",
            "Welcome to American Rust, my home away from Hell.",
            "You saved me again. Crazy. Now we're totally bonded for life!",
            "I'm so glad you're my partner in crime.",
            "As long as you're my partner in time.",
            "You are magic. I have no clue how the hell you got in there, but you did it, sista.",
            "It's the powers of best friendship. I know how you roll...",
            "Your power is changing everything, Max. Especially you. I can already tell. You're not so chickenshit anymore.",
            "You can't go back to your dorm now, you're a Blackwell fugitive! Crash at my place tonight.",
            "Photobomb!",
            "Photo-hog! It feels like a different world from yesterday...",
            "I double dare you. Kiss me now."
        ],
        "next": "course_dare"
    },

    "course_dare": {
        "text": "",
        "next": [
            {"name": "kissed_chloe", "type": "eq", "value": true, "node": "course_dare_yes"},
            {"name": "kissed_chloe", "type": "eq", "value": false, "node": "course_dare_no"}
        ]
    },
    "course_dare_yes": {"text": ["Damn, you're hardcore, Max! Now I can text Warren and tell him he doesn't stand a chance...", "You are such a dork."], "next": "course_2"},
    "course_dare_no": {"text": ["Sorry, not that easy.", "Oh, like I am? Just admit that you already macked on me then used your rewind!", "You are such a dork."], "next": "course_2"},
    "course_2": {
        "text": [
            "It makes me ill that Rachel posed like this for Frank... I can't believe she was banging Frank! Why didn't she say anything?",
            "Because she knew how you would react.",
            "Max, you are being so fucking strange. You feel okay?",
            "Chloe, I am... awesome. We are awesome!",
            "It's weird hanging out with you again.",
            "I know... I'm glad we are, though.",
            "Listen, Max, my respiratory system is failing and... it's only getting worse. This isn't how I want things to end.",
            "Chloe... you're back. I'm just... I'm just—I'm so glad you're here!",
            "Kate wasn't the first... All those binders are filled with other victims.",
            "The junkyard! Max, we have to find that spot, now!",
            "Rachel... Oh, Rachel... No... no... Please, not her...",
            "I loved her so much... How can she be dead?",
            "Come on Max, we're almost there! Please wake up! We're near the lighthouse! Wake up! Dammit, Max, don't let me down!",
            "Max, come on now! Don't worry... we'll be okay."
        ],
        "next": "cliff"
    },
    "cliff": {
        "text": [
            "Max? Max, can you hear me? Please, say something.",
            "Chloe? I... I must have passed out... Sorry.",
            "Oh, thank God... Don't you ever do that again, okay?",
            "I swear...but that nightmare was so real... was so horrible...",
            "This is my storm. I caused this... I caused all of this. I changed fate and destiny so much that... I actually did alter the course of everything. And all I really created was just death and destruction!",
            "Fuck all of that, okay? You were given a power. You didn't ask for it... and you saved me. But without your power, we wouldn't have found her! You're Maxine Caulfield... and you're amazing. Max, this is the only way.",
            "I feel like I took this shot a thousand years ago.",
            "You... You could use that photo to change everything right back to when you took that picture... All that would take is for me to... to...",
            "Fuck that! No... no way! You are my number one priority now. You are all that matters to me.",
            "I know. You proved that over and over again... even though I don't deserve it. There's so many more people in Arcadia Bay who should live... way more than me...",
            "Don't say that... I won't trade you.",
            "You're not trading me. Maybe you've just been delaying my real destiny... I know I've been selfish, but for once I think I should accept my fate... our fate...",
            "Chloe...",
            "Max, you finally came back to me this week, and... you did nothing but show me your love and friendship. No matter what you choose, I know you'll make the right decision.",
            "Chloe... I can't make this choice...",
            "No, Max... You're the only one who can."
        ],
        "next": "final_choice"
    },
    "final_choice": {
        "choices": [
            {
                "name": "SACRIFICE CHLOE",
                "text": [
                    "Max... it's time...",
                    "Chloe... I'm so, so sorry... I... I don't want to do this.",
                    "I know, Max. But we have to. We have to save everybody, okay? And you'll make those fuckers pay for what they did to Rachel. Being together this week... it was the best farewell gift I could have hoped for. You're my hero, Max."
                ],
                "next": "sac_chloe_romance"
            },
            {
                "name": "SACRIFICE ARCADIA BAY",
                "text": [
                    "Max... it's time...",
                    "Not anymore.",
                    "Max... I'll always be with you.",
                    "Forever..."
                ]
            }
        ]
    },

    "sac_chloe_romance": {
        "text": "",
        "next": [
            {"name": "romance_high", "type": "eq", "value": true, "node": "sac_chloe_romance_yes"},
            {"name": "romance_high", "type": "eq", "value": false, "node": "sac_chloe_romance_no"}
        ]
    },
    "sac_chloe_romance_yes": {"text": "", "next": "sac_chloe_end"},
    "sac_chloe_romance_no": {"text": "Oh, Chloe... I'm gonna miss you so much.", "next": "sac_chloe_end"},
    "sac_chloe_end": {
        "text": [
            "I'll always love you... Now, get out of here, please! Do it before I freak. And Max Caulfield? Don't you forget about me...",
            "Never.",
            "It's cool, Nathan... Don't stress, you're okay, bro, just... count to three.",
            "So what do you want?",
            "I hope you checked the perimeter, as my step-ass would say. Now, let's talk bidness.",
            "I got nothing for you.",
            "Wrong. You got hella cash.",
            "You don't know who the fuck I am or who you're messing around with!",
            "Where'd you get that? What are you doing? Come on, put that thing down!",
            "Don't EVER tell me what to do. I'm so SICK of people trying to control me!",
            "Get that gun away from me, psycho!"
        ]
    }
};
