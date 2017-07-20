/**
 * Created by mclhqu on 2017/7/18.
 */

window.onload=initForms;
function initForms(){
    for(var i=0;i<document.forms.length;i++){
        document.forms[i].onsubmit=validForm;
    }
}

function validForm() {
    var allGood = true;
    var allTags = document.getElementsByTagName("*");

    for (var i = 0; i < allTags.length; i++) {
        if (!validTag(allTags[i])) {
            alert(allTags[i].className);
            allGood = false;
        }
    }
    if (allGood) {
        for (var k = 0; k < allTags.length; k++) {
            var tag = allTags[k];
            var isReqd = tag.className.split(" ");
            if (isReqd.indexOf('reqd') > -1) {
                window.localStorage.setItem(tag.name, tag.value);
            }
        }
    }
    return allGood;


    function validTag(thisTag) {
        var outClass = "";
        var allClasses = thisTag.className.split(" ");

        for (var j = 0; j < allClasses.length; j++) {
            outClass += validBasedOnClass(allClasses[j]) + " ";
        }
        thisTag.className = outClass;
        if (outClass.indexOf("fail") > -1) {
            thisTag.focus();
            if (thisTag.nodeName === "INPUT") {
                thisTag.select();
            }
            return false;
        }
        return true;


        function validBasedOnClass(thisClass) {
            var classBack = "";
            switch (thisClass) {
                case "":
                case "fail":
                    break;
                case "reqd":
                    if (allGood && thisTag.value === "") {
                        classBack = "fail ";
                    }
                    classBack += thisClass;
                    break;
                case "eMail":
                    if (allGood && !validEmail(thisTag.value)) {
                        classBack = "fail ";
                    }
                    classBack += thisClass;
                    break;
                case "uPassword":
                    if (allGood && !crossCheck(thisTag, thisClass)) {
                        classBack = "fail ";
                    }
                    break;
                default:
                    classBack += thisClass;
            }
            return classBack;


            function crossCheck(inTag, otherFieldID) {
                if (!document.getElementById(otherFieldID)) {
                    return false;
                }
                return (inTag.value === document.getElementById(otherFieldID).value);
            }

            function validEmail(email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email);
            }
        }
    }
}








//
// window.addEventListener('load',function(){
//     var form=document.forms[0];
//     var getUserInfo=function(){
//         var value={};
//         for(var i=0;i<form.elements.length;i++){
//             var ele=form.elements[i];
//             if(/text|password/.test(ele.type)) {
//                 value[ele.name] = ele.value;
//             }
//         }
//         return value;
//     };
//     form.addEventListener('submit',function(e){
//         e.preventDefault();//阻止默认执行
//         var userInfo=getUserInfo();
//         localStorage.setItem(userInfo.uName,JSON.stringify(userInfo));//本地storage
//         alert('注册成功！');
//     });
// });