/**
 * Created by alexandre on 13/12/16.
 */

// Pour savoir si agiste ou pas
var karma = 0;

// display result
$(".conclusion .button").click(function () {
    $(".conclusion .button").hide();

    // display image en fonction si agiste ou pas
    if(karma > 0)
        $("#resultat").attr('src', "images/ResultatAgiste.jpg");
    else
        $("#resultat").attr('src', "images/ResultatNonAgiste.jpg");
});

$("#woman").click(function () {
    $("#chatZone .avatar img").attr('src', "images/avatarmeuf.png");
    $("#chatZone .avatar-me img").attr('src', "images/avatarmeuf.png");
});

$("#man").click(function () {
    $("#chatZone .avatar img").attr('src', "images/avatarmec.png");
    $("#chatZone .avatar-me img").attr('src', "images/avatarmec.png");
});

// after first user text input
$(".user-answer input").change(function () {
    // desactive question
    $(".current-chat .bot-question").attr('class', 'inactive-question');

    // desactive input field
    $(".user-answer input").attr('readonly', 'readonly');
    $(".user-answer input").attr('class', 'inactive-question');

    // append bot answer with a delay
    setTimeout(function () {

        // play sound
        $("#audioNotification").get(0).play();

        $('<p>', {
            class: 'popout',
            text: "\"" + $(".user-answer input").val() + "\"... J’ai que ça à me dire ? Je me rappelle que j’étais un peu con, mais à ce point-là..! -_-"
        }).wrap(
            $('<div>', {
                class: 'bot-question'
            })
        ).parent().wrap(
            $('<div>', {
                class: 'message-wrapper'
            })
        ).parent().appendTo(".current-chat");

        // scroll
        $('html,body').animate({
                scrollTop: $(".bot-question").offset().top},
            'slow');

        triggerBotResponse(conversationFragment1);

    }, 500);

});

var currentMessageLevel = 1;

var triggerBotResponse = function (currentConversation) {

    // desactive last question
    $(".current-chat .button").unbind();
    $(".current-chat .button").attr('class', 'inactive-question');
    $(".current-chat .user-answer").attr('class', 'inactive-user-answer').wrap($('<div>', {
        class: 'message-wrapper'
    }));

    // create container for user answer
    var userAnswer = $('<div>', {
        class: 'user-answer'
    }).appendTo(".current-chat");

    // add choices for user
    currentConversation.UserChoices.forEach(function (choice) {
        var button = $('<div>', {
            id: currentMessageLevel,
            class: 'button popout userPossibleChoice',
            text: choice.Text,
        }).appendTo(userAnswer);

        button.click(function () {
            // hide non chosen choice
            $(".userPossibleChoice").toggle(false);
            button.toggle(true);

            // update karma
            karma = karma + choice.Karma;

            // desactive last question
            $(".current-chat .bot-question").attr('class', 'inactive-question');

            // append bot answer with a timeout
            setTimeout(function () {

                // play sound
                $("#audioNotification").get(0).play();

                choice.BotResponse.forEach(function (msg) {
                    if(msg.MsgType == "Picture"){

                        var image = $('<img>', {
                            src: msg.MsgContent,
                            class: 'popout'
                        }).wrap(
                            $('<div>', {
                                class: 'bot-question'
                            })
                        ).parent().wrap(
                            $('<div>', {
                                class: 'message-wrapper'
                            })
                        ).parent().appendTo(".current-chat");

                        //open img full size
                        image.click(function () {
                            window.open(msg.MsgContent, "_blank", "menubar=1,resizable=1");
                        })
                    }
                    else{

                        $('<p>', {
                            class: 'popout',
                            text: msg.MsgContent
                        }).wrap(
                            $('<div>', {
                                class: 'bot-question'
                            })
                        ).parent().wrap(
                            $('<div>', {
                                class: 'message-wrapper'
                            })
                        ).parent().appendTo(".current-chat");
                    }
                });

                // scroll
                $('html,body').animate({
                        scrollTop: $(".bot-question").offset().top + 150},
                    'slow');

                // if conversation isn't ended
                if(choice.NextQuestion != null){
                    triggerBotResponse(choice.NextQuestion);
                }
                else{
                    $(".current-chat .button").unbind();
                    $(".current-chat  .button").attr('class', 'inactive-question');
                    $(".current-chat .user-answer").attr('class', 'inactive-user-answer').wrap($('<div>', {
                        class: 'message-wrapper'
                    }));


                    // display conclusion
                    $(".conclusion").show();
                }
            }, 500)

        });

    })

    currentMessageLevel++;
}

