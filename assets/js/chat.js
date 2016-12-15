/**
 * Created by alexandre on 13/12/16.
 */

// after first user text input
$(".user-answer input").change(function () {
    // desactive question
    $(".current-chat .bot-question").attr('class', 'inactive-question');

    // desactive input field
    $(".user-answer input").attr('readonly', 'readonly');

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

            // play sound
            $("#audioNotification").get(0).play();

            // desactive last question
            $(".current-chat .bot-question").attr('class', 'inactive-question');

            // append bot answer with a timeout
            setTimeout(function () {
                choice.BotResponse.forEach(function (msg) {
                    if(msg.MsgType == "Picture"){
                        var image = $('<img>', {
                            src: 'images/pic01.jpg',
                            class: 'popout'
                        }).wrap(
                            $('<div>', {
                                class: 'bot-question'
                            })
                        ).parent().appendTo(".current-chat");

                        //open img full size
                        image.click(function () {
                            window.open('images/pic01.jpg', "_blank", "menubar=1,resizable=1");
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
                        ).parent().appendTo(".current-chat");
                    }
                });

                // scroll
                $('html,body').animate({
                        scrollTop: $(".bot-question").offset().top},
                    'slow');

                // if conversation isn't ended
                if(choice.NextQuestion != null)
                    triggerBotResponse(choice.NextQuestion)
                else{
                    $(".current-chat .button").unbind();
                    $(".current-chat  .button").attr('class', 'inactive-question');
                }
            }, 500)

        });

    })

    currentMessageLevel++;
}

var conversationFragment8 = {
    "UserChoices" : [
        {
            "Text" : "Mais, j’espère que vous avez plus de loisirs intimes, ça serait franchement dégoûtant",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "on vit à deux plus longtemps mais pas forcément avec le même partenaire"
                }
            ],
            "NextQuestion" :  null
        },
        {
            "Text" : "J’suis sûr que vous continuez au moins à faire l’amour",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : ""
                }
            ],
            "NextQuestion" :  null
        }
    ]
};

var conversationFragment7 = {
    "UserChoices" : [
        {
            "Text" : "Et à part le scrabble, le bridge et la lecture, vous savez faire autre chose dans le futur ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "bah si "
                }
            ],
            "NextQuestion" :  conversationFragment8
        },
        {
            "Text" : "",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : ""
                }
            ],
            "NextQuestion" :  conversationFragment8
        }
    ]
};

var conversationFragment6 = {
    "UserChoices" : [
        {
            "Text" : "Ah bon ? ! Vous bougez sérieusement au delà des frontières du canap’ ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Et même que nous on part en basse saison parce qu’on est pas des jeunes cons !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : ""
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Tu vois ça c’était en 2014 (j’lavais gardé pour caler le pied de la table holographique) Ben imagine maintenant !"
                }
            ],
            "NextQuestion" :  conversationFragment7
        },
        {
            "Text" : "Ouais j’imagine que vous bougez pas mal !",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Et surtout en basse saison, histoire d’économiser !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : ""
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Tu vois ça c’était en 2014 (j’lavais gardé pour caler le pied de la table holographique) Ben imagine maintenant !"
                }
            ],
            "NextQuestion" :  conversationFragment7
        }
    ]
};

var conversationFragment5 = {
    "UserChoices" : [
        {
            "Text" : "Avec ma santé pourrie, t’as pas l’impression d’être un poids pour les jeunes qui paient les impôts ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Un poids moi ? Ok, j’avoue un peu. Mais en même temps, les dépenses sont plus dues aux nouvelles technologies et au progrès de santé qu’au vieillissement. Et puis bon les vieux, ça crée des métiers mine de rien. 300 000 postes d’aide à la personne en plus meuf !"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Sans compter qu’on bouge pas mal pour se dorer la couenne au soleil, du coup c’est jackpot pour le tourisme :p"
                }
            ],
            "NextQuestion" :  conversationFragment6
        },
        {
            "Text" : "Ca doit coûter cher à la société tous ces abus.",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Oui c’est vrai, ça coûte cher. Mais en même temps, les dépenses sont plus dues aux nouvelles technologies et au progrès de santé qu’au vieillissement. Et puis bon les vieux, ça crée des métiers mine de rien. 300 000 postes d’aide à la personne en plus meuf !"
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Sans compter qu’on bouge pas mal pour se dorer la couenne au soleil, du coup c’est jackpot pour le tourisme :p"
                }
            ],
            "NextQuestion" :  conversationFragment6
        }
    ]
};

var conversationFragment4 = {
    "UserChoices" : [
        {
            "Text" : "Ah ouais, j’ai des amis encore en vie ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "en faut avouer que c’est pas la grande forme mais si tu veux me filer un coup de main, faudrait peut-être que t’arrêtes de manger de la merde. Tiens regarde !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : ""
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Pan, dans les dents !"
                }
            ],
            "NextQuestion" :  conversationFragment5
        },
        {
            "Text" : "Vous devez péter la forme avec les progrès de la médecine !",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Ben non pas tant que ça. Regarde !"
                },
                {
                    "MsgType" : "Picture",
                    "MsgContent" : ""
                },
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Ca te motive à manger moins de merde hein ?"
                }
            ],
            "NextQuestion" :  conversationFragment5
        }
    ]
};

var conversationFragment3 = {
    "UserChoices" : [
        {
            "Text" : "Ah oui les vieux ne voient personne. J’ai retrouvé ça l’autre jour.",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Ouais enfin, je vois quand même pas mal d’amis."
                }
            ],
            "NextQuestion" :  conversationFragment4
        },
        {
            "Text" : "Ah, ça a l’air d’être déjà un problème actuel.",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "J’arrive quand même à voir pas mal d’amis."
                }
            ],
            "NextQuestion" :  conversationFragment4
        }
    ]
};

var conversationFragment2 = {
    "UserChoices" : [
        {
            "Text" : "Mais en fait je suis devenue une no-life ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Parfois je me sens seule..."
                }
            ],
            "NextQuestion" :  conversationFragment3
        },
        {
            "Text" : "Mais tu vois des gens sinon ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Parfois je me sens seule."
                }
            ],
            "NextQuestion" :  conversationFragment3
        }
    ]
};

var conversationFragment1 = {
    "UserChoices" : [
        {
            "Text" : "Ah bah je m’en sors bien au niveau technologie, j’aurais pas cru à 80 ans ! ^^",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Bah tu crois quoi, je suis quand même équipé. Regarde, t’es en 2017. Y a quoi ? Internet, Facebook... Mais t’es dépassé mon pauvre. T’imagines même pas sur quel outil je suis là !"
                }
            ],
            "NextQuestion" :  conversationFragment2
        },
        {
            "Text" : "Mais comment tu... Comment je fais pour me contacter ?",
            "BotResponse" : [
                {
                    "MsgType" : "Text",
                    "MsgContent" : "Je suis super bien équipé. Toi, t’es en 2017, y a Internet, Facebook… Mais t’imagines même pas avec quel outil je te parle là."
                }
            ],
            "NextQuestion" :  conversationFragment2
        }
    ]
};