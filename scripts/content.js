
var url = "";
const todoresp = {todo: "showPageAction"};

chrome.runtime.sendMessage(todoresp);
main();

function main() {

    var sliderInnerHTMLString = "\
    <!-- HEADER IS HERE -->\
    <div id='sheader'>\
    <div id='sheaderheader'></div>\
    <div id='deepscancontainer'>\
    <label id='deepscanlabel' for='deepscan'>GotData?<input type='checkbox' name='deepscan' id='deepscan' value='deepscan'/></label>\
    </div>\
    <br/>\
    </div>\
    <br/>\
    \
    \
    <!-- THE BODY CONTAINER IS HERE -->\
    <div id='sbodycontainer'>\
    <br/>\
    <h4> Name </h4>\
    <br/>\
    <textarea id='nametext'></textarea>\
    <br/>\
    <div class='internal_button' id='education_extract_button'>Extract Name</div>\
    <hr/>\
    \
    <h4> Profile URL </h4>\
    <br/>\
    <textarea id='profileurl'></textarea>\
    <div class='internal_button' id='profileurl_extract_button'>Extract Profile</div>\
    <br\>\
    <h4>Headline Description </h4>\
    <br/>\
    <textarea id='certificationstext'></textarea>\
    <br/>\
    <div class='internal_button' id='certification_extract_button'>Extract Headline</div>\
    <h4>Talks about info</h4>\
    <br/>\
    <textarea id='certificationstext'></textarea>\
    <br/>\
    <div class='internal_button' id='certification_extract_button'>Extract talks</div>\
    <h4>Location </h4>\
    <br/>\
    <textarea id='certificationstext'></textarea>\
    <br/>\
    <div class='internal_button' id='certification_extract_button'>Extract Location</div>\
    <h4>No of followers </h4>\
    <br/>\
    <textarea id='certificationstext'></textarea>\
    <br/>\
    <div class='internal_button' id='certification_extract_button'>Extract followers</div>\
    <h4>contact info </h4>\
    <br/>\
    <textarea id='certificationstext'></textarea>\
    <br/>\
    <div class='internal_button' id='certification_extract_button'>Extract contact</div>\
    <hr>\
    <div id='exportExcel'>Export Excel</div>\
    </div>\
    \
    \
    ";

    sliderGen(sliderInnerHTMLString);

    chrome.runtime.onMessage.addListener(function (msg) {
      if(msg.todo == "toggle") {
        slider();
      }
    });
    
    
  //run exportExcel option
  document.getElementById('exportExcel').addEventListener("click", exportExcel);

  document.getElementById("slider").onscroll = function () {
    printName();
    document.getElementById('basicprofile').value = JSON.stringify(extract());
  }
  //save data button
  document.getElementById('save_profile_data_button').addEventListener("click", saveProfileData);

} 
function saveProfileData() {
  var textBoxIds = ['basicprofile', 'nametext'];
  var profileData = {};
  for(var i=0; i<textBoxIds.length; i++) {
    var tempid = textBoxIds[i];
    if(tempid.includes("text"))
      tempid = tempid.replace("text", "")
    
    if(document.getElementById(textBoxIds[i]).value)
      profileData[tempid] = JSON.parse(document.getElementById(textBoxIds[i]).value);
    else
      profileData[tempid] = "No data";
  }
   var filename = prompt("Enter file Name:");
   var data = new Blob([JSON.stringify(profileData)], {type: "application/json"});
   var a = document.createElement("a"), url= URL.createObjectURL(data);
   a.href = url;
   a.download = filename+".txt";
   document.body.appendChild(a);
   a.click();
   setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
   }, 0);
} 
function printName() {
  var uname = document?.querySelector('div.pv-text-details__left-panel > div > h1') || document?.getElementsByClassName('artdeco-entity-lockup__title ember-view')[0] || null;
    uname = uname?.textContent || "";
    uname = getCleanText(uname);
    document.getElementById('slider').querySelector('#sheaderheader').innerHTML = "<h1>" + uname + "</h1>";
}

function sliderGen(sliderInnerHTMLString) {
    var slider = document.createElement("div");
    slider.id = "slider";
    var sliderDivInnerHTML = sliderInnerHTMLString;

    slider.innerHTML += sliderDivInnerHTML;

    document.body.prepend(slider);
}

function slider() {
    var slider = document.getElementById("slider");

    var styler = slider.style;
    if(styler.width == "0px") {
        styler.width = "400px";
    } else {
        styler.width = "0px";
    }
}
function exportExcel() {
  var spanList = document.getElementsByTagName("span");
  var m = [];

  for(i=0; i<spanList.length; i++)
   {
     if(spanList[i].textContent == 'Save to PDF') {
      m.push(spanList[i]);
     }
   }

   if(m.length < 1) {
    alert("No option to download profile.")
   } else {
    m[0].click();
   }

}