var conversationFragment6 = {
    "UserChoices" : [
        {
            "Text" : "Vu que t’es vieille, je suis sûre que tu joues encore à Pokémon Go ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais vieux, c’est quoi être vieux ? Moi, c’est juste toi avec 50 ans d’expérience en plus. Les mêmes références, mais plus de classe ! ;-)"
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  null
        },
        {
            "Text" : "Et est-ce que maintenant jouer à Pokémon Go, c’est être vieux  ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais vieux, c’est quoi être vieux ? Moi, c’est juste toi avec 50 ans d’expérience en plus. Les mêmes références, mais plus de classe ! ;-)"
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  null
        }
    ]
};

var conversationFragment5 = {
    "UserChoices" : [
        {
            "Text" : "Ah bon ? ! Vous bougez sérieusement au delà des frontières du canapé ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Bah oui, et on part en basse saison pour économiser."
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/SeniorsTourisme.jpg"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Tu vois ça c’était en 2014 (j’l’avais gardé pour caler le pied de la table holographique) Ben imagine maintenant !"
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  conversationFragment6
        },
        {
            "Text" : "Oui, j’imagine que vous avez plus de temps pour vos loisirs ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "C’est clair ! En plus on part en basse saison, histoire d’économiser. "
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/SeniorsTourisme.jpg"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Tu vois ça c’était en 2014 (j’lavais gardé pour caler le pied de la table holographique) Ben imagine maintenant !"
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  conversationFragment6
        }
    ]
};

var conversationFragment4 = {
    "UserChoices" : [
        {
            "Text" : "Et t’as pas l’impression d’être un poids pour les jeunes qui paient pour ta santé ? ",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Un poids moi ? Ok, j’avoue un peu. Les vieux dépendants nous coûtent deux fois plus cher qu’en 2011."
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais tu sais, on crée de l’emploi mine de rien. 300 000 postes d’aide à la personne en plus ! C’est nous qui consommons le plus hein ! Et puis on voyage !"
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  conversationFragment5
        },
        {
            "Text" : "Waouh ! C’est cool ils doivent avoir plein de souvenirs à raconter :-)",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Oui mais par contre les vieux dépendants nous coûtent deux fois plus cher qu’en 2011 du coup ! "
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais tu sais, on crée de l’emploi mine de rien. 300 000 postes d’aide à la personne en plus ! C’est nous qui consommons le plus hein ! Et puis on voyage !"
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  conversationFragment5
        }
    ]
};

var conversationFragment3 = {
    "UserChoices" : [
        {
            "Text" : "Ah oui, tu as - enfin j’ai - des amis encore en vie ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Bah oui, on vit quand même plus longtemps en 2060. Attends, y a 12 fois plus de centenaires qu’à ton époque..."
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais bon,on est pas forcément en grande forme. Si t’avais pas commencé à fumer aussi tôt, y aurait peut-être pas 8 millions de morts par an dans le monde à cause de ça ! :-("
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  conversationFragment4
        },
        {
            "Text" : "Vous devez péter la forme avec les progrès de la médecine !",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Pas tant que ça. Tu fumes et bois depuis tellement jeune que l’espérance de vie en bonne santé a reculé. Tu te rends compte 8 millions de morts par an dans le monde à cause du tabac ? :-("
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais y a quand même 12 fois plus de centenaires qu’à ton époque !"
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  conversationFragment4
        }
    ]
};

var conversationFragment2 = {
    "UserChoices" : [
        {
            "Text" : "Mais en fait t’es une no-life ? Tu quittes plus les écrans ? :-O",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Ouais enfin, je vois quand même pas mal d’amis."
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/SeniorsAmis.jpg"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais bon, c’est vrai que des fois  je me sens un peu seule."
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  conversationFragment3
        },
        {
            "Text" : "T’as dû te faire plein de potes sur les réseaux sociaux ! :D",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Ouais, et je les vois pas mal dans la vraie vie aussi !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/SeniorsAmis.jpg"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Mais bon, c’est vrai que des fois  je me sens un peu seule."
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  conversationFragment3
        }
    ]
};

var conversationFragment1 = {
    "UserChoices" : [
        {
            "Text" : "Non, non… Je pensais pas que t’étais si calé niveau technologie !",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Tu crois quoi… Je suis super bien équipée. En 2017, vous êtes seulement au début de la révolution technologique ! "
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/SeniorsConnectes.jpg"
                }
            ],
            "Karma" : 1,
            "NextQuestion" :  conversationFragment2
        },
        {
            "Text" : "Non, non… Mais comment tu fais pour me parler ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Bah je suis super bien équipée. En 2017, vous êtes seulement au début de la révolution technologique !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : "images/seniorsConnectes.jpg"
                }
            ],
            "Karma" : -1,
            "NextQuestion" :  conversationFragment2
        }
    ]
};