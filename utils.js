var question=require("./questions.json")
function getAllLanguages(){
    var languages=[];
 question.forEach(function(a){
        if(!languages.includes(a.language)){
            return languages.push(a.language)
        }
    });
    return languages
}
function getQuestionsbylanguageName(language){
    return question.filter((a)=>{
        return a.language===language;
    })
}
function check(answers){
    var noquestions=0;
    var correctans=0;
    for(ans in answers){
        noquestions++;
        var q=getQuestionsbylanguageName.find((question)=>{
            if(question.id==ans){
                if(question.answer==answers[ans]){
                    correctans++;
                }
                return true;
            }
        })
    }
}
    module.exports={
        getAllLanguages,
        getQuestionsbylanguageName,
        check
    }